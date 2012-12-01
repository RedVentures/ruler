
/**
 * Deps.
 */

var toFunction = require('to-function')
  , comparators = require('./comparators');

/**
 * Expose `ruler`.
 */

module.exports = exports = Ruler;

/**
 * Intialize a new "ruler" from the optional `rules`.
 */

function Ruler(rules){
  if (!(this instanceof Ruler)) return new Ruler(rules);
  this.stack = [];
  if (Array.isArray(rules)) {
    rules.forEach(function(obj){
      if ('function' == typeof obj) this.stack.push(obj)
      else this[obj.cmp](obj.path, obj.value)
    }, this);
  }
}

/**
 * Tests the `obj` against the "rule" `stack`.
 */

Ruler.prototype.test = function(obj){
  return this.stack.every(function(fn){
    return fn(obj);
  });
};

/**
 * Pushes a "rule" function onto the `stack`.
 */

Ruler.prototype.use = function(cmp, path, value){
  this.stack.push(function(obj){
    var actual = toFunction(path)(obj);
    return cmp(actual, value);
  });
};

/**
 * Merge another engine in.
 */

Ruler.prototype.and = function(other){
  var stack = this.stack.concat(other.stack);
  return new Ruler(stack);
};

/**
 * Load our pre-baked comparators.
 */

Object
  .keys(comparators)
  .forEach(function(key){
    Ruler.prototype[key] = function(path, value){
      this.use(comparators[key], path, value);
      return this;
    };
  });