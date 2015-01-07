var should = require('chai').should();

describe('Stylus renderer', function(){
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
        }
      }
    }
  };

  var r = require('../lib/renderer').bind(ctx);

  var body = [
    '.foo',
    '  color: red',
    '  content: hexo-config("foo")',
    '',
    '.bar',
    '  content: hexo-config("bar.baz")',
    '',
    '.baz',
    '  content: hexo-config("bar[baz]")'
  ].join('\n');

  it('default', function(){
    ctx.config.stylus.compress = false;

    r({text: body}, {}, function(err, result){
      should.not.exist(err);

      result.should.eql([
        '.foo {',
        '  color: #f00;',
        '  content: 1;',
        '}',
        '.bar {',
        '  content: 2;',
        '}',
        '.baz {',
        '  content: 2;',
        '}'
      ].join('\n') + '\n');
    });
  });

  it('compress', function(){
    ctx.config.stylus.compress = true;

    r({text: body}, {}, function(err, result){
      should.not.exist(err);
      result.should.eql('.foo{color:#f00;content:1}.bar{content:2}.baz{content:2}');
    });
  });
});