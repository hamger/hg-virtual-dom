const { isString, isArray, isPrimitive, toArray } = require('../src/util')

describe('util', () => {
  it('isString() should work fine.', () => {
    expect(isString('123')).toBe(true)
    expect(isString(123)).toBe(false)
  })

  it('isArray() should work fine.', () => {
    expect(isArray([])).toBe(true)
    expect(isArray(' ')).toBe(false)
  })

  it('isPrimitive() should work fine.', () => {
    expect(isPrimitive(12)).toBe(true)
    expect(isPrimitive('12')).toBe(true)
  })

  it('toArray() should work fine.', () => {
    var arr = toArray({
      0: 'd',
      1: 'o',
      2: 'm',
      length: 3
    })
    expect(arr).toEqual(['d', 'o', 'm'])
  })

  it('each() should work fine.', () => {
    var arr2 = []
    var arr = ['d', 'o', 'm']
    var func = function (item, index) {
      arr2.push(item + '-' + index)
    }
    each(arr, func)
    expect(arr2).toEqual(['d-0', 'o-1', 'm-2'])
  })
})
