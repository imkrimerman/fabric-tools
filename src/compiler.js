// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
const webpack = require('webpack');
const { done, error, info, success, warning } = require('./console/console');
const { DEVELOPMENT, setCurrentEnv } = require('./env');

const msg = {
  started: 'Generating bundle. This will take a moment...',
  finishedProduction: 'Your App is compiled in production mode in /dist.',
  warnings: 'Webpack generated the following warnings:',
  error: 'Build Failed',
  errorCompiled: 'Oops, there was an error, but bundle was generated',
};

function writeMsg(msg, method = warning) {
  Array.isArray(msg) ? method(...msg) : method(msg);
}

function abort(err, errorMsg = msg.errorCompiled) {
  writeMsg(err, error);
  error(errorMsg);
  return 1;
}

module.exports = function compiler(ENV, config, messages = msg) {
  setCurrentEnv(ENV);

  const Compiler = webpack(config);
  if (ENV === DEVELOPMENT) return Compiler;

  let bundleStart = Date.now();
  info(messages.started);

  Compiler.run((err, stats) => {
    if (err) return abort(err, messages.error);

    const jsonStats = stats.toJson();
    if (jsonStats.warnings.length) writeMsg(jsonStats.warnings);
    if (jsonStats.errors.length) return abort(jsonStats.errors);

    success(messages.finishedProduction);
    return 0;
  });

  Compiler.plugin('done', function() {
    done('Generated bundle in ' + ((Date.now() - bundleStart) / 1000) + 's!');
  });

  return Compiler;
}
