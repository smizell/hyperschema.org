var JaySchema = require('jayschema');
var js = new JaySchema(JaySchema.loaders.http);     // we provide the HTTP loader here
                                                    // you could load from a DB instead

var instance = require('./src/mediatypes/uber_files/example.json');
var schema = require('./src/mediatypes/uber.json');

js.validate(instance, schema, function(errs) {
  if (errs) { console.error(errs); }
  else { console.log('validation OK!'); }
});