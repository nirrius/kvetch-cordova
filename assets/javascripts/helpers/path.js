// REFACTOR: Haven't yet found a clean way to pull these variables in.
var config = require("../../../config/application"),
    appBase,
    apiBase;

if (typeof window !== "undefined") {
  // Running within browser.
  appBase = localStorage["APP_BASE"];
  apiBase = localStorage["API_BASE"];

} else {
  // Running within server.
  appBase = config.APP_BASE
  apiBase = config.API_BASE
}

module.exports = {
  api: function (path) {
    return apiBase + "/" + path;
  },

  asset: function (path) {
    // return appBase + "/assets/" + path;
    return "assets/" + path;
  }
};
