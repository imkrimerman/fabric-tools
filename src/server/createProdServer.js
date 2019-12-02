const server = require('./server');
const { createProdConfig } = require('../config/createConfig');
const { PRODUCTION } = require('../env');

const prodServerOptions = {
  contentBase: '/dist',
  historyApiFallback: { index: '/' },
  hot: false,
  noInfo: true,
  quiet: true,
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

const config = createProdConfig();

module.exports = function createProdServer(compilerOptions = config, serverOptions = prodServerOptions) {
  return server(PRODUCTION, config, serverOptions);
}

module.exports.prodCompilerOptions = config;
module.exports.prodServerOptions = prodServerOptions;
