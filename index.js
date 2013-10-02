
module.exports = exports = process.env.RULER_COV
  ? require('./lib-cov/ruler')
  : require('./lib/ruler');