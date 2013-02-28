
/**
 * Deps.
 */

var pluck = require('pluck')
  , comparators = require('./comparators');

/**
 * Expose `Rule`.
 */

module.exports = Rule;

/**
 * Initialize a new "rule" for the `path`.
 *
 * @api private
 * @param {String} path
 * @param {Ruler} ruler
 */

function Rule(path, ruler){
  this.path = path;
  this.ruler = ruler;
  this.stack = [];
}

/**
 * Tests the rule.
 *
 * @api private
 * @param {Object} obj
 * @return {Boolean}
 */

Rule.prototype.test = function(obj){
  if ('undefined' == typeof obj) return false;
  var actual = pluck(this.path, obj);
  return this.stack.every(function(fn){
    return fn(actual);
  });
};

/**
 * Breaks the chain and initializes a new `rule`
 * from the context of the origin `ruler`.
 *
 * @api private
 * @return {Ruler}
 */

Rule.prototype.rule = function(){
  var ruler = this.ruler;
  return ruler.rule.apply(ruler, arguments);
};

/**
 * Breaks the chain and returns the origin `ruler`.
 *
 * @api public
 * @return {Ruler}
 */

Rule.prototype.end = function(){
  return this.ruler;
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