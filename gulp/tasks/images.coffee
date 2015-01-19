gulp = require("gulp")

gulp.task "images", ->
  gulp.src "assets/images/**/*"
    .pipe gulp.dest "www/assets"
