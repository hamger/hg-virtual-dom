import VNode from '../src/vnode.js'

describe('vnode', () => {
  it('VNode is a constructor', () => {
    var vNode = new VNode('div', {id: 'app'}, ['hello world'])
    expect(new VNode() instanceof VNode).toBe(true)
    expect(vNode.type).toBe('VNode')
    expect(vNode.tagName).toBe('div')
    expect(vNode.properties).toEqual({id: 'app'})
    expect(vNode.children).toEqual(['hello world'])
    expect(vNode.count).toBe(1)
    expect(vNode.key).toBe(undefined)
  })
})
