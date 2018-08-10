import h from '../src/h'
import diff from '../src/diff'
import patch from '../src/patch.js'
import create from '../src/create'

describe('patch', function () {
  it('patch return a new dom', function () {
    var tree = h('div', { id: 'container' }, [
      h('h1', { style: `color: red` }, ['dom', 'dom2']),
      h('p', [h('span', [`the count is : 1`])]),
      h('ul', [h('li', ['item01'])])
    ])
    var dom = create(tree)
    var newTree = h('div', { id: 'container2' }, [
      h('h1', { style: `color: green` }, [h('span', ['dom']), 'dom3']),
      h('p', ['the count is : 0'])
    ])
    var patches = diff(tree, newTree)
    var newDom = patch(dom, patches)
    expect(newDom.id).toBe('container2')
  })

  it('patch with key', function() {
    var tree = h('ul', [
      h('li', {key: 1}, ['haha-1']),
      h('li', {key: 2}, ['haha-2']),
      h('li', {key: 3}, ['haha-3']),
      h('li', {key: 4}, ['haha-4']),
    ])
    var dom = create(tree)
    var newTree = h('ul', [
      h('li', {key: 6}, ['haha-6']),
      'hello world',
      h('li', {key: 3}, ['haha-3']),
      h('li', {key: 2}, ['haha-2']),
      h('li', {key: 1}, ['haha-1']),
    ])
    var patches = diff(tree, newTree)
    var newDom = patch(dom, patches)
    expect(newDom.childNodes[2].childNodes[0].nodeValue).toBe('haha-3')
    expect(newDom.childNodes.length).toBe(5)
  })

  it('patch to less item', function() {
    var tree = h('ul', [
      h('li', {key: 1}, ['haha-1']),
      h('li', {key: 2}, ['haha-2']),
      h('li', {key: 3}, ['haha-3']),
      h('li', {key: 4}, ['haha-4']),
    ])
    var dom = create(tree)
    var newTree = h('ul', [
      h('li', {key: 6}, ['haha-6']),
      h('li', {key: 3}, ['haha-3']),
      'hello world',
    ])
    var patches = diff(tree, newTree)
    var newDom = patch(dom, patches)
    console.log(newDom)
    expect(newDom.childNodes[1].childNodes[0].nodeValue).toBe('haha-3')
    expect(newDom.childNodes.length).toBe(3)
  })
})
