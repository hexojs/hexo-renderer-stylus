'use strict';

const stylus = require('stylus');
const nib = require('nib');

function getProperty(obj, name) {
  name = name.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');

  const split = name.split('.');
  let key = split.shift();

  if (!Object.prototype.hasOwnProperty.call(obj, key)) return '';

  let result = obj[key];
  const len = split.length;

  if (!len) return result || '';
  if (typeof result !== 'object') return '';

  for (let i = 0; i < len; i++) {
    key = split[i];
    if (!Object.prototype.hasOwnProperty.call(result, key)) return '';

    result = result[split[i]];
    if (typeof result !== 'object') return result;
  }

  return result;
}

module.exports = function(data, options, callback) {
  const config = this.config.stylus || {};
  const self = this;

  function defineConfig(style) {
    style.define('hexo-config', function(data) {
      return getProperty(self.theme.config, data.val);
    });
  }

  stylus(data.text)
    .use(nib())
    .use(defineConfig)
    .set('filename', data.path)
    .set('sourcemap', config.sourcemaps)
    .set('compress', config.compress)
    .set('include css', true)
    .render(callback);
};
