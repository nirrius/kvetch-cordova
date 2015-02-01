var React = require("react");
var Router = require("react-router");
var Message = require("./message");
var Firebase = require("firebase");
var InputField = require("./input-field");

var ROOT_ID = "-JeET71Lq_8X116CKmTs";

var ChatRoom = React.createClass({
  displayName: "ChatRoom",

  mixins: [Router.State],

  getMessageID: function () {
    return this.getParams().splat || ROOT_ID;
  },

  handleSubmit: function(e) {        
    e.preventDefault();
    
    this.messageRef.push({      
      text: this.state.text
    });
    this.setState({text: ""});
  },

  render: function () {
    return <div className="chat-room">
       <Message id={this.getMessageID()} />
       <InputField onMessageSubmit={this.handleSubmit} />
    </div>;
  }
});

module.exports = ChatRoom;
