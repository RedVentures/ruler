
/**
 * Deps.
 */

var Rule = require('./rule');

/**
 * Expose `ruler`.
 */

module.exports = exports = Ruler;

/**
 * Expose internals.
 */

exports.Rule = Rule;

/**
 * Intialize a new "ruler" from the optional `rules`.
 *
 * @api public
 * @param {Array} rules
 */

function Ruler(rules){
  if (!(this instanceof Ruler)) return new Ruler(rules);
  this.rules = [];
  if (Array.isArray(rules)) {
    rules.forEach(this.add.bind(this));
  }
}

/**
 * Tests the `obj` against the rules.
 *
 * @api public
 * @param {Object} obj
 * @return {Boolean}
 */

Ruler.prototype.test = function(obj){
  return this.rules.every(function(rule){
    return rule.test(obj);
  });
};

/**
 * Joins the two stacks together.
 *
 * @api public
 * @param {Ruler} other
 * @return {Ruler}
 */

Ruler.prototype.and = function(other){
  var rules = this.rules.concat(other.rules);
  return new Ruler(rules);
};

/**
 * Initializes a new `rule` for the `path`.
 *
 * @api public
 * @param {String} path
 * @return {Rule}
 */

Ruler.prototype.rule = function(path){
  var rule = new Rule(path, this);
  this.rules.push(rule);
  return rule;
};

/**
 * Adds an existing rule into the "rule stack".
 *
 * @api private
 * @param {Mixed} obj
 * @return {Ruler}
 */

Ruler.prototype.add = function(obj){
  var rule;
  if (obj instanceof Rule) {
    rule = obj;
  } else {
    rule = new Rule(obj.path);
    rule[obj.comparator](obj.value);
  }
  this.rules.push(rule);
  return this;
};