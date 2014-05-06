var express = require('express'),
    app = module.exports = express(),
    builder = require('./builder'),
    watch = require('metalsmith-watch');

// Watches for changes in the `src` directory and rebuilds
// site on any change.
builder
  .use(watch())
  .build(function(err){
    if (err) throw err;
  })

// Handles every request to the server. It aims to provide content
// negotiation which allows this server to serve up HTML and JSON
// from the same URI.
function pageRoute(req, res, next) {
  var path = req.path.slice(1, req.path.length);

  // Support index files
  if (path.slice('-1') == '/' || path == "") {
    fullPath = path + 'index';
  } else {
    fullPath = path;
  }

  res.format({
    'text/html': function() {
      res.sendfile('./build/' + fullPath + '.html');
    },

    'application/json': function() {
      res.sendfile('./build/' + fullPath + '.json');
    }
  });
}

// Serve up assets
app.use('/assets', express.static(__dirname + '/build/assets'));

// Use same route for every request
app.get(["/*", "/"], pageRoute);

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});