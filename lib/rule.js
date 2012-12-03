/**
 * Deps.
 */

var toFunction = require('to-function')
  , comparators = require('./comparators');

/**
 * Expose `Rule`.
 */

module.exports = Rule;

/**
 * Initialize a new "rule" for the `path`.
 */

function Rule(path, ruler){
  this.path = toFunction(path);
  this.ruler = ruler;
  this.stack = [];
}

/**
 * Tests the rule.
 */

Rule.prototype.test = function(obj){
  var actual = this.path(obj);
  return this.stack.every(function(fn){
    return fn(actual);
  });
};

/**
 * Breaks the chain and initializes a new `rule`
 * from the context of the origin `ruler`.
 */

Rule.prototype.rule = function(){
  var ruler = this.ruler;
  return ruler.rule.apply(ruler, arguments);
};

/**
 * Mixin our pre-baked comparators.
 */

Object
  .keys(comparators)
  .forEach(function(key){
    Rule.prototype[key] = function(expected){
      this.stack.push(function(actual){
        return comparators[key](actual, expected);
      });
      return this;
    };
  });