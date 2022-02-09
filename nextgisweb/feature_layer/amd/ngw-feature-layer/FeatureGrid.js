define([
    "dojo/_base/declare",
    "dijit/layout/BorderContainer",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/ConfirmDialog",
    "dojo/text!./template/FeatureGrid.hbs",
    // dgrid & plugins
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnHider",
    "dgrid/extensions/ColumnResizer",
    // other
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/Deferred",
    "dojo/promise/all",
    "dojo/store/Observable",
    "dojo/dom-style",
    // ngw
    "@nextgisweb/pyramid/api",
    "@nextgisweb/pyramid/i18n!",
    "ngw-lookup-table/cached",
    "./FeatureStore",
    // template
    "dijit/layout/ContentPane",
    "dijit/Toolbar",
    "dijit/form/Button",
    "dijit/form/TextBox"
], function (
    declare,
    BorderContainer,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    ConfirmDialog,
    template,
    // dgrid & plugins
    OnDemandGrid,
    Selection,
    selector,
    ColumnHider,
    ColumnResizer,
    // other
    lang,
    array,
    Deferred,
    all,
    Observable,
    domStyle,
    // ngw
    api,
    i18n,
    lookupTableCached,
    FeatureStore
) {
    // Base class ggrid which is them wrapped in dijit widget
    var GridClass = declare([OnDemandGrid, Selection, ColumnHider, ColumnResizer, selector], {
        selectionMode: "none"
    });

    return declare([BorderContainer, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: i18n.renderTemplate(template),

        // Currently selected row
        selectedRow: null,

        // Show toolbar?
        showToolbar: true,

        // Show search string?
        likeSearch: true,

        constructor: function (params) {
            declare.safeMixin(this, params);

            this._gridInitialized = new Deferred();

            var widget = this;

            api.route("feature_layer.field", {id: this.layerId})
                .get()
                .then(function (data) {
                    widget._fields = data;
                    widget._lookupTableData = {};

                    var lookupTableDefereds = [];
                    array.forEach(data, function (field) {
                        if (field.lookup_table != null) {
                            lookupTableDefereds.push(
                                lookupTableCached.load(field.lookup_table.id)
                            );
                        }
                    });

                    all(lookupTableDefereds).then(function () {
                        widget.initializeGrid();
                    });
                });
        },

        postCreate: function () {
            if (!this.showToolbar) {
                domStyle.set(this.toolbar.domNode, "display", "none");
            }

            this.watch("selectedRow", lang.hitch(this, function (attr, oldVal, newVal) {
                this.btnOpenFeature.set("disabled", newVal === null);
                if (!this.readonly) {
                    this.btnUpdateFeature.set("disabled", newVal === null);
                    this.btnDeleteFeature.set("disabled", newVal === null);
                }
            }));

            this.btnOpenFeature.on("click", lang.hitch(this, this.openFeature));
            if (!this.readonly) {
                this.btnUpdateFeature.on("click", lang.hitch(this, this.updateFeature));
                this.btnDeleteFeature.on("click", lang.hitch(this, this.deleteFeature));
            }

            if (this.likeSearch) {
                // Search is needed, set search string processors
                this.tbSearch.on("input", lang.hitch(this, function () {
                    if (this._timer !== undefined) { clearInterval(this._timer); }
                    this._timer = setInterval(lang.hitch(this, this.updateSearch), 750);
                }));

                this.tbSearch.watch("value", lang.hitch(this, function(attr, oldVal, newVal) {
                    this.updateSearch();
                }));
            } else {
                // Search is not needed, hide it
                domStyle.set(this.tbSearch.domNode, "display", "none");
            }
        },

        initializeGrid: function () {
            var columns = [
                selector({label: "", selectorType: "radio", width: 40, unhidable: true}),
                {
                    field: "id",
                    label: "#",
                    unhidable: true,
                    sortable: false
                }];

            var fields = [];

            array.forEach(this._fields, function (f) {
                var colDefn = {
                    field: "F:" + f.keyname,
                    label: f.display_name,
                    hidden: !f.grid_visibility
                };

                if (f.lookup_table != null) {
                    colDefn.get = function (object) {
                        var value = object['F:' + f.keyname];
                        if (f.lookup_table != null) {
                            var repr = lookupTableCached.lookup(f.lookup_table.id, value);
                            if (repr !== null) { value = "[" + value + "] " + repr };
                        };
                        return value;
                    }
                };

                columns.push(colDefn);
                fields.push(f.keyname);
            });

            if (this.data === undefined) {
                this.store = new Observable(new FeatureStore({
                    layer: this.layerId,
                    fieldList: fields,
                    fieldPrefix: "F:"
                }));
            }

            this._grid = new GridClass({
                store: this.store ? this.store : undefined,
                columns: columns,
                queryOptions: this.queryOptions
            });
            this._grid.on('dgrid-refresh-complete', this.resize.bind(this));

            if (this.data) {
                this._grid.renderArray(this.data);
            }

            domStyle.set(this._grid.domNode, "height", "100%");
            domStyle.set(this._grid.domNode, "border", "none");

            var widget = this;
            this._grid.on("dgrid-select", function (event) {
                widget.set("selectedRow", event.rows[0].data);
            });

            this._grid.on("dgrid-deselect", function () {
                widget.set("selectedRow", null);
            });

            this._gridInitialized.resolve();
        },

        startup: function () {
            this.inherited(arguments);

            var widget = this;
            this._gridInitialized.then(
                function () {
                    widget.gridPane.set("content", widget._grid.domNode);
                    widget._grid.startup();
                }
            );
        },

        openFeature: function() {
            window.open(api.routeURL("feature_layer.feature.show", {
                id: this.layerId,
                feature_id: this.get("selectedRow").id
            }));
        },

        updateFeature: function() {
            window.open(api.routeURL("feature_layer.feature.update", {
                id: this.layerId,
                feature_id: this.get("selectedRow").id
            }));
        },

        deleteFeature: function() {
            var widget = this;
            var fid = this.get("selectedRow").id;

            var confirmDlg = new ConfirmDialog({
                title: i18n.gettext("Confirmation"),
                content: i18n.gettext("Delete feature?"),
                style: "width: 300px"
            });

            confirmDlg.on("execute", lang.hitch(this, function() {
                api.route("feature_layer.feature.item", {
                    id: this.layerId,
                    fid: fid
                }).delete().then(function () { widget._grid.refresh(); })
            }));
            confirmDlg.show();
        },


        updateSearch: function () {
            if (this._timer !== undefined) { clearInterval(this._timer); }

            var value = this.tbSearch.get("value");
            if (this._search != value) {
                this._search = value;
                this._grid.set("query", {like: this.tbSearch.get("value")});
            }
        }

    });
});
