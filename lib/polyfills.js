'use strict';

var fs = require('fs');
var polyfills = {};

// write an image to file
polyfills.writeFile = function(path, dataBuffer, callback) {
  fs.writeFile(path, dataBuffer, function(err) {
    if (err) {
      throw err;
    }

    callback();
  });
};

module.exports = polyfills;
