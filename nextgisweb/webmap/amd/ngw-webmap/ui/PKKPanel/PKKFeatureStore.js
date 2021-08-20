define([
    "dojo/_base/declare",
    "dojo/store/JsonRest",
    "dojo/json",
    "ngw/route",
], function (
    declare,
    JsonRest,
    json,
    route
) {
    return declare(JsonRest, {
        constructor: function (options) {
            this.target = route.pkk.search();
        }
    });
});
