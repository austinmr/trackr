process.env.NODE_ENV = 'development';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'public');
var INDEX = path.resolve(__dirname, 'public/index.html');

var config = {
  entry: [
  require.resolve('react-dev-utils/webpackHotDevClient'),
  APP_DIR + '/index.js'
  ],

  output: {
    path: BUILD_DIR,
    pathinfo: true, 
    filename: 'bundle.js',
    publicPath: '/'
  }, 

  devServer: {
    historyApiFallback: true
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        loader: 'babel',
        
      }, 
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: INDEX,
    })
  ]
};

module.exports = config;