var
  React = require("react"),
  moment = require("moment"),
  _ = require("lodash"),
  Youtube = require("react-youtube")

// TODO: host locally!!
var DEFAULT_AVATAR_URL = "http://i.imgur.com/gN6cSlS.jpg"

var Message = React.createClass({
  displayName: "Message",

  getAuthor: function () {
    return _.defaults((this.props.author || {}), {
      name: "you know who",
      avatar: DEFAULT_AVATAR_URL
    })
  },

  render: function () {
    var author = this.getAuthor()

    return <div className="message" data-message-id={this.props.id}>
      {this.renderMessageReference()}

      <section className="message-body">
        <div>
          {this.renderMessage()}
        </div>
      </section>

      <footer className="message-details">
        <figure className="message-avatar">
          <img src={author.avatar} />
        </figure>

        <span className="message-author-name">
          {author.name}
        </span>

        <span title={this.formatDateString(this.props.createdAt)} className="deemphasized message-created-at">
          {this.humanize(this.props.createdAt)}
        </span>
      </footer>
    </div>
  },

  renderMessageReference: function () {
    return <a href={"/" + this.props.id} className="glyphicon glyphicon-share-alt message-reference" />
  },

  formatDateString: function (datetime) {
    return moment(datetime).toISOString()
  },

  humanize: function (datetime) {
    return moment(datetime).fromNow()
  },

  renderMessage: function () {
    var
      image_regex = /https?:\/\/.*\.(?:jpg|jpeg|gif|png|webp|svg)/ig,
      regular_ass_link_regex = /((https?:\/\/)?(www\.)?[^ ]+\.[^ ]{2,}(\/[^ ]*)?)($| )/ig,
      youtube_regex = /https?:\/\/www.youtube.com\/watch?[^ ]*( |$)/ig,
      text = this.props.text,
      image_match = image_regex.exec(text),
      link_match = regular_ass_link_regex.exec(text),
      youtube_match = youtube_regex.exec(text),
      message_blobs = []

    if (image_match) {
      text = text.replace(image_match[0], "")
      message_blobs.push(<img src={image_match[0]} className="img-responsive" />)
    }

    if (youtube_match) {
      text = text.replace(youtube_match[0], "")
      message_blobs.push(<Youtube url={youtube_match[0]} />)
    }

    if (link_match) {
      var url = link_match[0]
      text = text.replace(url, "")

      if (url.indexOf("http") != 0) {
          url = "http://" + url
      }

      message_blobs.push(<a href={url} target='_blank'> {url} </a>)
    }

    message_blobs.unshift(text)
    return message_blobs
  },


})

module.exports = Message
