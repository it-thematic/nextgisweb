define([
    "dojo/_base/declare",
    "dojo/store/JsonRest",
    "dojo/json",
    "@nextgisweb/pyramid/api",
], function (
    declare,
    JsonRest,
    json,
    api
) {
    return declare(JsonRest, {
        constructor: function (options) {
            this.target = api.routeURL("pkk.search");
        }
    });
});
