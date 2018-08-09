import h from '../src/h'
import create from '../src/create'

describe('create', () => {
  it('create return a dom', () => {
    var node = h('div ', { className: 'bar foo' }, [h('span', ['hello']), 'world', ''])
    var dom = create(node)
    expect(dom.tagName).toBe('DIV')
    expect(dom.className).toBe('bar foo')
    expect(dom.childNodes[0].tagName).toBe('SPAN')
    expect(dom.childNodes[0].childNodes[0].nodeValue).toBe('hello')
    expect(dom.childNodes[1].nodeValue).toBe('world')
    expect(dom.childNodes[2]).toBeUndefined()
  })
})
