
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
    githubStylePage(markdownFilePath, targetDir, {saveFileName: 'abc'}, function() {
      deleteTempFile && deleteFile(targetDir + 'abc.html');
      done();
    });
  });

  it('githubStylePage(markdownString, targetDir, {isContent: true}, callback) works', function(done) {
    var markdownString = '## Options';
    var markdownStringResult = '<h2 id="options">Options</h2>\n';

    githubStylePage(markdownString, targetDir, {
      isContent: true,
      saveFileName: 'abc2'
    }, function(result) {
      result.should.equal(markdownStringResult);
      deleteTempFile && deleteFile(targetDir + 'abc2.html');
      done();
    });
  });

  it('template project works', function(done) {
    githubStylePage(markdownFilePath, targetDir, {
      template: 'project',
      saveFileName: 'abc4',
      vars: {
        pkg: {
          name: 'awesomeProject',
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
      saveFileName: 'abc3',
      vars: {
        pkg: {
          name: 'xxxx',
          version: '0.1.1.1'
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