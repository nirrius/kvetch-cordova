var React = require("react");
var Router = require("react-router");
var Message = require("./message");

var ROOT_ID = "-JeET71Lq_8X116CKmTs";

var ChatRoom = React.createClass({
  displayName: "ChatRoom",

  mixins: [Router.State],

  getMessageID: function () {
    return this.getParams().splat || ROOT_ID;
  },

  render: function () {
    return <div className="chat-room">
       <Message id={this.getMessageID()} />
    </div>;
  }
});

module.exports = ChatRoom;
