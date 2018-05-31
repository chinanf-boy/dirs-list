# dirs-list [![Build Status](https://travis-ci.org/chinanf-boy/dirs-list.svg?branch=master)](https://travis-ci.org/chinanf-boy/dirs-list) [![codecov](https://codecov.io/gh/chinanf-boy/dirs-list/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/dirs-list?branch=master)

> get dir path list

[中文](./readme.md) | ~~[english](./readme.en.md)~~

## Install



```
npm install dirs-list
```

```
yarn add dirs-list
```




## Usage

```js
const dirsList = require('dirs-list');

let res = await dirsList(__dirname, {match:["*node_modules"],ignore:["*.git"]})
//=> __dirname all node_modules, ignore *.git
```


## API

### dirsList(dir, options)

#### dir

name: | dir
---------|----------
Type: | `string`
Desc: | dir path

#### options

##### match

 name: | match
---------|----------
Type: | `string`\|`Array`
Desc: | match every, add the path

- [use matcher](https://github.com/sindresorhus/matcher)

##### ignore

 name: | ignore
---------|----------
Type: | `string`\|`Array`
Desc: | ignore some, pass the path

- [use matcher](https://github.com/sindresorhus/matcher)

## use by

- [node-modules-size](https://github.com/chinanf-boy/node-modules-size) get all node_modules size

## License

MIT © [chinanf-boy](http://llever.com)
