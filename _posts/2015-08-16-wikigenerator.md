---
layout: post
title:  "Dank Wiki Generator"
date:   2015-07-21 24:00:00
categories: updates
---

You can find our wiki generator [here](https://github.com/igemuoftATG/wiki2015).

It makes use of the following technologies:

* dank
* [Yeoman](http://yeoman.io/)
* [Gulp](http://gulpjs.com/)
* [handlebars](http://handlebarsjs.com/)
* [SASS](http://sass-lang.com/) (libsass) and [compass-mixins](https://github.com/Igosuki/compass-mixins)
* [Bower](http://bower.io/)
* [NPM](https://www.npmjs.com/)
* [Browserify](http://browserify.org/)
* [CoffeeScript](http://coffeescript.org/)

## How this works

I have documented
[gulpfile.coffee](http://45.55.193.224/wiki2015/docs/gulpfile.html) and
[helpers.coffee](http://45.55.193.224/wiki2015/docs/helpers.html) which are the
two core modules for all of this to work.

## Usage

```bash
$ yo wikigenerator
```

You will then be asked a few questions. Please answer them politely. What is
your team name, what year is it, etc. This answers will be used to scaffold out
a bare wiki.

## Features

The core of this generator is built around compiling one set of
[handlebars](http://handlebarsjs.com/) templates into a `live` and `dev`
version. The `dev` version located within `./build-dev` can be locally hosted
with all *navigational* URIs pointing to local files. On the other hand, the
`live` version located within `./build-live` uses links that follow the iGEM
Wiki namespacing conventions.

* compile `./src/**/*.hbs` into `./build-dev/**/*.html` and `./build-live/**/*.html`
* working handlebars variables inside pages *and* templates

## ToDos

* implement markdown compiling for page content
* make Yeoman generator
* do live build for bower deps into one file

## Guide

### Defining page links

### Creating new pages

### Creating new templates
