define([
    "dojo/_base/declare",
    "dojo/json",
    "dijit/layout/ContentPane",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./template/CopyForm.hbs",
    "@nextgisweb/pyramid/i18n!",
    "@nextgisweb/pyramid/api",
    // template
    "dojox/layout/TableContainer",
    "ngw-resource/ResourceBox",
    "dijit/form/Button"
], function (
    declare,
    json,
    ContentPane,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    template,
    i18n,
    api
) {
    return declare([ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: i18n.renderTemplate(template),
        
        postCreate: function () {
            this.inherited(arguments);
            var self = this;
            this.buttonSave.on("click", function () { self.save(); });
        },
        
        save: function () {
            api.route('resource.resource_copy', {id: this.resid}).post(
                {
                        
                    json: this.wTarget.get("value")
                }
            ).then(
                function (url) {
                    window.open(url)
                }
            );
        }       
        
    });
});