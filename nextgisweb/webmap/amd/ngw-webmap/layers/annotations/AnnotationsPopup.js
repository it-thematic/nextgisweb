define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/on",
    "dojo/topic",
    "dojo/html",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "openlayers/ol",
    "../../ol-ext/ol-popup",
    "ngw-webmap/layers/annotations/AnnotationFeature",
    "@nextgisweb/pyramid/i18n!",
    "ngw-webmap/ol/layer/Vector",
    "dojo/text!./AnnotationsPopup.hbs",
    "xstyle/css!./AnnotationsPopup.css",
], function (
    declare,
    lang,
    array,
    on,
    topic,
    html,
    domClass,
    domConstruct,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    ol,
    olPopup,
    AnnotationFeature,
    i18n,
    Vector,
    template
) {
    const contentTemplate = i18n.renderTemplate(template);

    return declare(null, {
        _popup: null,
        _annFeature: null,
        _contentWidget: null,
        _editable: null,

        constructor: function (annotationFeature, editable, annotationInfo) {
            this._editable = editable;
            this._annFeature = annotationFeature;

            const customCssClass = annotationInfo
                ? `annotation ${this._getAccessCssClass(annotationFeature)}`
                : "annotation";

            this._popup = new olPopup({
                insertFirst: false,
                autoPan: false,
                customCssClass,
            });

            if (annotationInfo) this._setTitle(annotationFeature);

            this._popup.annFeature = annotationFeature;
            this._popup.cloneOlPopup = this.cloneOlPopup;
        },

        _getAccessCssClass: function (annFeature) {
            return annFeature.getAccessType();
        },

        _setAccessCssClass: function (annFeature) {
            if (!this._popup) return;

            const elPopup = this._popup.element.childNodes[0];
            const cssClass = this._getAccessCssClass(annFeature);
            domClass.add(elPopup, cssClass);
        },

        _setTitle: function (annotationFeature) {
            const accessTypeTitle = annotationFeature.getAccessTypeTitle();
            this._popup.element.setAttribute("title", accessTypeTitle);
        },

        addToMap: function (map) {
            if (this._map) return this;

            this._map = map;
            this._map.olMap.addOverlay(this._popup);
            domClass.add(this._popup.element, "annotation-layer");
            return this;
        },

        cloneOlPopup: function (annFeature) {
            var popup = new olPopup({
                insertFirst: false,
                autoPan: false,
                customCssClass: "annotation no-edit",
            });

            var coordinates = annFeature
                .getFeature()
                .getGeometry()
                .getCoordinates();

            var contentWidget = new (declare(
                [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
                {
                    templateString: contentTemplate,
                }
            ))();

            popup.show(coordinates, "");
            contentWidget.placeAt(popup.content);
            html.set(
                contentWidget.descriptionDiv,
                annFeature.getDescriptionAsHtml()
            );
            return popup;
        },

        remove: function () {
            if (!this._map) return false;

            this._map.olMap.removeOverlay(this._popup);
            this._map = null;
            this._contentWidget = null;
            return true;
        },

        show: function () {
            var coordinates = this._annFeature
                .getFeature()
                .getGeometry()
                .getCoordinates();

            this._contentWidget = new (declare(
                [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
                {
                    templateString: contentTemplate,
                }
            ))();

            this._popup.show(coordinates, "");
            this._contentWidget.placeAt(this._popup.content);
            this._setEditableState();
            html.set(
                this._contentWidget.descriptionDiv,
                this._annFeature.getDescriptionAsHtml()
            );
        },

        _setEditableState: function () {
            on(
                this._contentWidget.spanEditAnnotation,
                "click",
                lang.hitch(this, this._onEditAnnotation)
            );
        },

        _onEditAnnotation: function () {
            topic.publish("webmap/annotations/change/", this._annFeature);
        },

        update: function () {
            const feature = this._annFeature.getFeature();
            const accessType = this._annFeature.getAccessType();

            if (feature && accessType) {
                this._setTitle(this._annFeature);
                this._setAccessCssClass(this._annFeature);
            }

            if (!this._contentWidget) return false;
            html.set(
                this._contentWidget.descriptionDiv,
                this._annFeature.getDescriptionAsHtml()
            );
        },
    });
});
