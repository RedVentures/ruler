
var ruler = require('..')
  , assert = require('assert');

// chain up rules

var engine = ruler()
  .rule('name.first')
    .eq('john')
  .rule('name.last')
    .eq('doe')
  .rule('company')
    .contains('red')
  .rule('age')
    .gte(21)
    .lte(31)
  .end();

// test it

var result = engine.test({
  name: {
    first: 'john',
    last: 'doe'
  },
  age: 21,
  company: 'redventures'
});

assert.equal(result, true);