define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dijit/Dialog",
    "dijit/layout/BorderContainer",
    "dojox/embed/Object",
    "put-selector/put",
    "@nextgisweb/pyramid/i18n!",

], function (
    declare,
    lang,
    domConstruct,
    Dialog,
    BorderContainer,
    Embed,
    put,
    i18n
) {
    return declare([Dialog], {

        buildRendering: function () {
            this.inherited(arguments);
            this.title = this.dialogTitle || i18n.gettext("Select resource");

            this.container = new BorderContainer({
                style: "width: 80vw; height: 80vh"
            }).placeAt(this);

            this.embed = domConstruct.create("embed", {
                id: this.container.id + '_embed',
                src: this.src,
                type: this.mime_type,
                width: "100%",
                height: '100%'
            }, this.container.domNode);
        }
    })
});