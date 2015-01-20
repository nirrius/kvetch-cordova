var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

var ApplicationLayout = React.createClass({
  displayName: "ApplicationLayout",

  render: function () {
    return <div className="chat-room-handler">
      <RouteHandler />
    </div>;
  }
});

module.exports = ApplicationLayout;
