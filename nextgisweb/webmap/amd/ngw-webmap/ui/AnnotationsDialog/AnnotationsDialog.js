define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/Deferred",
    "dojo/Evented",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/Dialog",
    "dijit/form/Button",
    "dojox/html/entities",
    "dijit/Editor",
    "dijit/form/DropDownButton",
    "dijit/DropDownMenu",
    "dijit/MenuItem",
    "@nextgisweb/pyramid/i18n!",
    "ngw-webmap/ui/AnnotationsDialog/AnnotationsSettings",
    // preload
    "dijit/_editor/plugins/FontChoice",
    "dijit/_editor/plugins/TextColor",
    "dijit/_editor/plugins/LinkDialog",
    // css
    "xstyle/css!./AnnotationsDialog.css",
], function (
    declare,
    lang,
    domConstruct,
    domStyle,
    domAttr,
    Deferred,
    Evented,
    _WidgetBase,
    _TemplatedMixin,
    Dialog,
    Button,
    htmlEntities,
    Editor,
    DropDownButton,
    DropDownMenu,
    MenuItem,
    i18n,
    AnnotationsSettings
) {
    const AccessTypeSection = declare([_WidgetBase, _TemplatedMixin], {
        templateString:
            '<div class="annotation-access-type" data-dojo-attach-point="accessContainer"></div>',
    });

    return declare([Dialog, Evented], {
        _deferred: null,
        _annFeature: null,

        constructor: function (options) {
            declare.safeMixin(this, options);
            this.style = "width: 400px";
            this.class = "annotation-dialog";
        },

        postCreate: function () {
            this.inherited(arguments);

            this.accessTypeSection = new AccessTypeSection().placeAt(
                this.containerNode
            );

            this.editor = new Editor({
                extraPlugins: [
                    "foreColor",
                    "hiliteColor",
                    {
                        name: "dijit/_editor/plugins/FontChoice",
                        command: "fontSize",
                        generic: true,
                    },
                ],
                height: "300",
                plugins: [
                    "cut",
                    "copy",
                    "paste",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "removeFormat",
                    "|",
                    "createLink",
                ],
                style: 'font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 14px;',
            }).placeAt(this.containerNode);

            this.annotationsSettings = new AnnotationsSettings().placeAt(
                this.containerNode
            );

            this.actionBar = domConstruct.create(
                "div",
                {
                    class: "dijitDialogPaneActionBar",
                },
                this.containerNode
            );

            this._buildCreateAnnotationBtn();

            this.btnSave = new Button({
                label: i18n.gettext("Save"),
                onClick: lang.hitch(this, this.onSave),
            }).placeAt(this.actionBar);

            this.btnUndo = new Button({
                label: i18n.gettext("Cancel"),
                onClick: lang.hitch(this, this.onUndo),
            }).placeAt(this.actionBar);

            this.btnDelete = new Button({
                label: i18n.gettext("Delete"),
                onClick: lang.hitch(this, this.onDelete),
                class: "delete-annotation",
                style: "float: left",
            }).placeAt(this.actionBar);

            this.onCancel = lang.hitch(this, this.onUndo);
        },

        _buildCreateAnnotationBtn: function () {
            const menu = new DropDownMenu({ style: "display: none;" });
            const menuItemPublic = new MenuItem({
                label: i18n.gettext("Create as public"),
                iconClass: "dijitIconApplication",
                onClick: lang.hitch(this, function () {
                    this.onCreate(true);
                }),
            });
            menu.addChild(menuItemPublic);

            const menuItemPrivate = new MenuItem({
                label: i18n.gettext("Create as private"),
                iconClass: "dijitIconKey",
                onClick: lang.hitch(this, function () {
                    this.onCreate(false);
                }),
            });
            menu.addChild(menuItemPrivate);

            this.btnCreate = new DropDownButton({
                label: i18n.gettext("Create"),
                dropDown: menu,
            }).placeAt(this.actionBar);
        },

        onCreate: function (isPublic) {
            const newData = this._updateFeatureFromDialog();
            newData.public = isPublic;
            this.save(newData);
        },

        onSave: function () {
            const newData = this._updateFeatureFromDialog();
            this.save(newData);
        },

        save: function (newData) {
            this.emit("save");

            if (this._deferred)
                this._deferred.resolve(
                    {
                        action: "save",
                        annFeature: this._annFeature,
                        newData: newData,
                    },
                    this
                );
            this.hide();
        },

        onUndo: function () {
            this.emit("undo");
            if (this._deferred)
                this._deferred.resolve(
                    {
                        action: "undo",
                        annFeature: this._annFeature,
                    },
                    this
                );
            this.hide();
        },

        onDelete: function () {
            this.emit("delete");
            if (this._deferred)
                this._deferred.resolve(
                    {
                        action: "delete",
                        annFeature: this._annFeature,
                    },
                    this
                );
            this.hide();
        },

        _updateFeatureFromDialog: function () {
            return {
                style: {
                    circle: {
                        radius: this.annotationsSettings.circleSize.get(
                            "value"
                        ),
                        stroke: {
                            color: this.annotationsSettings.colorStroke.value,
                            width: this.annotationsSettings.widthStroke.get(
                                "value"
                            ),
                        },
                        fill: {
                            color: this.annotationsSettings.fillStroke.value,
                        },
                    },
                },
                description: htmlEntities.encode(this.editor.get("value")),
            };
        },

        showForEdit: function (annFeature) {
            var annotationInfo = annFeature.getAnnotationInfo(),
                id = annFeature.getId();

            this.editor.set(
                "value",
                htmlEntities.decode(annotationInfo.description)
            );
            this.annotationsSettings.circleSize.set(
                "value",
                annotationInfo.style.circle.radius
            );
            this.annotationsSettings.widthStroke.set(
                "value",
                annotationInfo.style.circle.stroke.width
            );
            this.annotationsSettings.colorStroke.value =
                annotationInfo.style.circle.stroke.color;
            this.annotationsSettings.fillStroke.value =
                annotationInfo.style.circle.fill.color;

            if (id) {
                this.titleNode.innerHTML = i18n.gettext("Edit annotation");
                domStyle.set(this.btnDelete.domNode, "display", "block");
                domStyle.set(this.btnCreate.domNode, "display", "none");
                domStyle.set(this.btnSave.domNode, "display", "inline-block");
            } else {
                this.titleNode.innerHTML = i18n.gettext("Create annotation");
                domStyle.set(this.btnDelete.domNode, "display", "none");
                domStyle.set(this.btnCreate.domNode, "display", "inline-block");
                domStyle.set(this.btnSave.domNode, "display", "none");
            }

            this._updateAccessSection(annFeature);

            this.show();

            this._annFeature = annFeature;
            this._deferred = new Deferred();
            return this._deferred;
        },

        showLastData: function () {
            this.show();
        },

        _updateAccessSection: function (annFeature) {
            const accessType = annFeature.getAccessType();

            this.accessTypeSection.accessContainer.innerHTML =
                annFeature.getAccessTypeTitle();
            domAttr.set(
                this.domNode,
                "data-access-type",
                accessType || "empty"
            );
        },
    });
});
