const path = require("path");
const { isFunction, isPlainObject, extend } = require('lodash');
const { DEVELOPMENT, PRODUCTION } = require('../env');
const { productionPlugins } = require('../plugins');
const { productionLoaders } = require('../loaders');
const baseConfig = require('./base');

const createConfig = module.exports.createConfig = function(enhancer, method = extend) {
  const isFn = isFunction(enhancer);
  if (!isFn && !isPlainObject(enhancer)) return baseConfig;
  return method({}, baseConfig, isFn ? enhancer(baseConfig) : enhancer);
}

module.exports.createDevConfig = function(options = {}, method = extend) {
  return createConfig({ mode: DEVELOPMENT, ...options }, method);
}

module.exports.createProdConfig = function(options = {}, method = extend) {
  return createConfig({
    devtool: 'source-map',
    entry: path.resolve(process.cwd(), './src/index'),
    mode: PRODUCTION,
//    output: { ...baseConfig.output, filename: '[name].[contenthash].js' },
    plugins: productionPlugins,
    module: { rules: productionLoaders },
    ...options
  }, method);
}
