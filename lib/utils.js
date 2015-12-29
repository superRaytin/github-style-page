'use strict';

var utils = {};

// detect object type
utils.type = function(obj) {
  return Object.prototype.toString.call(obj).split(' ')[1].replace(']', '');
};

utils.each = function(stack, handler) {
  var len = stack.length;

  // Array
  if (len) {
    for (var i = 0; i < len; i++) {
      if (handler.call(stack[i], stack[i], i) === false) {
        break;
      }
    }
  }
  // Object
  else if (typeof len === 'undefined') {
    for (var name in stack) {
      if (handler.call(stack[name], stack[name], name) === false) {
        break;
      }
    }
  }
};

// shallow copy
// utils.extend(target, obj1, obj2, ...)
utils.extend = function(target) {
  utils.each(arguments, function(source, index) {
    if (index > 0) {
      utils.each(source, function(value, key) {
        if (typeof value !== 'undefined') {
          target[key] = value;
        }
      });
    }
  });
};

// get file format
utils.getFileFormat = function(str) {
  var format = str.substr(str.lastIndexOf('.') + 1, str.length);
  return format;
};

module.exports = utils;
