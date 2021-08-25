define([
    "dojo/_base/declare",
    "./_PluginBase",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/Deferred",
    "dijit/layout/TabContainer",
    "dijit/Menu",
    "dijit/MenuItem",
    "dojo/dom-style",
    "dojo/request/xhr",
    "dojo/request/script",
    "dojo/topic",
    "openlayers/ol",
    "@nextgisweb/pyramid/i18n!",
    "ngw-feature-layer/FeatureStore",
    "ngw-feature-layer/FeatureGrid",
    "dijit/form/Button",
    "dijit/form/TextBox",
    "dijit/ToolbarSeparator",
    "dijit/popup",
    "put-selector/put",
    "ngw/route",
], function (
    declare,
    _PluginBase,
    lang,
    array,
    Deferred,
    TabContainer,
    Menu,
    MenuItem,
    domStyle,
    xhr,
    script,
    topic,
    ol,
    i18n,
    FeatureStore,
    FeatureGrid,
    Button,
    TextBox,
    ToolbarSeparator,
    popup,
    put,
    route
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
                if (newVal) {
                    xhr.get(
                        route.feature_layer.feature.item({
                            id: widget.layerId,
                            fid: newVal.id,
                        }),
                        {
                            handleAs: "json",
                        }
                    ).then(function (feature) {
                        topic.publish("feature.highlight", {
                            geom: feature.geom,
                        });
                    });
                }
            });
        },

        zoomToFeature: function () {
            var display = this.plugin.display;
            var wkt = new ol.format.WKT();

            xhr.get(
                route.feature_layer.feature.item({
                    id: this.layerId,
                    fid: this.get("selectedRow").id,
                }),
                {
                    handleAs: "json",
                }
            ).then(function (feature) {
                var geometry = wkt.readGeometry(feature.geom);
                display.map.zoomToFeature(
                    new ol.Feature({ geometry: geometry })
                );
                display.tabContainer.selectChild(display.mainPane);
            });
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
