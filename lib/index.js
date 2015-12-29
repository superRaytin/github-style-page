'use strict';

var githubStylePage = require('./github-style-page');
var utils = require('./utils');

function githubStylePageFactory(path, targetDir, options, callback) {
  checkArgs.apply(null, arguments);

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var result = new githubStylePage(path, targetDir, options);

  return result.convert(callback);
}

// check arguments
function checkArgs(path, targetDir) {
  if (utils.type(path) !== 'String' ||
      utils.type(targetDir) !== 'String') {
    throw new Error('Invalid arguments.');
  }
}

module.exports = githubStylePageFactory;