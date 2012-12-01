
var ruler = require('..')
  , assert = require('assert');

var engine = ruler()
  .is('name.first', 'john')
  .not('name.last', 'buzz')
  .contains('company', 'red')
  .gte('age', 21);

var result = engine.test({
  name: {
    first: 'john',
    last: 'doe'
  },
  age: 21,
  company: 'redventures'
});

assert.equal(result, true);