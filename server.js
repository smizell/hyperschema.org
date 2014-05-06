var express = require('express'),
    app = module.exports = express(),
    builder = require('./builder'),
    watch = require('metalsmith-watch');

builder
  .use(watch())
  .build(function(err){
    if (err) throw err;
  })

function pageRoute(req, res, next) {
  var path = req.path.slice(1, req.path.length);

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

app.use('/assets', express.static(__dirname + '/build/assets'));
app.get(["/*", "/"], pageRoute);
app.listen(3000);