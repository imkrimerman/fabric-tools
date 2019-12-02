const path = require("path");
const { developmentPlugins } = require('../plugins');
const { developmentLoaders } = require('../loaders');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    // To support react-hot-loader
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: [
    './src/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(process.cwd(), './src/index.js') // Defining path seems necessary for this to work consistently on
    // Windows machines.
  ],
  target: 'web',
  output: {
    path: path.resolve(process.cwd(), './dist'), // Note: Physical files are only output by the production build
    // task `npm run build`.
    publicPath: '/',
    filename: 'main.js',
    libraryTarget: "umd",
  },
  plugins: developmentPlugins,
  module: { rules: developmentLoaders }
};
