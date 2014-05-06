var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    assets = require('metalsmith-assets'),
    _ = require('underscore'),
    swig = require('swig');

// Swig will use this to prepend the layouts directory to every template
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/layouts' )});

// Configuration for building the site
module.exports = Metalsmith(__dirname)
  .use(markdown())
  .use(definitions)
  .use(schemas)
  .use(mediaTypes)
  .use(templates({
    "engine": "swig",
    "directory": "layouts"
  }));

// The following plugins need refactoring

// Include a definitions table for files specifying `definitionsFile`
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

// Include example for files specifying `exampleFile`
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

// Include schema for files specifying `schemaFile`
function schemas(files, metalsmith, done) {
  for (var file in files) {
    if (files[file].schemaFile) {
      var schemaFile = require('./src/' + files[file].schemaFile);
      renderedFile = swig.renderFile('schema.html', { 
        schema: schemaFile,
        rawJson: JSON.stringify(schemaFile, null, 2)
      });
      files[file].contents += renderedFile;
    }
  }
  done();
}