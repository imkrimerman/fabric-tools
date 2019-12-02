const DEVELOPMENT = module.exports.DEVELOPMENT = 'development';
const TESTING = module.exports.TESTING = 'testing';
const PRODUCTION = module.exports.PRODUCTION = 'production';

const currentEnv = module.exports.currentEnv = function() {
  return process.env.NODE_ENV;
}

module.exports.setCurrentEnv = function(env) {
  process.env.NODE_ENV = env;
}

module.exports.isDevelopment = function() {
  return currentEnv() === DEVELOPMENT;
}

module.exports.isTesting = function() {
  return currentEnv() === TESTING;
}

module.exports.isProduction = function() {
  return currentEnv() === PRODUCTION;
}
