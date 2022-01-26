<%inherit file='nextgisweb:templates/obj.mako' />

<%def name="head()">
    <% import json %>
    <script type="text/javascript">
        require([
            "ngw-resource/CopyForm",
            "dojo/domReady!"
        ], function (
            CopyForm
        ) {
            (new CopyForm({resid: ${obj.id}})).placeAt('form').startup();
        });
    </script>
</%def>

<div id="form" style="width: 100%"></div>