gulp    = require("gulp")
gutil   = require("gulp-util")
connect = require("gulp-connect")

assets =
  port: 3000
  root: ["www"]

  # Invalid routes are caught by the client side router.
  fallback: "www/index.html"

  middleware: (connect) ->
    return [
      (req, res, next) ->
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Methods", "*")
        next()
    ]

gulp.task "serve", ->
  connect.server(assets)
