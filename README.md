# git-bc

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Git plugin to interactively list branches and checkout

![git-bc example image](https://cloud.githubusercontent.com/assets/220900/7557466/e7cd3866-f75f-11e4-8406-b0651ddf2ac4.gif)

`git branch` + `git checkout` in a single, convenient command.


## Install

Install it using [npm](https://www.npmjs.com/):

```
npm install -g git-bc
```


## Usage

Run the command:

```js
git bc
```

This will list all available branches for your repo in a interactive list, just hit ENTER to checkout whatever branch you select.

### Options

- `git bc -a` List all available branches
- `git bc -r` List remote branches only
- `git bc -h` Shows help message


## License

MIT © [Ruy Adorno](http://ruyadorno.com)

[npm-url]: https://npmjs.org/package/git-bc
[npm-image]: https://badge.fury.io/js/git-bc.svg
[travis-url]: https://travis-ci.org/ruyadorno/git-bc
[travis-image]: https://travis-ci.org/ruyadorno/git-bc.svg?branch=master

