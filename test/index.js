'use strict';

var should = require('chai').should(); // eslint-disable-line

describe('Stylus renderer', function() {
  var ctx = {
    config: {
      stylus: {
        compress: false
      }
    },
    theme: {
      config: {
        foo: 1,
        bar: {
          baz: 2
        },
        nil: null,
        obj: {
          arr: [1, 2, 3]
        }
      }
    }
  };

  var r = require('../lib/renderer').bind(ctx);

  it('no config', function() {
    var body = [
      '.foo',
      '  color: red'
    ].join('\n');
    var config = ctx.config.stylus;

    ctx.config.stylus = null;
    r({text: body}, {}, function(err, result) {
      if (err) throw err;

      ctx.config.stylus = config;
      result.should.eql([
          '.foo {',
          '  color: #f00;',
          '}'
        ].join('\n') + '\n');
    });
  });

  it('default', function() {
    var body = [
      '.foo',
      '  color: red'
    ].join('\n');

    r({text: body}, {}, function(err, result) {
      if (err) throw err;

      result.should.eql([
          '.foo {',
          '  color: #f00;',
          '}'
        ].join('\n') + '\n');
    });
  });

  it('compress', function() {
    ctx.config.stylus.compress = true;

    var body = [
      '.foo',
      '  color: red'
    ].join('\n');

    r({text: body}, {}, function(err, result) {
      if (err) throw err;

      ctx.config.stylus.compress = false;
      result.should.eql('.foo{color:#f00}');
    });
  });

  it('hexo-config', function() {
    var body = [
      // first depth and exist
      '.foo',
      '  content: hexo-config("foo")',
      '',
      // second depth and exist
      '.bar',
      '  content: hexo-config("bar.baz")',
      '',
      // another style for nested attribute
      '.baz',
      '  content: hexo-config("bar[baz]")',
      '',
      // nested attribute does not exist
      '.boo',
      '  content: hexo-config("bar.boo")',
      '',
      // config does not exist
      '.test',
      '  content: hexo-config("boo")',
      '',
      // try to get nested attribute in non-object
      '.app',
      '  content: hexo-config("foo.test")',
      '',
      // nil attribute
      '.nil',
      '  content: hexo-config("nil")',
      '',
      // object attribute
      '.obj',
      '  for i in hexo-config("obj.arr")',
      '    content: i'
    ].join('\n');

    r({text: body}, {}, function(err, result) {
      if (err) throw err;

      result.should.eql([
        '.foo {',
        '  content: 1;',
        '}',
        '.bar {',
        '  content: 2;',
        '}',
        '.baz {',
        '  content: 2;',
        '}',
        '.boo {',
        '  content: \'\';',
        '}',
        '.test {',
        '  content: \'\';',
        '}',
        '.app {',
        '  content: \'\';',
        '}',
        '.nil {',
        '  content: \'\';',
        '}',
        '.obj {',
        '  content: 1;',
        '  content: 2;',
        '  content: 3;',
        '}'
      ].join('\n') + '\n');
    });
  });
});
