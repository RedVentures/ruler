
var ruler = require('..')
  , assert = require('assert');

var engine = ruler()
  .assert('name.first').is('john')
  .assert('name.last').is('buzz')
  .assert('company').contains('red')
  .assert('age').gte(21).lt(30);

var result = engine.test({
  name: {
    first: 'john',
    last: 'doe'
  },
  age: 21,
  company: 'redventures'
});

assert.equal(result, true);

