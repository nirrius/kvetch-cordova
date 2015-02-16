var
  Marty = require("marty"),
  chatStore = require("../store"),
  chatActions = require("../actions"),
  React = require("react"),
  Router = require("react-router"),
  Message = require("./message"),
  InputField = require("./input-field"),
  map = require("lodash").map,
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
    function renderMessage (message) {
      return <Message {...message} key={message.id} onMount={this.handleMessageMount.bind(this, message)} />
    }

    return map(this.state, renderMessage.bind(this))
  },

  handleMessageMount: function (message) {
    var parentID = message.parents[0]
    if (typeof this.state[parentID] === "undefined") return

    // TODO: REPOSITION NODES.
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.messageRef.push({
      text: this.state.text
    });
    this.setState({text: ""});
  },

  render: function () {
    console.log("rerender")
    return <div className="chat-room">
      {this.renderMessages()}
    </div>
   // <InputField onMessageSubmit={this.handleSubmit} />
  }
});

module.exports = ChatRoom;
