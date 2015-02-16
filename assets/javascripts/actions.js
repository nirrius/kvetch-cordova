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
        self = this,
        messageRef = snapshot.val()

      _.defaults(messageRef, {
        id: id,
        children: []
      })

      self.dispatch(messageRef)
      messageRef.children.forEach(function (id) {
        self.fetchMessage(id)
      })
    }

    firebaseRef.child(id).on("value", onSuccess.bind(this))
  })
})
