import h from '../src/h.js'

describe('h', () => {
  it('h is a function', () => {
    expect(typeof h).toBe('function')
  })
  it('h returns a vnode', () => {
    expect(h('div ').tagName).toBe('DIV')
  })
  it('h has props and key', () => {
    var node = h('div', {
      foo: 'bar',
      key: 0
    })

    expect(node.properties).toEqual(
      jasmine.objectContaining({
        foo: 'bar'
      })
    )

    expect(node.key).toBe('0')
  })

  it('h with child', () => {
    var node = h('div', [h('span')])
    expect(node.children[0].tagName).toBe('SPAN')
  })

  it('h with two classes', () => {
    var node = h('div ', { className: ' bar   foo' })
    expect(node.properties.className).toBe('bar foo')
  })
})
