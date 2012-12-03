
var ruler = require('..')
  , assert = require('assert');

// names

var names = ruler()
  .rule('name.first')
    .eq('john')
  .rule('name.last')
    .neq('buzz')
  .end();

// info

var info = ruler()
  .rule('company')
    .contains('red')
  .rule('age')
    .eq(21)
  .end();

// compose an "all" ruler

var all = names.and(info);

// results

var result = all.test({
  name: {
    first: 'john',
    last: 'doe'
  },
  age: 21,
  company: 'redventures'
});

assert.equal(result, true);