<%inherit file='nextgisweb:templates/obj.mako' />

<%
    import json
    import six
%>

<script type="text/javascript">
    require([
        "dojo/dom",
        "ngw-feature-layer/FeatureDisplayWidget",
        "dojo/domReady!"
    ], function (dom, FeatureDisplayWidget) {
        var ext = ${ list(ext_mid.keys()) if six.PY3 else ext_mid.keys() | json.dumps, n },
            mid = ${ list(ext_mid.values()) if six.PY3 else ext_mid.values() | json.dumps, n };

        require(mid, function () {
            var extmid = {};
            for (var i = 0; i < arguments.length; i++) { extmid[ext[i]] = arguments[i] };

            var widget = new FeatureDisplayWidget({
                resourceId: ${ obj.id | json.dumps, n },
                featureId: ${ feature_id | json.dumps, n },
                extmid: extmid,
                style: "width: 100%; height: 100%; padding: 1px;"});

            widget.placeAt(dom.byId("widget"));
            widget.startup();
            widget.load();
        });
    });
</script>

<div id="widget" style="width: 100%; height: 100%; padding: 0;"></div>
