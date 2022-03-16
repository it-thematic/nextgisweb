define([
    "dojo/_base/declare",
    "./_PluginBase",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/Deferred",
    "dojo/promise/all",
    "dijit/layout/TabContainer",
    "dijit/Menu",
    "dijit/MenuItem",
    "dojo/dom-style",
    "dojo/request/script",
    "dojo/topic",
    "openlayers/ol",
    "@nextgisweb/pyramid/i18n!",
    "@nextgisweb/pyramid/api",
    "ngw-feature-layer/FeatureStore",
    "ngw-feature-layer/FeatureGrid",
    "dijit/form/Button",
    "dijit/form/TextBox",
    "dijit/ToolbarSeparator",
    "dijit/popup",
    "put-selector/put"

], function (
    declare,
    _PluginBase,
    lang,
    array,
    Deferred,
    all,
    TabContainer,
    Menu,
    MenuItem,
    domStyle,
    script,
    topic,
    ol,
    i18n,
    api,
    FeatureStore,
    FeatureGrid,
    Button,
    TextBox,
    ToolbarSeparator,
    popup,
    put
) {
    var Pane = declare([FeatureGrid], {
        closable: true,
        gutters: false,
        iconClass: "iconTable",

        postCreate: function () {
            this.inherited(arguments);

            var widget = this;

            this.btnZoomToFeature = new Button({
                label: i18n.gettext("Go to"),
                iconClass: "iconArrowInOut",
                disabled: true,
                onClick: function () {
                    widget.zoomToFeature();
                },
            });
            this.toolbar.addChild(this.btnZoomToFeature);

            this.watch("selectedRow", function (attr, oldVal, newVal) {
                widget.btnZoomToFeature.set("disabled", newVal === null);

                if (newVal === null) {
                    return;
                }

                var wkt = new ol.format.WKT(), defs = [], selectedRows = this.get("selectedRow");
                for (var key in selectedRows) {
                    var item = selectedRows[key]
                    defs.push(
                        api.route("feature_layer.feature.item", {id: this.layerId, fid: item.id})
                            .get({handleAs: "json"})
                            .then(function (feature) {
                                return wkt.readGeometry(feature.geom)
                            })
                    )
                }
                all(defs).then(function (data) {
                    topic.publish("feature.highlight", {olGeometry: new ol.geom.GeometryCollection(data)});
                })
            });
        },

        zoomToFeature: function () {
            var display = this.plugin.display;

            var wkt = new ol.format.WKT(), defs = [], selectedRows = this.get("selectedRow");
            for (var key in selectedRows) {
                var item = selectedRows[key]
                defs.push(
                    api.route("feature_layer.feature.item", {id: this.layerId, fid: item.id})
                        .get({handleAs: "json"})
                        .then(function (feature) {
                            return wkt.readGeometry(feature.geom)
                        })
                )
            }
            all(defs).then(function (data) {
                var geomCollection = new ol.geom.GeometryCollection(data);
                display.map.zoomToFeature(new ol.Feature({geometry: geomCollection}));
                display.tabContainer.selectChild(display.mainPane);
            })
        },
    });

    return declare([_PluginBase], {
        constructor: function (options) {
            var plugin = this;

            this.menuItem = new MenuItem({
                label: i18n.gettext("Feature table"),
                iconClass: "iconTable",
                disabled: true,
                onClick: function () {
                    plugin.openFeatureGrid();
                },
            });

            this.tabContainer = new TabContainer({
                region: "bottom",
                style: "height: 45%",
                splitter: true,
            });

            this.display.watch(
                "item",
                lang.hitch(this, function (attr, oldVal, newVal) {
                    var itemConfig = plugin.display.get("itemConfig");
                    this.menuItem.set(
                        "disabled",
                        !(
                            itemConfig.type == "layer" &&
                            itemConfig.plugin[plugin.identity]
                        )
                    );
                })
            );
        },

        postCreate: function () {
            if (
                this.display.layersPanel &&
                this.display.layersPanel.contentWidget.itemMenu
            ) {
                this.display.layersPanel.contentWidget.itemMenu.addChild(
                    this.menuItem
                );
            }

            this._bindEvents();
        },

        _bindEvents: function () {
            topic.subscribe(
                "/webmap/feature-table/refresh",
                lang.hitch(this, function (layerId) {
                    if (!this._openedLayersById.hasOwnProperty(layerId)) return;
                    var pane = this._openedLayersById[layerId];
                    pane.updateSearch();
                })
            );
        },

        _openedLayersById: {},
        openFeatureGrid: function () {
            var item = this.display.dumpItem(),
                layerId = item.layerId,
                pane;

            if (this._openedLayersById.hasOwnProperty(layerId)) {
                pane = this._openedLayersById[layerId];
                this.tabContainer.selectChild(pane);
                return;
            }

            pane = this._buildPane(layerId, item);
            this._openedLayersById[layerId] = pane;

            if (!this.tabContainer.getChildren().length) {
                this.display.mapContainer.addChild(this.tabContainer);
            }

            this.tabContainer.addChild(pane);
            this.tabContainer.selectChild(pane);
        },

        _buildPane: function (layerId, item) {
            var data = this.display.get("itemConfig").plugin[this.identity];

            return new Pane({
                title: item.label,
                layerId: layerId,
                readonly: data.readonly,
                likeSearch: data.likeSearch,
                plugin: this,
                onClose: lang.hitch(this, function () {
                    delete this._openedLayersById[layerId];
                    if (this.tabContainer.getChildren().length == 1) {
                        this.display.mapContainer.removeChild(
                            this.tabContainer
                        );
                    }
                    return true;
                }),
            });
        },
    });
});
