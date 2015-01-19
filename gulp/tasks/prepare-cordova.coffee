gulp        = require("gulp")
cordova_lib = require("cordova-lib")
cdv         = cordova_lib.cordova.raw

gulp.task "prepare-cordova", ->
  cdv.prepare()
