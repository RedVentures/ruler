
/**
 * Deps.
 */

var Rule = require('./rule');

/**
 * Expose `ruler`.
 */

module.exports = exports = Ruler;

/**
 * Intialize a new "ruler" from the optional `rules`.
 */

function Ruler(rules){
  if (!(this instanceof Ruler)) return new Ruler(rules);
  this.rules = [];
}

/**
 * Tests the `obj` against the "rule" `stack`.
 */

Ruler.prototype.test = function(obj){
  return this.rules.every(function(rule){
    return rule.test(obj);
  });
};

/**
 * Initializes a new `rule` and pushes it onto the `stack`.
 */

Ruler.prototype.rule = function(path){
  var rule = new Rule(path, this);
  this.rules.push(rule);
  return rule;
};