import "ol/ol.css"

/*

File "index.js" was extracted from OpenLayers build processs. Steps to update
the file:

$ git clone git@github.com:openlayers/openlayers.git ol-tmp
$ cd ol-tmp
$ git checkout v6.15.1
$ npm i && npm run build-index
$ sed -E 's/= ([\$_]ol.+);/= \1 || {};/g' build/index.js > \
    /path/to/nextgisweb/nextgisweb/jsrealm/nodepkg/external/contrib/ol/index.js

*/

import ol from "./index.js";

export default ol;
