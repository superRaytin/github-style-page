'use strict';

var Path = require('path');
var fs = require('fs');
var marked = require('marked');
var utpl = require('underscore.template');
var utils = require('./utils');
var polyfills = require('./polyfills');

function GithubStylePage(source, targetDir, options) {
  options = options || {};

  this.source = source;
  this.targetDir = targetDir;
  this.options = {};

  // extend instance properties with global defaults and initial properties
  utils.extend(this.options, this.defaults, options);
}

GithubStylePage.prototype.defaults = {
  name: 'index',
  // simple || project
  template: 'simple',
  customizeTemplatePath: null,
  body: null,
  vars: {},
  markedOptions: {
    gfm: true,
    tables: true,
    breaks: false
  },
  isContent: false,
  saveFileName: null
};

GithubStylePage.prototype.getName = function() {
  var options = this.options;
  var isContent = options.isContent;
  var source = this.source;
  var fileFormat = utils.getFileFormat(source);

  // path
  if (!isContent) {
    options.name = Path.basename(this.source, '.' + fileFormat);
  }

  return options.name;
};

GithubStylePage.prototype.convert = function(callback) {
  var self = this;
  var options = this.options;
  var name = this.getName();
  var vars = options.vars;
  var saveFileName = options.saveFileName || name;
  var saveToPath = Path.join(this.targetDir, saveFileName + '.html');
  var result;

  // get template content
  this.getTemplateContent(function(templateContent) {
    // get markdown content
    self.getMarkdownContent(function(markdownContent) {
      // parse markdown string
      var html = self.parseMarkdown(markdownContent);

      result = utpl(templateContent, {
        name: name,
        vars: vars,
        body: html
      });

      // save to binary file
      self.toFile(saveToPath, result, function() {
        callback && callback(html);
      });
    });
  });
};

// create binary file
GithubStylePage.prototype.toFile = function(path, str, callback) {
  var dataBuffer = new Buffer(str);

  polyfills.writeFile(path, dataBuffer, function() {
    callback && callback();
  });
};

GithubStylePage.prototype.parseMarkdown = function(markdownString) {
  var opt = utils.extend({
    renderer: new marked.Renderer()
  }, this.options.markedOptions);

  marked.setOptions(opt);

  return marked(markdownString);
};

GithubStylePage.prototype.getTemplateContent = function(callback) {
  var options = this.options;
  var templateName = options.template;
  var defaultTemplatePath = Path.join(__dirname, './template/' + templateName + '.html');
  var customizeTemplatePath = options.customizeTemplatePath || defaultTemplatePath;

  // get template content
  this.getFileContent(customizeTemplatePath, function(data) {
    callback(data);
  });
};

GithubStylePage.prototype.getMarkdownContent = function(callback) {
  var options = this.options;
  var source = this.source;
  var isContent = options.isContent;

  // content
  if (isContent) {
    callback(source);
  }
  // path
  else {
    this.getFileContent(source, function(data) {
      callback(data);
    });
  }
};

GithubStylePage.prototype.getFileContent = function(path, callback) {
  fs.readFile(path, function(err, data) {
    if (err) {
      throw err;
    }

    var parseData = data.toString();

    callback(parseData);
  });
};

module.exports = GithubStylePage;