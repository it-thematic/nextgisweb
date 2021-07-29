<%inherit file='nextgisweb:templates/obj.mako' />

<% import json %>

<div id="map" style="width: 100%; height: 100%; border: 2px solid #ddd;"></div>
<script>
    require(["@nextgisweb/layer-preview/map"], function (previewMap) {
      previewMap.default({
          target: "map",
          resource: ${obj.id},
          source_type: "${source_type}",
          extent: ${json.dumps(extent) | n}
      });
    })
</script>