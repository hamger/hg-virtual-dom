import { h, diff, patch, create } from '../src'

// var count = 0
// function renderTree () {
//   count++
//   var items = []
//   var color = count % 2 === 0 ? 'blue' : 'red'
//   for (var i = 0; i < count; i++) {
//     items.push(
//       h(
//         'li',
//         {
//           key: i,
//           style: 'cursor: pointer;',
//           onclick: (i => {
//             console.log(i)
//           }).bind(this, i)
//         },
//         [`Item #${i}`]
//       )
//     )
//   }
//   return h('div', { id: 'container', value: 123 }, [
//     h('h1', { style: `color:${color}` }, ['simple virtal dom']),
//     h('p', [`the count is : ${count}`]),
//     h('ul', items)
//   ])
// }
// var tree = renderTree()
// // console.log(tree)
// var root = create(tree)
// console.log([root])
// document.body.appendChild(root)

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

var tree = h('div', { id: 'container' }, [
  h('h1', { style: 'color: blue' }, ['simple virtal dom']),
  h('p', ['Hello, virtual-dom']),
  h('ul', [h('li', {key: 1}, ['li1']), h('li', {key: 2}, ['li2']), h('li', {key: 3}, ['li3']), h('li', {key: 4}, ['li4'])])
])

var root = create(tree)
document.body.appendChild(root)

setTimeout(() => {
  var newTree = h('div', { id: 'container' }, [
    h('h1', { style: 'color: red' }, ['simple virtal dom']),
    h('p', ['Hello, virtual-dom2']),
    h('ul', [h('li', {key: 5}, ['li5']), h('li', {key: 2}, ['li2']), h('li', {key: 3}, ['li3']), h('li', {key: 4}, ['li4'])]),
    h('ul', [
      h('li', {key: 2}, ['li2']),
      h('li', {key: 4}, ['li4']),
      h('li', {key: 1}, ['li1']),
      h('li', {key: 3}, ['li3']),
    ])
  ])
  var patches = diff(tree, newTree)
  console.log(patches)
  patch(root, patches)
}, 2000)
