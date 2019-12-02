const baseConfig = require('./config/base');
const babelConfig = require('./config/babel.config');
const { createConfig, createDevConfig, createProdConfig } = require('./config/createConfig');
const console = require('./console/console');
const server = require('./server/server');
const createDevServer = require('./server/createDevServer');
const createProdServer = require('./server/createProdServer');
const build = require('./build');
const compiler = require('./compiler');
const env = require('./env');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  createConfig,
  createDevConfig,
  createProdConfig,
  createDevServer,
  createProdServer,
  console,
  baseConfig,
  babelConfig,
  server,
  build,
  compiler,
  env,
  loaders,
  plugins
};
