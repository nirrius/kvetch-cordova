var
  Marty = require("marty"),
  chatStore = require("../store"),
  chatActions = require("../actions"),
  React = require("react"),
  Router = require("react-router"),
  Message = require("./message"),
  _ = require("lodash"),
  chatStoreState = Marty.createStateMixin(chatStore),
  ROOT_ID = "-JeET71Lq_8X116CKmTs"


var ChatRoom = React.createClass({
  displayName: "ChatRoom",

  mixins: [Router.State, chatStoreState],

  componentDidMount: function () {
    var id = this.getParams().splat || ROOT_ID
    chatActions.fetchMessage(id)
  },

  renderMessages: function () {
    return _.map(this.state, function (message) {
      return <Message {...message} key={message.id} />
    })
  },

  render: function () {
    console.log("rerender")
    return <div className="chat-room">
      {this.renderMessages()}
    </div>
  }
});

module.exports = ChatRoom;
