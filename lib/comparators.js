
exports.matches = function(a, b){
  b = 'string' == typeof b
    ? new RegExp(b)
    : b;
  return new RegExp(b).test(a);
};

exports.contains = function(a, b){
  return !!~a.indexOf(b);
};

exports.ncontains = function(a, b){
  return !~a.indexOf(b);
};

exports.is = function(a, b){
  return a === b;
};

exports.not = function(a, b){
  return a !== b;
};

exports.eq = function(a, b){
  return a == b;
};

exports.neq = function(a, b){
  return a != b;
};

exports.gt = function(a, b){
  return a > b;
};

exports.gte = function(a, b){
  return a >= b;
};

exports.lt = function(a, b){
  return a < b;
};

exports.lte = function(a, b){
  return a <= b;
};

exports.exists = function(a){
  return a != null;
};

exports.nexists = function(a){
  return a == null;
};