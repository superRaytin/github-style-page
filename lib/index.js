'use strict';

var githubStylePage = require('./github-style-page');

function githubStylePageFactory(path, targetDir, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var result = new githubStylePage(path, targetDir, options);

  return result.convert(callback);
}

module.exports = githubStylePageFactory;