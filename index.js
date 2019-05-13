/*
 * @Author: edwin
 * @Date:   2019-05-13 11:40:08
 * @Last Modified by: edwin
 * @Last Modified At: 2019-05-13 12:11:38
 */
const _ = require.main.require('lodash')

function getKeys (val, keys, parent) {
  _.flatMapDeep(val, (v, k) => {
    const key = parent ? `${parent}.${k}` : k
    if (typeof v === 'object') {
      getKeys(v, keys, key)
    } else {
      keys.push(key)
    }
  })
  return keys
}

const flattenObject = (obj, opt = { sort: false }) => {
  let keys = getKeys(obj, [])
  if (opt.sort) {
    keys = keys.sort()
  }
  const res = {}
  keys.forEach(k => {
    res[k] = _.get(obj, k)
  })
  return res
}

module.exports = (opt) => {
  if (opt && opt.injected) {
    _.mixin({
      'flattenObject': flattenObject
    })
  }
  return flattenObject
}
