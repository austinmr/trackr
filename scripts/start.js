var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var detect = require('detect-port');
var prompt = require('react-dev-utils/prompt');
var openBrowser = require('react-dev-utils/openBrowser');

var DEFAULT_PORT = process.env.PORT || 3000;
var compiler;
var handleCompile;
compiler = webpack(config, handleCompile); 

function runDevServer(host, port, protocol) {
  var devServer = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    contentBase: '../public',
    hot: true,
    publicPath: '/',
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    host: host
  });

  // Launch WebpackDevServer.
  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('Starting the development server...');
    console.log();
    openBrowser(protocol + '://' + host + ':' + port + '/');
  });
}

function run(port) {
  runDevServer('localhost', port, 'http');
}

detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  var question = (
    'Something is already running on port ' + DEFAULT_PORT + '.' + 
    '\n\nWould you like to run the app on another port instead?'
    )

  prompt(question, true).then(shouldChangePort => {
    if (shouldChangePort) {
      run(port);
    }
  });
});