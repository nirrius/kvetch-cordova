var React = require("react");
var ReactFireMixin = require("reactfire");
var moment = require("moment");
var Firebase = require("firebase");
var _ = require("lodash");

var InputField = React.createClass({
  displayName: "InputField",

  handleSubmit: function(e) {  	
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onMessageSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },

  render: function () {
    return <form className="input-field">
    <input type="text" placeholder="Say something else" onMessageSubmit/>
    </form>;
  }
});

module.exports = InputField;