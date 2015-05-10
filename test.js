'use strict';

var assert = require('assert');

var gitBc = require('./');


// ---


function mockExec(mockResults) {

  return function exec(ref, cb) {

    var result = mockResults[ref];

    setTimeout(function () {
      cb(result.error, result.stdout, result.stderr);
    }, 1);
  };

}


// ---


it('should checkout selected branch', function (done) {

  var mockResult = {
    'git branch': {
      stdout:
        ' * master\n' +
        ' develop\n' +
        ' feature-1\n'
    },
    'git checkout develop': {
      stdout: ''
    }
  };
  var result = gitBc(mockExec(mockResult));

  // Validates success message
  result.on('success', function (msg) {
    assert.strictEqual(msg, 'Switched to branch \'develop\'');
    done();
  });

  // Simulates user interaction
  setTimeout(function () {
    result.prompt.rl.emit("keypress", "", { name : "down" });
    result.prompt.rl.emit("line");
  }, 10);

});


// ---


it('should notificate errors', function (done) {

  var errorMsg =
    'fatal: Not a git repository (or any of the parent directories): .git';
  var mockResult = {
    'git branch': {
      error: true,
      stderr: errorMsg
    },
    'git checkout develop': {
      stdout: ''
    }
  };
  var result = gitBc(mockExec(mockResult));

  // Validates error message
  result.on('error', function (msg) {
    assert.strictEqual(msg, errorMsg);
    done();
  });

});


// ---


it('should be able to checkout to current branch', function (done) {

  var mockResult = {
    'git branch': {
      stdout:
        ' * master\n' +
        ' develop\n' +
        ' feature-1\n'
    },
    'git checkout master': {
      stdout: ''
    }
  };
  var result = gitBc(mockExec(mockResult));

  // Validates success message
  result.on('success', function (msg) {
    assert.strictEqual(msg, 'Switched to branch \'master\'');
    done();
  });

  // Simulates user interaction
  setTimeout(function () {
    result.prompt.rl.emit("line");
  }, 10);

});

