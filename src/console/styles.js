const brightColor = "\x1b[1m";
const resetStyle = "\x1b[0m";
const underscoreStyle = "\x1b[4m";

const styles = {

  bright: brightColor,
  reset: resetStyle,
  red: `\x1b[31m${brightColor}`,
  green: `\x1b[32m${brightColor}`,
  yellow: `\x1b[33m${brightColor}`,
  blue: `\x1b[34m${brightColor}`,
  underscore: string => `${underscoreStyle}${string}${resetStyle}`,

  icons: {
    error: '❗❗❗ ',
    warning: '❕❕❕ ',
    success: '✔  ',
    info: '',
    done: '✔ ',
    fail: '✘ ',
    link: '',
    app: '[Fabric]: ',
  },

  typeToColor: function(type) {
    switch (type) {
      case 'error':
        return 'red';
      case 'warning':
        return 'yellow';
      case 'success':
        return 'green';
      case 'info':
        return 'blue';
      case 'done':
        return 'green';
      case 'fail':
        return 'red';
      case 'link':
        return 'bright';
      default:
        return '';
    }
  },

  getStyles(type) {
    const icon = styles.icons[type] || '';
    return `${styles[this.typeToColor(type)] || ''}${icon}`;
  },

  link: function(type, string) {
    return `${styles.getStyles('link')}\`${styles.underscore(string)}\`${styles.getStyles(type)}`;
  },
};

module.exports = styles;
