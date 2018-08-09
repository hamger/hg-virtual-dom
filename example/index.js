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
          onclick: (i => {
            console.log(i)
          }).bind(this, i)
        },
        [`Item #${i}`]
      )
    )
  }
  return h('div', { id: 'container' }, [
    h('h1', { style: `color:${color}` }, ['simple virtal dom']),
    h('p', [`the count is : ${count}`]),
    h('ul', items)
  ])
}
var tree = renderTree()
console.log(tree)
var root = create(tree)
console.log([root])
document.body.appendChild(root)

// var timerCount = 0
// var timer = setInterval(function () {
//   if (timerCount < 5) {
//     var newTree = renderTree()
//     var patches = diff(tree, newTree)
//     patch(root, patches)
//     tree = newTree
//     timerCount++
//   } else {
//     clearInterval(timer)
//   }
// }, 1000)

var newTree = h('div', { id: 'container2' }, [
  h('h1', { style: `color: green` }, [h('span', ['dom'])]),
  h('p', ['the count is : 0'])
])

var patches = diff(tree, newTree)
console.log(patches)
patch(root, patches)
root.onclick = function () {
  console.log('adsf')
}
root.click()
root.onclick = null
root.click()