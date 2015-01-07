var stylus = require('stylus');
var nib = require('nib');

function getProperty(obj, key){
  key = key.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');

  var split = key.split('.');
  var result = obj[split[0]];

  for (var i = 1, len = split.length; i < len; i++){
    result = result[split[i]];
  }

  return result;
}

module.exports = function(data, options, callback){
  var config = this.config.stylus || {};
  var self = this;

  function defineConfig(style){
    style.define('hexo-config', function(data){
      return getProperty(self.theme.config, data.val);
    });
  }

  stylus(data.text)
    .use(nib())
    .use(defineConfig)
    .set('filename', data.path)
    .set('compress', config.compress)
    .set('include css', true)
    .render(callback);
};