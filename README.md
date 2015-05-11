# git-bc

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Git plugin to interactively list branches and checkout


`git branch` + `git checkout` in a single, convenient command.


## Install

```
$ npm install -g git-bc
```


## Usage

The most simple usage is simply invoking the command:

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

