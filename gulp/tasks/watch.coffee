gulp = require "gulp"

tasks =
  "assets/stylesheets/**/*.styl": ["stylesheets", "prepare-cordova"]
  "assets/templates/**/*.jade": ["templates", "prepare-cordova"]
  "assets/images/**/*": ["images", "prepare-cordova"]
  "assets/fonts/**/*": ["fonts", "prepare-cordova"]
  # Javascripts watched with Watchify.

gulp.task "watch", ["setWatch", "build", "prepare-cordova"], ->
  for match, task of tasks
    gulp.watch match, task, (event) ->
      console.log(event)

