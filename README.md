# hexo-renderer-stylus

[![Build Status](https://travis-ci.org/hexojs/hexo-renderer-stylus.svg?branch=master)](https://travis-ci.org/hexojs/hexo-renderer-stylus)  [![NPM version](https://badge.fury.io/js/hexo-renderer-stylus.svg)](http://badge.fury.io/js/hexo-renderer-stylus) [![Coverage Status](https://img.shields.io/coveralls/hexojs/hexo-renderer-stylus.svg)](https://coveralls.io/r/hexojs/hexo-renderer-stylus?branch=master)

Add support for [Stylus] with [nib].

## Install

``` bash
$ npm install hexo-renderer-stylus --save
```

- Hexo 3: >= 0.2
- Hexo 2: 0.1.x

## Options

You can configure this plugin in `_config.yml`.

``` yaml
stylus:
  compress: false
```

- **compress** - Compress generated CSS

[Stylus]: http://learnboost.github.io/stylus/
[nib]: http://visionmedia.github.io/nib/