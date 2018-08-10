import h from '../src/h'
import diff from '../src/diff'
import VNode from '../src/vnode.js'

describe('diff', function () {
  it('diff return patches', function () {
    var oldTree = h(
      'div',
      {
        id: 'container',
        onclick: () => {
          console.log(456)
        }
      },
      [
        h('h1', { style: `color: red` }, ['simple virtal dom']),
        h('p', [`the count is : 1`]),
        h('ul', [h('li', ['item01'])])
      ]
    )
    var newTree = h(
      'div',
      {
        id: 'container2',
        class: 'box',
        onclick: () => {
          console.log(123)
        }
      },
      [
        h('h1', { style: `color: green` }, [h('span', ['dom'])]),
        h('p', ['the count is : 0'])
      ]
    )
    var patches = diff(oldTree, newTree)
    // 补丁类型(type)：0 - 替换元素；1 - 列表排序；2 - 变更属性；3 - 变更文本
    expect(patches[0]).toEqual([
      {
        props: { id: 'container2', class: 'box' },
        type: 2
      },
      {
        moves: [{ index: 2, type: 0 }],
        type: 1
      }
    ])

    expect(patches[1]).toEqual([
      {
        type: 2,
        props: { style: 'color: green' }
      }
    ])

    expect(patches[2][0].node).toEqual(jasmine.any(VNode))
    expect(patches[2][0].type).toBe(0)

    expect(patches[4]).toEqual([{ type: 3, text: 'the count is : 0' }])
  })
})
