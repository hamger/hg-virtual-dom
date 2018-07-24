import hgVdom from '../src'
// import hgVdom from '../dist/hg-virtual-dom.js'
var { h, diff, patch, create, VNode, VText } = hgVdom

var count = 0
function renderTree () {
  count++
  var items = []
  var color = count % 2 === 0 ? 'blue' : 'red'
  for (var i = 0; i < count; i++) {
    items.push(h('li', [`Item #${i}`]))
  }
  return h('div', { id: 'container' }, [
    h('h1', { style: `color:${color}` }, ['simple virtal dom']),
    h('p', [`the count is : ${count}`]),
    h('ul', items)
  ])
}
var tree = renderTree()
console.log(tree)
var root = tree.render()
// console.log(root)
document.body.appendChild(root)

var timerCount = 0
var timer = setInterval(function () {
  if (timerCount < 5) {
    var newTree = renderTree()
    console.log(newTree)
    var patches = diff(tree, newTree)
    // console.log(patches)
    patch(root, patches)
    tree = newTree
    timerCount++
  } else {
    clearInterval(timer)
  }
}, 1000)

var vtext = new VText('Hello, World!')
// Pass our VText as a child of our VNode
var vnode = new VNode('div', { id: 'my-node' }, [vtext])
var el = create(vnode)
document.body.appendChild(el)
