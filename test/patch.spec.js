import h from '../src/h'
import diff from '../src/diff'
import patch from '../src/patch.js'
import create from '../src/create'

describe('patch', function () {
  it('patch return a new dom', function () {
    var tree = h('div', { id: 'container' }, [
      h('h1', { style: `color: red` }, ['simple virtal dom']),
      h('p', [`the count is : 1`]),
      h('ul', [h('li', ['item01'])])
    ])
    var dom = create(tree)
    var newTree = h('div', { id: 'container2' }, [
      h('h1', { style: `color: green` }, [h('span', ['dom'])]),
      h('p', ['the count is : 0'])
    ])
    var patches = diff(tree, newTree)
    var newDom = patch(dom, patches)
    expect(newDom.id).toBe('container2')
  })
})
