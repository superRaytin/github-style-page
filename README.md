# github-style-page
> Convert markdown content into HTML file with Github styles (GFW).

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status](https://travis-ci.org/superRaytin/github-style-page.svg?branch=master)](https://travis-ci.org/superRaytin/github-style-page)

[![github-style-page](https://nodei.co/npm/github-style-page.png)](https://npmjs.org/package/github-style-page)

[npm-url]: https://npmjs.org/package/github-style-page
[downloads-image]: http://img.shields.io/npm/dm/github-style-page.svg
[npm-image]: http://img.shields.io/npm/v/github-style-page.svg

# Installation

```
npm install github-style-page
```

# Quick Start

```js
var githubStylePage = require('github-style-page');

githubStylePage('path/to/example.md', 'path/to/', function() {
    console.log('path/to/example.html generated!');
});

githubStylePage('## Options', 'path/to/', {
    isContent: true
}, function() {
    console.log('path/to/index.html generated!');
});
```

# API

```js
var githubStylePage = require('github-style-page');
```

### githubStylePage(path, targetDir [, options], callback)

- **path:** the path where the markdown file.
- **targetDir:** the directory path where the converted file will be saved.
- **options:** deal with some optional parameters, see [options](#options) for detail.
- **callback:** a function to be executed when converting is complete.

Below is an example:

```js
githubStylePage('path/to/example.md', 'path/to/', function() {
    console.log('path/to/example.html finished!');
});
```

### githubStylePage(markdownString, targetDir [, options], callback)

Provide a markdown string exactly.

> Note: set `isContent` to true to tell `github-style-page` current is a markdown string.

Below is an example:

```js
githubStylePage('## Options', 'path/to/', {
    isContent: true
}, function() {
    console.log('path/to/index.html generated!');
});
```

## Options

### template

Available template theme:

- **simple** the default template theme.
- **project** NPM project style.

#### project

Below is an `project` example, note that `pkg` should be provided and at least contains `name` and `version`:

```js
githubStylePage('path/to/example.md', 'path/to/', {
    template: 'project',
    vars: {
        pkg: {
            name: 'awesomeProject',
            version: '0.1.0'
        }
    }
}, function() {
    console.log('path/to/example.html finished!');
});
```

### customizeTemplatePath

Provide a customize template path to render the parsed markdown content.

> Note: if provided, the `template` option will take no effect.

```js
githubStylePage('path/to/example.md', 'path/to/', {
    customizeTemplatePath: 'path/to/customTemplate.html',
    vars: {
        a: 'xxx',
        b: 'xxx'
    }
}, function() {
    console.log('path/to/example.html finished!');
});
```

### vars

Template variables. Make sure that all variables used in the template where the `customizeTemplatePath` have been passed by the `vars`.

### markedOptions

Configuration for markdown parser, see [marked#options](https://github.com/chjj/marked#options-1) for detail.

```js
githubStylePage('## Options', 'path/to/', {
    markedOptions: {
        tables: true,
        breaks: false
    }
}, function() {
    console.log('path/to/index.html generated!');
});
```

### isContent

```js
githubStylePage('## Options', 'path/to/', {
    isContent: true
}, function() {
    console.log('path/to/index.html generated!');
});
```

### saveFileName

```js
githubStylePage('path/to/example.md', 'path/to/', {
    saveFileName: 'readme'
}, function() {
    console.log('path/to/readme.html generated!');
});
```

# Testing

```
npm test
```

# License

MIT, see the [LICENSE](/LICENSE) file for detail.