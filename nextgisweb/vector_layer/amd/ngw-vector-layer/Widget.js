define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "@nextgisweb/pyramid/i18n!",
    "ngw-resource/serialize",
    "ngw-spatial-ref-sys/SRSSelect",
    // resource
    "dojo/text!./template/Widget.hbs",
    "@nextgisweb/pyramid/settings!",
    // template
    "dojox/layout/TableContainer",
    "ngw-file-upload/Uploader",
    "dijit/layout/ContentPane",
    "dijit/form/ComboBox",
    "dijit/form/CheckBox",
    "dijit/TitlePane"
], function (
    declare,
    lang,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    ContentPane,
    i18n,
    serialize,
    SRSSelect,
    template,
    settings
) {
    return declare([ContentPane, serialize.Mixin, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: i18n.renderTemplate(template),
        title: i18n.gettext("Vector layer"),
        prefix: "vector_layer",

        constructor: function() {
            this.wSrs = SRSSelect({allSrs: null});
        },

        postCreate: function () {
            if (settings.show_create_mode) {
                this.modeSwitcher.watch('value', function(attr, oldval, newval) {
                    var hideFile = newval === 'empty';
                    this.empty_layer_section.style.display = hideFile ? '' : 'none';
                    this.file_section.style.display = hideFile ? 'none' : '';
                }.bind(this));
            } else {
                this.mode_section.domNode.style.display = 'none';
            }

            this.wFIDSource.watch('value', function(attr, oldval, newval) {
                var hideFIDField = newval === 'SEQUENCE';
                this.wFIDField.set('disabled', hideFIDField);
            }.bind(this));

            this.wCastGeometryType.watch('value', function(attr, oldval, newval) {
                var hideSkipOtherGeometryType = newval === 'AUTO';
                this.wSkipOtherGeometryTypes.set('disabled', hideSkipOtherGeometryType);
            }.bind(this));
        },

        serializeInMixin: function (data) {
            var prefix = this.prefix,
                setObject = function (key, value) { lang.setObject(prefix + "." + key, value, data); };

            setObject("srs", { id: this.wSrs.get("value") });

            if (this.modeSwitcher.get("value") === 'file') {
                setObject("source", this.wSourceFile.get("value"));
                setObject("encoding", this.wEncoding.get("value"));
                setObject("fix_errors", this.wFixErrors.get("value"));
                setObject("skip_errors", this.wSkipErrors.get("value"));
                var cast_geometry_type = this.wCastGeometryType.get("value");
                if (cast_geometry_type === "AUTO") {
                    cast_geometry_type = null;
                } else {
                    setObject("skip_other_geometry_types", this.wSkipOtherGeometryTypes.get("value"));
                }

                setObject("cast_geometry_type", cast_geometry_type);
                function bool_toggle (value) {
                    switch (value) {
                        case 'YES': return true;
                        case 'NO': return false;
                    }
                    return null;
                }
                setObject("cast_is_multi", bool_toggle(this.wCastIsMulti.get("value")));
                setObject("cast_has_z", bool_toggle(this.wCastHasZ.get("value")));

                var fid_source = this.wFIDSource.get("value");
                setObject("fid_source", fid_source);
                if (fid_source !== 'SEQUENCE') {
                    setObject("fid_field", this.wFIDField.get("value"));
                }
            } else {
                setObject("fields", []);
                setObject("geometry_type", this.wGeometryType.get("value"));
            }
        },

        validateDataInMixin: function (errback) {
            if (this.modeSwitcher.get("value") === 'file') {
                return this.wSourceFile.upload_promise !== undefined &&
                    this.wSourceFile.upload_promise.isResolved();
            }
            return true;
        }

    });
});
