
var ruler = require('..')
  , assert = require('assert');

var names = ruler()
  .is('name.first', 'john')
  .not('name.last', 'buzz');

var info = ruler()
  .contains('company', 'red')
  .gte('age', 21);

var all = names.and(info);

var result = all.test({
  name: {
    first: 'john',
    last: 'doe'
  },
  age: 21,
  company: 'redventures'
});

assert.equal(result, true);