
var ruler = require('..')
  , assert = require('assert');

var names = ruler();
var info = ruler();

// names

names
  .rule('name.first')
    .eq('john')
  .rule('name.last')
    .eq('buzz');

// info

info
  .rule('company')
    .contains('red')
  .rule('age')
    .eq(21);

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