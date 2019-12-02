const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { cloneDeep, merge } = require('lodash');

const js = module.exports.js = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      configFile: path.resolve(__dirname, './config/babel.config.js')
    }
  }
};

const eot = module.exports.eot = {
  test: /\.eot(\?v=\d+.\d+.\d+)?$/,
  use: ['file-loader']
};

const woff = module.exports.woff = {
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff'
      }
    }
  ]
};

const otf = module.exports.otf = {
  test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/octet-stream'
      }
    }
  ]
};

const svg = module.exports.svg = {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/svg+xml'
      }
    }
  ]
};

const img = module.exports.img = {
  test: /\.(jpe?g|png|gif|ico)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }
  ]
};

const styles = module.exports.styles = {
  test: /\.(css|less)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { sourceMap: true }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [autoprefixer],
        sourceMap: true
      },
    },
    {
      loader: 'less-loader',
      options: {
        paths: [path.resolve(process.cwd(), './node_modules')],
        sourceMap: true
      }
    },
  ]
};

const useNameExt = { use: [{ options: { name: '[name].[ext]' } }] };

module.exports.developmentLoaders = cloneDeep([js, eot, woff, otf, svg, img, styles]);
module.exports.productionLoaders = cloneDeep([
  js,
  merge(eot, { use: [{ loader: 'url-loader' }] }, useNameExt),
  merge(woff, useNameExt),
  merge(otf, useNameExt),
  merge(svg, useNameExt),
  img,
  merge(styles, {
    use: [
      MiniCssExtractPlugin.loader, {},
      { options: { plugins: () => [cssnano, autoprefixer] } }
    ]
  })
]);
