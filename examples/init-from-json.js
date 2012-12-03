
var ruler = require('..')
  , assert = require('assert');

var obj = {
  name: {
    first: 'john',
    last: 'doe'
  },
  age: 21,
  company: 'redventures'
};

var rules = [
  { cmp: 'eq', path: 'name.first', value: 'john' },
  { cmp: 'neq', path: 'name.last', value: 'buzz' },
  { cmp: 'contains', path: 'company', value: 'red' },
  { cmp: 'gte', path: 'age', value: 21 }
];

var engine = ruler(rules);
var result = engine.test(obj);

assert.equal(result, true);