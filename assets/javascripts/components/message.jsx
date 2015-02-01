var React = require("react");
var ReactFireMixin = require("reactfire");
var Firebase = require("firebase");
var moment = require("moment");
var _ = require("lodash");

// TODO: host locally!!
var DEFAULT_AVATAR_URL = "http://i.imgur.com/gN6cSlS.jpg";

var Message = React.createClass({
  displayName: "Message",

  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      payload: null
    }
  },

  getAuthor: function () {
    return _.defaults((this.state.payload.author || {}), {
      name: "you know who",
      avatar: DEFAULT_AVATAR_URL
    });
  },

  componentWillMount: function () {    
    this.messageRef = new Firebase("https://kvetch.firebaseio.com/messages/" + this.props.id);
    this.bindAsObject(this.messageRef, "payload");
  },

  render: function () {
    var payload = this.state.payload;

    if (payload == null) {
      return null;
    }

    var children = _.map(payload.children, function (id) {
      return <Message id={id} key={id} />;
    });

    var author = this.getAuthor();

    return <div className="thread">
      <div className="message">
        {this.renderMessageReference()}

        <section className="message-body">
          <div>{payload.text}</div>
        </section>

        <footer className="message-details">
          <figure className="message-avatar">
            <img src={author.avatar} />
          </figure>

          <span className="message-author-name">
            {author.name}
          </span>

          <span title={this.formatDateString(payload.createdAt)} className="deemphasized message-created-at">
            {this.humanize(payload.createdAt)}
          </span>
        </footer>
      </div>

      {children}
    </div>
  },

  renderMessageReference: function () {
    return <a href={"/" + this.props.id} className="glyphicon glyphicon-share-alt message-reference" />
  },

  formatDateString: function (datetime) {
    return moment(datetime).toISOString();
  },

  humanize: function (datetime) {
    return moment(datetime).fromNow();
  }
});

module.exports = Message;
