var
  Marty = require("marty"),
  _ = require("lodash"),
  Firebase = require("firebase"),
  constants = require("./constants"),
  firebaseRef = new Firebase("https://kvetch.firebaseio.com/messages/")

module.exports = Marty.createActionCreators({
  fetchMessage: constants.FETCH_MESSAGE(function (id) {
    function onSuccess (snapshot) {
      var
        messageRef = snapshot.val()

      _.defaults(messageRef, {
        children: [],
        id: id,
        parents: []
      })

      this.dispatch(messageRef)

      messageRef.children.forEach(function (id) {
        this.fetchMessage(id)
      }.bind(this))
    }

    firebaseRef.child(id).on("value", onSuccess.bind(this))
  })
})
