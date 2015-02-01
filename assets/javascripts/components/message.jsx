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
          <div>{this.render_message(payload)}</div>
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
  },

  render_message: function (message) {
    image_regex = /https?:\/\/.*\.(?:jpg|jpeg|gif|png|webp|svg)/ig;
    image_match = image_regex.exec(message.text);
    message_blobs = [];
    if (image_match)
        {
        message.text = message.text.replace(image_match[0], "")
        message_blobs.push(<img src={image_match[0]} className="img-responsive"> </img>);
        }

    youtube_regex = /https?:\/\/www.youtube.com\/watch?[^ ]*( |$)/ig;
    youtube_match = youtube_regex.exec(message.text);

    if (youtube_match)
        {
        message.text = message.text.replace(youtube_match[0], "")
         message_blobs.push( <p> Video not supported yet</p>);
        }

    regular_ass_link_regex = /((https?:\/\/)?(www\.)?[^ ]+\.[^ ]{2,}(\/[^ ]*)?)($| )/ig;
    link_match = regular_ass_link_regex.exec(message.text)
    if (link_match)
        {
        message.text = message.text.replace(link_match[0], "")
        message_blobs.push(<a href={link_match[0]} target='_blank'> {link_match[0]} </a>);
        }

    message_blobs.unshift(message.text)
    return message_blobs;
  },


});

module.exports = Message;
