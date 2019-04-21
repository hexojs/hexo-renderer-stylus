'use strict';

// TODO: There is no reason to hard code nib in here now.
//       But keeping for backward compatibility.

var stylus, nib;

module.exports = function(data, options, callback) {
  // Lazy require
  if (!stylus) {
    stylus = require('stylus');
  }

  var config = this.config.stylus || {};
  var self = this;
  var plugins = ['nib'].concat(config.plugins || []);

  function defineConfig(style) {
    style.define('hexo-config', function(data) {
      return getProperty(self.theme.config, data.val);
    });
  }

  var stylusConfig = stylus(data.text);

  applyPlugins(stylusConfig, plugins);

  stylusConfig
    .use(defineConfig)
    .set('filename', data.path)
    .set('sourcemap', config.sourcemaps)
    .set('compress', config.compress)
    .set('include css', true)
    .render(callback);
};

function getProperty(obj, name) {
  name = name.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');

  var split = name.split('.');
  var key = split.shift();

  if (!obj.hasOwnProperty(key)) return '';

  var result = obj[key];
  var len = split.length;

  if (!len) return result || '';
  if (typeof result !== 'object') return '';

  for (var i = 0; i < len; i++) {
    key = split[i];
    if (!result.hasOwnProperty(key)) return '';

    result = result[split[i]];
    if (typeof result !== 'object') return result;
  }

  return result;
}

function applyPlugins(stylusConfig, plugins) {
  plugins.forEach(function(plugin) {
    var moduleName = plugin.trim();
    var factoryFn = require(moduleName);
    stylusConfig.use(factoryFn());
  });
}
