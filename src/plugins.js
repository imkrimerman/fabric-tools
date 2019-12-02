const { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { DEVELOPMENT, PRODUCTION } = require('./env');

const createGlobals = module.exports.createGlobals = function(ENV) {
  return {
    'process.env.NODE_ENV': JSON.stringify(ENV),
    'process.env.ENV': JSON.stringify(ENV),
    __DEV__: ENV === DEVELOPMENT
  };
}

module.exports.developmentPlugins = [
  // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
  new DefinePlugin(createGlobals(DEVELOPMENT)),
  new HardSourceWebpackPlugin(),
  new HotModuleReplacementPlugin(),
  new NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
    template: 'src/index.ejs',
    minify: {
      removeComments: true,
      collapseWhitespace: true
    },
    inject: true
  })
];

module.exports.productionPlugins = [
  // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
  new DefinePlugin(createGlobals(PRODUCTION)),

  // Generate an external css file with a hash in the filename
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  }),

  // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
  new HtmlWebpackPlugin({
    template: 'src/index.ejs',
//    favicon: 'static/favicon.ico',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    inject: true,
    // Note that you can add custom options here if you need to handle other custom logic in index.html
    // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
    trackJSToken: ''
  }),
];
