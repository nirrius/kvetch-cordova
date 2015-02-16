var
  Marty = require("marty"),
  constants = require("./constants")

module.exports = Marty.createStore({
  handlers: {
    populateMessage: constants.FETCH_MESSAGE
  },

  getInitialState: function () {
    return {}
  },

  // bootstrapRoot: function (id, messageRef) {
  //   var
  //     message = _.omit(messageRef, "children")

  //   message.id = id
  //   this.state[id] = messageRef

  //   this.hasChanged()
  // },

  populateMessage: function (messageRef) {
    this.state[messageRef.id] = messageRef

    this.hasChanged()
  }
})
