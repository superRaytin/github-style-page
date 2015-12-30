
var fs = require('fs');
var Path = require('path');
var should = require('should');
var githubStylePage = require('../lib/index');

var markdownFilePath = './README.md';
var targetDir = './test/';
var deleteTempFile = true;

describe('github-style-page', function() {

  it('githubStylePage(path, targetDir, callback) works', function(done) {
    githubStylePage(markdownFilePath, targetDir, function() {
      deleteTempFile && deleteFile(targetDir + 'README.html');
      done();
    });
  });

  it('githubStylePage(path, targetDir, options, callback) works', function(done) {
    githubStylePage(markdownFilePath, targetDir, {
      fileName: 'abc'
    }, function() {
      deleteTempFile && deleteFile(targetDir + 'abc.html');
      done();
    });
  });

  it('githubStylePage(markdownString, targetDir, {isContent: true}, callback) works', function(done) {
    var markdownString = '## Options';

    githubStylePage(markdownString, targetDir, {
      isContent: true,
      fileName: 'abc2'
    }, function() {
      deleteTempFile && deleteFile(targetDir + 'abc2.html');
      done();
    });
  });

  it('template project works', function(done) {
    githubStylePage(markdownFilePath, targetDir, {
      template: 'project',
      fileName: 'abc4',
      vars: {
        pkg: {
          name: 'github-style-page',
          version: '0.1.1'
        },
        examples: ['simple', 'complex'],
      }
    }, function() {
      deleteTempFile && deleteFile(targetDir + 'abc4.html');
      done();
    });
  });

  it('customizeTemplatePath works', function(done) {
    githubStylePage(markdownFilePath, targetDir, {
      customizeTemplatePath: targetDir + 'customTemplate.html',
      fileName: 'abc3',
      vars: {
        pkg: {
          name: 'xxxx',
          version: '1.0.0'
        },
        examples: ['simple'],
      }
    }, function() {
      deleteTempFile && deleteFile(targetDir + 'abc3.html');
      done();
    });
  });

});

function deleteFile(path) {
  fs.unlink(path, function(err) {
    if (err) throw err;
  });
}