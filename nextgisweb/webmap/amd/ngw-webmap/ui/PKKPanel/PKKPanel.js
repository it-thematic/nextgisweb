define([
    'dojo/_base/declare',
    '@nextgisweb/pyramid/i18n!',
    "dijit/_WidgetBase",
    "ngw-pyramid/dynamic-panel/DynamicPanel",
    "dijit/layout/BorderContainer",
    "dojo/Deferred",
    "dojo/request/xhr",
    "openlayers/ol",
    "dojo/on",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/_base/array",
    'dojo/topic',
    "./PKKFeatureStore",
    // settings
    "@nextgisweb/pyramid/settings!webmap",
    // templates
    "dojo/text!./PKKPanel.hbs",
    // css
    "xstyle/css!./PKKPanel.css"
], function (
    declare,
    i18n,
    _WidgetBase,
    DynamicPanel,
    BorderContainer,
    Deferred,
    xhr,
    ol,
    on,
    domClass,
    domConstruct,
    lang,
    array,
    topic,
    PKKFeatureStore,
    webmapSettings,
    template
) {
    return declare([DynamicPanel, BorderContainer],{
        inputTimer: undefined,
        statusPane: undefined,
        MAX_SEARCH_RESULTS: 100,
        templateString: i18n.renderTemplate(template),
        activeResult: undefined,
        constructor: function (options) {
            declare.safeMixin(this,options);
        },
        postCreate: function(){
            this.inherited(arguments);

            var widget = this;

             on(this.searchField, "focus", function(){
                 domClass.add(widget.titleNode, "focus");
             });

             on(this.searchField, "blur", function(){
                 domClass.remove(widget.titleNode, "focus");
             });

             on(this.searchField, "input", function(e){
                if (widget.inputTimer) { clearInterval(widget.inputTimer); }
                widget.inputTimer = setInterval(function() {
                    clearInterval(widget.inputTimer);
                    widget.search();
                    widget.inputTimer = undefined;
                }, 750);
             });

             on(this.searchIcon, "click", function(e){
                 if (widget.inputTimer) { clearInterval(widget.inputTimer); }
                 widget.search();
                 widget.inputTimer = undefined;
             });
        },
        show: function(){
            this.inherited(arguments);
            var widget = this;
            topic.publish("feature.unhighlight");

            setTimeout(function(){
                widget.searchField.focus();
            }, 300);
        },
        hide: function(){
            this.inherited(arguments);
            this.clearAll();
        },
        setStatus: function(text, statusClass){
            var statusClass = statusClass ? "pkk-panel__status " + statusClass : "pkk-panel__status";

            if (this.statusPane) this.removeStatus();

            this.statusPane = domConstruct.create("div",{
                id: "pkk-panel-status",
                class: statusClass,
                innerHTML: text
            });
            domConstruct.place(this.statusPane, this.contentNode, "last");
        },
        removeStatus: function(){
            if (this.statusPane){
                domConstruct.destroy(this.statusPane);
            }
        },
        search: function(){
            var widget = this,
                criteria = this.searchField.value;
            if (this._lastCriteria == criteria) { return; }

            if (criteria === "" ) {
                this.clearSearchResults();
                return;
            }

            widget.removeStatus();
            if (this.searchResultsList ) {
                this.clearSearchResults();
            }

            this._lastCriteria = criteria;

            this.loader.style.display = "block";

            var deferred = new Deferred(), fdefered = deferred;
            
            var store = new PKKFeatureStore({});
            var ndeferred = new Deferred();
            
            deferred.then(function (limit) {
                console.log("Searching pkk");
                topic.publish("feature.unhighlight");
                store
                    .query({like: criteria})
                    .forEach(lang.hitch(this, function (itm) {
                        if (limit > 0) {
                            widget.addSearchResult(itm);
                        }
                        limit = limit -1; 
                    }))
                    .then(function () {
                        if (limit > 0) {
                            ndeferred.resolve(limit);
                        } else {
                            widget.setStatus(i18n.gettext("Refine search criterion"), "search-panel__status--bg");
                            ndeferred.reject();
                        }
                    }, function (err) {
                        ndeferred.resolve()
                    }).otherwise(lang.hitch(widget, widget._breakOrError));
            }).otherwise(lang.hitch(widget, widget._breakOrError));
            
            deferred = ndeferred;
            
            deferred.then(function (limit) {
                widget.loader.style.display = "none";
                if (limit == widget.MAX_SEARCH_RESULTS) {
                    widget.setStatus(i18n.gettext("Not found"));
                }
            }).otherwise(lang.hitch(widget, widget._breakOrError));
            
            fdefered.resolve(widget.MAX_SEARCH_RESULTS);
        },
        
        addSearchResult: function(result){
            if (!this.searchResultsList) {
                this.searchResultsList = domConstruct.create("ul", {
                    id: "pkk-results-list",
                    class: "list list--s list--multirow pkk-results"
                });
                domConstruct.place(this.searchResultsList, this.contentNode, "first");
            }
            var resultNode = domConstruct.create("li", {
                class: "list__item list__item--link",
                innerHTML: result.numbpkk,
                tabindex: -1,
                onclick: lang.hitch(this, function (e){
                    if (this.activeResult)
                        domClass.remove(this.activeResult, "active");
                    domClass.add(e.target, "active");
                    this.activeResult = e.target;
                    let truly = result.box.every(v => v) 
                    
                    if (truly) { 
                        this.display.map.zoomToExtent(result.box);
                        let center = this.display.map.center;
                        topic.publish("feature.highlight", {geom: `POINT (${center[0]} ${center[1]})`});
                    }                    
                })
            });
            domConstruct.place(resultNode, this.searchResultsList);
        },
        clearAll: function(){
            this.searchField.value = "";
            this._lastCriteria = "";
            topic.publish("feature.unhighlight");
            this.clearSearchResults();
        },
        clearSearchResults: function(){
            domConstruct.empty(this.contentNode);
            this.searchResultsList = undefined;
            this.statusPane = undefined;
            this.loader.style.display = "none";
        },
        _breakOrError: function (value) {
            if (this.loader)
                this.loader.style.display = "none";

            if (value !== undefined) {
                console.error(value);
            }
        }
    });
});
