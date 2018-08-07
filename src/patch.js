import _ from './util'
import { VNode } from './h'
import create from './create'

patch.REPLACE = 0 // 替换元素
patch.REORDER = 1 // 列表排序
patch.PROPS = 2 // 变更属性
patch.TEXT = 3 // 变更文本

function patch (node, patches) {
  var walker = { index: 0 }
  dfsWalk(node, walker, patches)
  return node
}

function dfsWalk (node, walker, patches) {
  var currentPatches = patches[walker.index]

  var len = node.childNodes ? node.childNodes.length : 0
  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
  }

  if (currentPatches) {
    applyPatches(node, currentPatches)
  }
}

function applyPatches (node, currentPatches) {
  _.each(currentPatches, function (currentPatch) {
    switch (currentPatch.type) {
      case 0:
        var newNode =
          currentPatch.node instanceof VNode ?
            create(currentPatch.node) :
            document.createTextNode(currentPatch.node)
        node.parentNode.replaceChild(newNode, node)
        break
      case 1:
        reorderChildren(node, currentPatch.moves)
        break
      case 2:
        setProps(node, currentPatch.props)
        break
      case 3:
        if (node.textContent) node.textContent = currentPatch.content
        else node.nodeValue = currentPatch.content
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
}

function setProps (node, props) {
  for (var key in props) {
    var value = props[key]
    _.setAttr(node, key, value)
  }
}

function reorderChildren (node, moves) {
  var staticNodeList = _.toArray(node.childNodes)
  var maps = {}

  // 收集列表项 key ，用于复用元素
  _.each(staticNodeList, function (node) {
    if (node.nodeType === 1) {
      var key = node.getAttribute('key')
      if (key) {
        maps[key] = node
      }
    }
  })

  _.each(moves, function (move) {
    var index = move.index
    if (move.type === 0) {
      // remove item
      if (staticNodeList[index] === node.childNodes[index]) {
        // maybe have been removed for inserting
        node.removeChild(node.childNodes[index])
      }
      staticNodeList.splice(index, 1)
    } else if (move.type === 1) {
      // insert item
      var insertNode = maps[move.item.key] ?
        maps[move.item.key].cloneNode(true) : // reuse old item
        move.item instanceof VNode ?
          create(move.item) :
          document.createTextNode(move.item)
      staticNodeList.splice(index, 0, insertNode)
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}

export default patch
