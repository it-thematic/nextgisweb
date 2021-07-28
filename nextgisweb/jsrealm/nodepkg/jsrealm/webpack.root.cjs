const config = require("@nextgisweb/jsrealm/config.cjs");

const modules = [];
for (const pkg of config.packages()) {
    const webpackConfigs = (pkg.json.nextgisweb || {}).webpackConfigs || {};
    for (const modFile of Object.values(webpackConfigs)) {
        modules.push(require(pkg.name + "/" + modFile));
    }
}

module.exports = modules;
