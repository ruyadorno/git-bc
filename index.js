'use strict';

var events = require('events');

var inquirer = require('inquirer');


// ---


module.exports = function gitBranchCheckout(exec, options) {

  options = options || [];

  var result = new events.EventEmitter();

  function validateExec(err, stdout, stderr) {
    if (err) {
      result.emit('error', stderr);
      return true;
    }
  }

  function onGitBranch(err, stdout, stderr) {

    if (validateExec(err, stdout, stderr)) {
      return;
    }

    if (stdout) {
      promptList(
        stdout.split('\n').filter(function (line) {
          return line;
        })
      );
    } else {
      result.emit('warn', 'No git branch was found on the current folder');
    }
  }

  function promptList(branches) {
    result.prompt = inquirer.prompt([{
      type: 'filter',
      name: 'branches',
      message: 'Select a branch to checkout:',
      choices: branches.filter(
        function filterOutDetachedMsg(branchName) {
          return !/\(detached\ from\ .*\)/.test(branchName);
        }
      ).map(
        function formatBranchName(branchName) {
          var branch = branchName.replace('*', '').trim();
          branch = branch.split(' ')[0];
          return {
            name: branchName,
            value: branch
          };
        }
      )
    }], onBranchChosen);
  }

  function onBranchChosen(answers) {
    exec(
      'git checkout ' + answers.branches,
      onCheckout.bind(null, answers.branches)
    );
  }

  function onCheckout(branchName, err, stdout, stderr) {
    if(!validateExec(err, stdout, stderr)){
      result.emit('success', 'Switched to branch \'' + branchName.trim() + '\'');      
    }
  }

  exec(('git branch ' + options.join(' ')).trim(), onGitBranch);

  return result;
};
