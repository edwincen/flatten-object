/*
 * @Author: edwin
 * @Date:   2019-05-13 11:40:08
 * @Last Modified by: edwin
 * @Last Modified At: 2019-05-13 15:48:13
 */

function getKeys (obj, separator, keys, parent) {
  if (obj) {
    Object.keys(obj).forEach(k => {
      const key = parent ? `${parent}${separator}${k}` : k
      if (typeof obj[k] === 'object' && !Buffer.isBuffer(obj[k])) {
        getKeys(obj[k], separator, keys, key)
      } else {
        keys.push(key)
      }
    })
    return keys
  }
}

function get (obj, key, separator = '.') {
  key = key.split(separator)
  key.forEach(k => {
    obj = obj[k]
  })
  return obj
}

const flattenObject = (obj, opt = { sort: false, separator: '.' }) => {
  opt = Object.assign({
    sort: false,
    separator: '.'
  }, opt)
  let keys = getKeys(obj, opt.separator, [])
  if (opt.sort) {
    keys = keys.sort()
  }
  const res = {}
  keys.forEach(k => {
    res[k] = get(obj, k, opt.separator)
  })
  return res
}

module.exports = flattenObject
