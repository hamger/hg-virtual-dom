import hgVdom from '../src'
// import hgVdom from '../dist/hg-virtual-dom.js'
var { h, diff, patch, create } = hgVdom

function eve (i) {
  console.log(i)
}

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
          onclick: eve.bind(this, i)
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
document.body.appendChild(root)

// var timerCount = 0
// var timer = setInterval(function () {
//   if (timerCount < 5) {
//     var newTree = renderTree()
//     var patches = diff(tree, newTree)
//     // console.log(patches)
//     patch(root, patches)
//     tree = newTree
//     timerCount++
//   } else {
//     clearInterval(timer)
//   }
// }, 1000)

var newTree = h('div', { id: 'container' }, [
  h('h1', { style: `color: blue` }, ['simple virtal dom']),
  h('p', [`the count is : 8`]),
  h('ul', [
    h(
      'li',
      {
        onclick: eve.bind(this, 8)
      },
      [`Item #${8}`]
    ),
    h(
      'li',
      {
        onclick: eve.bind(this, 9)
      },
      [`Item #${9}`]
    )
  ])
])

var patches = diff(tree, newTree)
// console.log(patches)
patch(root, patches)
