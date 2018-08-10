import h from '../src/h.js'
import VNode from '../src/vnode.js'

describe('h', () => {
  it('h is a function', () => {
    expect(typeof h).toBe('function')
  })

  it('h returns a vnode', () => {
    expect(new h() instanceof VNode).toBe(true)
    var node = new h('div', { id: 'app', key: 'hi' }, ['hello world'])

    expect(node instanceof VNode).toBe(true)
    expect(node.type).toBe('VNode')
    expect(node.tagName).toBe('DIV')
    expect(node.properties).toEqual({ id: 'app' })
    expect(node.children).toEqual(['hello world'])
    expect(node.count).toBe(1)
    expect(node.key).toBe('hi')
  })

  it('h in nested call', () => {
    var node = h('div', [h('span')])
    expect(node.children[0].tagName).toBe('SPAN')
  })

  it('h with two classes', () => {
    var node = h('div ', { className: ' bar   foo' })
    expect(node.properties.className).toBe('bar foo')
  })

  it('h will throw error when unexpected virtual dom node', () => {
    // expect(h('div', [{ a: 123 }]).bind(this)).toThrowError(/unexpected/)
    var foo = function() {
      h('div', [{ a: 123 }])
    };

    // expect(foo).toThrowError("foo bar baz");
    expect(foo).toThrowError(/unexpected virtual dom node/)
    // expect(foo).toThrowError(TypeError);
    // expect(foo).toThrowError(TypeError, "foo bar baz");
  })
})
