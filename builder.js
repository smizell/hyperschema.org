var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    assets = require('metalsmith-assets'),
    _ = require('underscore'),
    swig = require('swig');

swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/layouts' )});

module.exports = Metalsmith(__dirname)
  .use(markdown())
  .use(definitions)
  .use(mediaTypes)
  .use(templates({
    "engine": "swig",
    "directory": "layouts"
  }));

function definitions(files, metalsmith, done) {
  for (var file in files) {
    if (files[file].definitionsFile) {
      var definitionsFile = require('./src/' + files[file].definitionsFile);
      renderedFile = swig.renderFile('definitions.html', { 
        definitions: definitionsFile,
        rawJson: JSON.stringify(definitionsFile, null, 2)
      });
      files[file].contents += renderedFile;
    }
  }
  done();
}

function mediaTypes(files, metalsmith, done) {
  for (var file in files) {
    if (files[file].exampleFile) {
      var exampleFile = require('./src/' + files[file].exampleFile);
      renderedFile = swig.renderFile('media-types.html', { 
        definitions: exampleFile,
        rawJson: JSON.stringify(exampleFile, null, 2)
      });
      files[file].contents += renderedFile;
    }
  }
  done();
}