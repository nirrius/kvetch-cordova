var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

var ApplicationHandler = React.createClass({
  displayName: "ApplicationHandler",

  render: function () {
    return <div className="application-handler">
      <RouteHandler />
    </div>;
  }
});

module.exports = ApplicationHandler;
