
exports.matches = function(a, b){
  return b.test(a);
};

exports.contains = function(a, b){
  return !!~a.indexOf(b);
};

exports.is = function(a, b){
  return a === b;
};

exports.not = function(a, b){
  return a !== b;
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