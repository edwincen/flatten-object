# flatten-object

<!-- [![Build Status](https://travis-ci.com/edwincen/unwind.svg?branch=master)](https://travis-ci.com/edwincen/unwind) [![Greenkeeper badge](https://badges.greenkeeper.io/edwincen/unwind.svg)](https://greenkeeper.io/) -->
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Simply flatten object extension for Lodash

# Install

```javascript
npm install --save lodash-flatten-object
```
# Usage

```javascript
flattenObject(object, [options={}])
```
### Arguments
- ```object(Object)``` - The object to process.
- ```[options={}](object)``` - The option object.
- ```[options.sort=false](boolean)``` - Return key-sorted object or not, default is false

### Returns
```(Object)``` - Returns new flattened object.

### Sample

#### Flatten normal object

```javascript
const flattenObject = require('lodash-flatten-object')()
const data = {
  z: 1,
  x: 2,
  a: 3,
  b: 4
}
const output = flattenObject(data, { sort: true })
// {
//   a: 3,
//   b: 4,
//   x: 2,
//   z: 1
// }
```
#### Flatten object with multiple levels nested properties

```javascript
const flattenObject = require('lodash-flatten-object')()
const data = {
  a: 1,
  b: {
    b2: 4,
    b1: {
      b12: 3,
      b11: 2
    },
    b3: [
      {
        b32: 6,
        b31: 5
      },
      {
        b34: 8,
        b33: 7,
        b35: {
          b352: 10,
          b351: 9
        }
      }
    ]
  },
  c: [ 11, 12, 13 ]
}
const output = flattenObject(data, { sorted: true })
// {
//   'a': 1
//   'b.b1.b11': 2
//   'b.b1.b12': 3
//   'b.b2': 4
//   'b.b3.0.b31': 5
//   'b.b3.0.b32': 6
//   'b.b3.1.b33': 7
//   'b.b3.1.b34': 8
//   'b.b3.1.b35.b351': 9
//   'b.b3.1.b35.b352': 10
//   'c.0': 11
//   'c.1': 12
//   'c.2': 13
// }
```

## Use flattenObject as module of lodash
```javascript
const _ = require('lodash')
require('lodash-flatten-object')({ injected: true })
const data = {
  z: 1,
  x: 2,
  a: 3,
  b: 4
}
// Use flattenObject as function of lodash
const output = _.flattenObject(data)
```
