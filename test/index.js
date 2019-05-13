/*
 * @Author: edwin
 * @Date:   2019-05-13 12:04:39
 * @Last Modified by: edwin
 * @Last Modified At: 2019-05-13 15:49:05
 */
const expect = require('chai').expect

const objectWithLv1 = {
  z: 1,
  x: 2,
  a: 3,
  b: 4
}
const objectWithLvs = {
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
const objectWithBuffer = {
  a: 1,
  c: {
    c2: 3,
    c1: 2
  },
  b: Buffer.from('This is a test', 'utf8')
}

const executeTests = func => {
  it('should flatten the object without sort', () => {
    const output = func(objectWithLv1)
    expect(output).to.have.all.keys('a', 'b', 'z', 'x')
    expect(output['a']).to.equal(3)
    expect(output['b']).to.equal(4)
    expect(output['z']).to.equal(1)
    expect(output['x']).to.equal(2)
  })
  it('should flatten the object with sort', () => {
    const output = func(objectWithLv1, { sort: true })
    expect(output).to.have.all.keys('a', 'b', 'z', 'x')
    expect(Object.keys(output)).to.have.ordered.members(['a', 'b', 'x', 'z'])
    expect(output['a']).to.equal(3)
    expect(output['b']).to.equal(4)
    expect(output['z']).to.equal(1)
    expect(output['x']).to.equal(2)
  })
  it('should flatten the multi-level object without sort', () => {
    const output = func(objectWithLvs)
    expect(output).to.have.all.keys('a', 'b.b1.b11', 'b.b1.b12', 'b.b2', 'b.b3.0.b31', 'b.b3.0.b32', 'b.b3.1.b33', 'b.b3.1.b34', 'b.b3.1.b35.b351', 'b.b3.1.b35.b352', 'c.0', 'c.1', 'c.2')
  })
  it('should flatten the multi-level object with sort', () => {
    const output = func(objectWithLvs, { sort: true })
    expect(Object.keys(output)).to.have.ordered.members(['a', 'b.b1.b11', 'b.b1.b12', 'b.b2', 'b.b3.0.b31', 'b.b3.0.b32', 'b.b3.1.b33', 'b.b3.1.b34', 'b.b3.1.b35.b351', 'b.b3.1.b35.b352', 'c.0', 'c.1', 'c.2'])
  })
  it('should flatten the object with stream/buffer value', () => {
    const output = func(objectWithBuffer, { sort: true })
    expect(output.b.toString()).to.be.equal(Buffer.from('This is a test', 'utf8').toString())
  })
}

describe('Use flattenObject as module', () => {
  const flattenObject = require('../index')
  executeTests(flattenObject)
})
