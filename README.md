React redux JWT starter
==================

> Just another react redux starter pack. With a simple auth example app using JSON web tokens.
> The example app is not hooked against any database. Users and secret are defined in the .env file.

[![Build Status](https://travis-ci.org/magnus-bergman/react-redux-starter.svg?branch=master)](https://travis-ci.org/magnus-bergman/react-redux-starter)
[![codecov](https://codecov.io/gh/magnus-bergman/react-redux-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/magnus-bergman/react-redux-starter)

## Installation
If you've never used Node or npm before, you'll need to install Node.
If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

### Install dependencies
```
npm install
```

This downloads all dependencies listed in `package.json`.

### Running build scripts
```
npm run dev
```

This will compile your assets and start a express server with [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware).

### Preview production environment
```
npm run build
npm start
```

### Testing with AVA
This repo includes a test suite running [AVA](https://github.com/avajs/ava) and [Sinon](http://sinonjs.org/).

To run the tests simply do:
```
npm test
```

### Code style
This repo follows the [standard](https://github.com/feross/standard) javascript coding style guide. It also includes some default editor settings using [editor config](https://github.com/sindresorhus/editorconfig-sublime).

## License
React redux JWT starter is licensed under [The MIT License (MIT)](LICENSE).
