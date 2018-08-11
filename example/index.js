import { h, diff, patch, create } from '../src'
// import { h, diff, patch, create } from '../dist/hg-virtual-dom.js'

var count = 0
function renderTree () {
  count++
  var items = []
  var color = count % 2 === 0 ? 'blue' : 'red'
  for (var i = 0; i < count; i++) {
    items.push(
      h(
        'li',
        {
          key: i,
          style: 'cursor: pointer;',
          onclick: (i => {
            console.log(i)
          }).bind(this, i)
        },
        [`Item #${i}`]
      )
    )
  }
  return h('div', { id: 'container', value: 123 }, [
    h('h1', { style: `color:${color}` }, ['simple virtal dom']),
    h('p', [`the count is : ${count}`]),
    h('ul', items)
  ])
}
var tree = renderTree()
// console.log(tree)
var root = create(tree)
console.log([root])
document.body.appendChild(root)

// var timerCount = 0
// var timer = setInterval(function () {
//   if (timerCount < 3) {
//     var newTree = renderTree()
//     var patches = diff(tree, newTree)
//     console.log(patches)
//     patch(root, patches)
//     tree = newTree
//     timerCount++
//   } else {
//     clearInterval(timer)
//   }
// }, 1000)

// var tree2 = h('ul', [
//   h('li', { key: 1 }, ['haha-1']),
//   h('li', { key: 2 }, ['haha-2']),
//   h('li', { key: 3 }, ['haha-3']),
//   h('li', { key: 4 }, ['haha-4'])
// ])
// var dom = create(tree2)
// document.body.appendChild(dom)
// var newTree2 = h('ul', [
//   h('li', { key: 6 }, ['haha-6']),
//   h('li', { key: 3 }, ['haha-3']),
//   h('li', { key: 2 }, ['haha-2']),
//   h('li', { key: 1 }, ['haha-1'])
// ])
// var patches2 = diff(tree2, newTree2)
// console.log(patches2)
// patch(dom, patches2)
