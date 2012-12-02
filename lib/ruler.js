
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

  this.path = null;
  this.parent = null;
  this.assertStack = [];
}

/**
 * Tests the `obj` against the "rule" `stack`.
 */

Ruler.prototype.test = function(obj){
  this.flattenStacks();
  
  return this.stack.every(function(fn){
    return fn(obj);
  });
};

Ruler.prototype.flattenStacks = function() {
  if (this.assertStack.length) {
    var self = this;
    this.assertStack.forEach(function(assertObj) {
      self.stack = self.stack.concat(assertObj.stack);
    });
  }
};

Ruler.prototype.assert = function(path){
  var assertRuler = new Ruler();
  assertRuler.path = path;
  
  if (this.parent) {
    assertRuler.parent = this.parent;
    this.parent.assertStack.push(assertRuler);
  } else {
    assertRuler.parent = this;
    this.assertStack.push(assertRuler);
  }

  return assertRuler;
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
    Ruler.prototype[key] = function(){
      if (arguments.length === 1) {
        this.use(comparators[key], this.path, arguments[0]);
        return this;
      } else {
        this.use(comparators[key], arguments[0], arguments[1]);
        return this;
      }
    };
  });