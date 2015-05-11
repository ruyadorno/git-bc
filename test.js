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
        '* master\n' +
        '  develop\n' +
        '  feature-1\n'
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
        '* master\n' +
        '  develop\n' +
        '  feature-1\n'
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


// ---


it('should list remotes on -r option', function (done) {

  var mockResult = {
    'git branch -r': {
      stdout:
        '  origin/HEAD -> origin/master\n' +
        '  origin/develop\n' +
        '  origin/master\n'
    },
    'git checkout origin/develop': {
      stdout: ''
    }
  };
  var result = gitBc(mockExec(mockResult), ['-r']);

  // Validates success message
  result.on('success', function (msg) {
    assert.strictEqual(msg, 'Switched to branch \'origin/develop\'');
    done();
  });

  // Simulates user interaction
  setTimeout(function () {
    result.prompt.rl.emit("keypress", "", { name : "down" });
    result.prompt.rl.emit("line");
  }, 10);

});


// ---


it('should list all branches when using -a option', function (done) {

  var mockResult = {
    'git branch -a': {
      stdout:
        '* master\n' +
        '  develop\n' +
        '  origin/HEAD -> origin/master\n' +
        '  origin/develop\n' +
        '  origin/master\n'
    },
    'git checkout develop': {
      stdout: ''
    }
  };
  var result = gitBc(mockExec(mockResult), ['-a']);

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


it('should allow using multiple options at once', function (done) {

  var mockResult = {
    'git branch -a -r': {
      stdout:
        '* master\n' +
        '  develop\n' +
        '  origin/HEAD -> origin/master\n' +
        '  origin/develop\n' +
        '  origin/master\n'
    },
    'git checkout develop': {
      stdout: ''
    }
  };
  var result = gitBc(mockExec(mockResult), ['-a', '-r']);

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


it('should be able to checkout to HEAD ref', function (done) {

  var mockResult = {
    'git branch -a -r': {
      stdout:
        '* master\n' +
        '  develop\n' +
        '  origin/HEAD -> origin/master\n' +
        '  origin/develop\n' +
        '  origin/master\n'
    },
    'git checkout origin/HEAD': {
      stdout: ''
    }
  };
  var result = gitBc(mockExec(mockResult), ['-a', '-r']);

  // Validates success message
  result.on('success', function (msg) {
    assert.strictEqual(msg, 'Switched to branch \'origin/HEAD\'');
    done();
  });

  // Simulates user interaction
  setTimeout(function () {
    result.prompt.rl.emit("keypress", "", { name : "down" });
    result.prompt.rl.emit("keypress", "", { name : "down" });
    result.prompt.rl.emit("line");
  }, 10);

});


// ---


it('should filter out detached git state message from branch list', function (done) {

  var mockResult = {
    'git branch': {
      stdout:
        '* (detached from origin/master)\n' +
        '  master\n' +
        '  develop\n'
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

