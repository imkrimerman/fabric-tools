// Centralized configuration for chalk, which is used to add color to console.log statements.
const styles = require('./styles');

const write = module.exports.write = (type, ...string) => {
  const appName = styles.icons.app;
  const style = type ? styles.getStyles(type) : '';
  const reset = styles.reset;
  return console.log([appName, style, ...string, reset].join(''));
};


module.exports.error = (...msg) => write('error', ...msg);
module.exports.warning = (...msg) => write('warning', ...msg);
module.exports.success = (...msg) => write('success', ...msg);
module.exports.info = (...msg) => write('info', ...msg);
module.exports.done = (...msg) => write('done', ...msg);
module.exports.fail = (...msg) => write('fail', ...msg);
module.exports.link = msg => write(null, styles.link('info', msg));
