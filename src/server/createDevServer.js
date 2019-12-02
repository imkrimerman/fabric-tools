const server = require('./server');
const { createDevConfig } = require('../config/createConfig');
const { DEVELOPMENT } = require('../env');

const devServerOptions = {
  contentBase: '/src',
  historyApiFallback: { index: '/' },
  hot: true,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
};

const config = createDevConfig();

module.exports = function createDevServer(compilerOptions = config, serverOptions = devServerOptions) {
  return server(DEVELOPMENT, config, serverOptions);
}

module.exports.devCompilerOptions = config;
module.exports.devServerOptions = devServerOptions;
