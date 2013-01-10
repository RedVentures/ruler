 [![Build Status](https://secure.travis-ci.org/RedVentures/ruler.png?branch=master)](http://travis-ci.org/RedVentures/ruler)

# ruler

composable object testing

*npm:*

```shell
npm install ruler
```

## Usage

Ruler is meant for just simple, top-down testing; there is not need or desire to have a nested trees of "child" conditions, etc. You can build your tests via progamatically, or an array of objects with `comparator`, `path` and `value` properties. The later of the two is ugly, but might be handy if you need to store the "rules" in a database or something.

*Build assertions programatically:*

```javascript
var ruler = require('ruler')
  , assert = require('assert');

// initialize

var engine = ruler()
  .rule('name.first')
    .eq('john')
  .rule('name.last')
    .neq('buzz')
  .rule('company')
    .contains('red')
  .rule('number')
    .gte(0)
    .lte(100)
  .end();

// rests an object against the "rule set"

var result = engine.test({
  name: {
    first: 'john',
    last: 'doe'
  },
  number: 50,
  company: 'redventures'
});

assert.equal(result, true);
```

*Pass in an arrray of key/value rules:*

```javascript
var ruler = require('ruler')
  , assert = require('assert');

var obj = {
  name: {
    first: 'john',
    last: 'doe'
  },
  number: 100,
  company: 'redventures'
};

var filters = [
  { comparator: 'is', path: 'name.first', value: 'john' },
  { comparator: 'not', path: 'name.last', value: 'buzz' },
  { comparator: 'contains', path: 'company', value: 'red' },
  { comparator: 'gte', path: 'number', value: 75 }
];

var engine = ruler(filters);
var result = engine.test(obj);

assert.equal(result, true);
```

## Composition
Rules sets can be created seperately for their own use, but then composed together in order to create more complex rules without having to create duplicated rules. 

```javascript
var ruler = require('ruler')
  , assert = require('assert');

// name rules

var names = ruler();
  .rule('name.first')
    .eq('john')
  .rule('name.last')
    .neq'buzz');
  .end();

// info rules

var info = ruler()
  .rule('company')
    .contains('red')
  .rule('number')
    .gte(50);

// compose "name" and "info" together

var all = names.and(info);

// test object against the "rule set"

var result = all.test({
  name: {
    first: 'john',
    last: 'doe'
  },
  number: 75,
  company: 'redventures'
});

assert.equal(result, true);
```

## TODO

  - optimize, `every()` is probably slow.
  - "works" with component, but uses bunch of ES5 stuff...


## License

Copyright 2012 Red Ventures

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.