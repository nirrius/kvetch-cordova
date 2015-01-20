var $ = require("jquery");

var React = require("react");
var ChatRoom = require("./components/chat-room");
var ApplicationHandler = require("./components/application-handler");
var ChatRoomHandler = require("./components/chat-room-handler");

var Router = require("react-router");
var Routes = Router.Routes;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

routes = <Route name="root" path="/" handler={ApplicationHandler}>
  <NotFoundRoute name="chat-room" handler={ChatRoom} />
</Route>;

var init = function () {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    return React.render(<Handler />, document.body);
  });
};

$(document).ready(init);
