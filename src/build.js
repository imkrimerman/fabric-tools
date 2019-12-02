const { createProdConfig } = require('./config/createConfig');
const compiler = require('./compiler');
const { PRODUCTION } = require('./env');

module.exports = function build(options) {
  return compiler(PRODUCTION, createProdConfig(options));
}
