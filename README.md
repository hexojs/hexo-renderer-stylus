# hexo-renderer-stylus

[![Build Status](https://travis-ci.org/hexojs/hexo-renderer-stylus.svg?branch=master)](https://travis-ci.org/hexojs/hexo-renderer-stylus)
[![NPM version](https://badge.fury.io/js/hexo-renderer-stylus.svg)](https://www.npmjs.com/package/hexo-renderer-stylus)
[![Coverage Status](https://img.shields.io/coveralls/hexojs/hexo-renderer-stylus.svg)](https://coveralls.io/r/hexojs/hexo-renderer-stylus?branch=master)

Add support for [Stylus] with [nib] and other plugins.

## Install

Prerequisites:
- Hexo 3: >= 0.2
- Hexo 2: 0.1.x

``` bash
$ npm install hexo-renderer-stylus --save
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
stylus:
  compress: false
  sourcemaps:
    comment: true
    inline: true
    sourceRoot: ''
    basePath: .
  plugins: 'nib'
```

- **compress** - Compress generated CSS (default: `false`)
- **sourcemaps**
  - **comment** - Adds a comment with the `sourceMappingURL` to the generated CSS (default: `true`)
  - **inline** - Inlines the sourcemap with full source text in base64 format (default: `false`)
  - **sourceRoot** - `sourceRoot` property of the generated sourcemap
  - **basePath** - Base path from which sourcemap and all sources are relative (default: `.`)
- **plugins** - Stylus plugin(s) (default: `nib`)

## Setting Stylus variables

It is possible to set variables that can be used in Stylus.
The purpose of setting variable is to avoid direct modification of the Sylus code,
and thus to make themes more generic

For example, instead of hardcoding:
```stylus
div
 color #FFCC44
```

You can refer to a variable:
```stylus
div
 color convert(hexo-config("color"))
```

And in your theme's configuration, you can define this variable:
```yml
color: "#FFCC44"
```
(The "convert" function above is here to convert the string into an actual stylus color)

You can also use the theme_config variable in the main `_config.yml`:
```yml
theme_config:
  color: "#FFCC44"
```

[Stylus]: http://stylus-lang.com/
[nib]: http://stylus.github.io/nib/
