const webpackDevServer = require('webpack-dev-server');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { done, info } = require('../console/console');
const compiler = require('../compiler');
const { DEVELOPMENT } = require('../env');

module.exports = function server(ENV, compilerOptions, devServerOptions) {
  info(`Starting App in ${ENV} environment.`);
  const Compiler = compiler(ENV, compilerOptions);
  const Server = new webpackDevServer(Compiler, devServerOptions);
  if (ENV === DEVELOPMENT) Server.use(webpackHotMiddleware(Compiler));
  Server.listen('3000', 'localhost', () => done(`Server started at http://localhost:3000`));
  return Server;
}
