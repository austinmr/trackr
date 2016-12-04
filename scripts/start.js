var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var detect = require('detect-port');
var prompt = require('react-dev-utils/prompt');
var openBrowser = require('react-dev-utils/openBrowser');
var historyApiFallback = require('connect-history-api-fallback');
var httpProxyMiddleware = require('http-proxy-middleware');
var paths = require('../config/paths'); 

var DEFAULT_PORT = process.env.PORT || 3000;
var compiler;
var handleCompile;
compiler = webpack(config, handleCompile); 

function addMiddleware(devServer) {
  var proxy = require(paths.appPackageJson).proxy;
  devServer.use(historyApiFallback({

    disableDotRule: true,

    htmlAcceptHeaders: proxy ?
      ['text/html'] :
      ['text/html', '*/*']
  }));

  if (proxy) {
    if (typeof proxy !== 'string') {
      console.log(('When specified, "proxy" in package.json must be a string.'));
      console.log(('Instead, the type of "proxy" was "' + typeof proxy + '".'));
      console.log(('Either remove "proxy" from package.json, or make it a string.'));
      process.exit(1);
    }

    var mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/;
    devServer.use(mayProxy,

      httpProxyMiddleware(pathname => mayProxy.test(pathname), {
        target: proxy,
        logLevel: 'silent',
        secure: false,
        changeOrigin: true
      })
    );
  }
  // Finally, by now we have certainly resolved the URL.
  // It may be /index.html, so let the dev server try serving it again.
  devServer.use(devServer.middleware);
}

function runDevServer(host, port, protocol) {
  var devServer = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    contentBase: '../public/index.html',
    hot: true,
    publicPath: '/',
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    host: host
  });

  // Our custom middleware proxies requests to /index.html or a remote API.
  addMiddleware(devServer);

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