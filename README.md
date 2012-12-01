 [![Build Status](https://secure.travis-ci.org/RedVentures/ruler.png?branch=master)](http://travis-ci.org/RedVentures/ruler)

# ruler

composable object testing

*npm:*

```shell
npm install ruler
```

## Features
  - simple implementation, < 100 lines of code.
  - built-in comparisons
    - eq
    - neq
    - contains
    - matches
    - gt
    - gte
    - lt
    - lte
  - extendable (see [plugins](#plugins))
  - composable (see [composition](#composable))

## Usage

ruler is meant for just simple, top-down testing; there is not need or desire to have a nested trees of "child" conditions, etc. You can build your tests via progamatically, or an array of objects with `cmp`, `path` and `value` properties. The later of the two is ugly, but might be handy if you need to store the "rules" in a database or something.

*Build assertions programatically:*

```javascript
var ruler = require('ruler')
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
  age: 21,
  company: 'redventures'
};

var filters = [
  { cmp: 'is', path: 'name.first', value: 'john' },
  { cmp: 'not', path: 'name.last', value: 'buzz' },
  { cmp: 'contains', path: 'company', value: 'red' },
  { cmp: 'gte', path: 'age', value: 21 }
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

var names = ruler()
  .is('name.first', 'john')
  .not('name.last', 'buzz')

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
```

## Plugins

You can plugin custom "comparators" if the baked in one's do not fit your needs.

```javascript
function doubled(actual, total){
  return (actual * 2) == total;
}

var engine = ruler()
  .use(doubled, 'price', 40);

engine.test({
  price: 20
});
```

## TODO

  - optimize, `every()` is probably slow.
  - "works" with component, but uses bunch of ES5 stuff...
  - more built-in comparators?


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