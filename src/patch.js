import { toArray, each } from './util'
import setAttr from './setAttr'
import VNode from './vnode'
import create from './create'

function patch (node, patches) {
  var walker = { index: 0 }
  walk(node, walker, patches)
  return node
}

function walk (node, walker, patches) {
  var currentPatches = patches[walker.index]

  // 深度遍历子节点
  // 新的dom树中某个父节点被移除的情况，仍然需要遍历子节点，因为需要得到补丁的索引
  var len = node.childNodes.length
  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i]
    walker.index++
    walk(child, walker, patches)
  }

  // 如果该节点存在补丁，则应用之
  // 被移除的父节点下的子节点，不会被应用补丁
  if (currentPatches) {
    applyPatches(node, currentPatches)
  }
}

/**
 * 应用 diff 算法得到的补丁
 * @param {dom节点} node
 * @param {针对该dom节点的补丁} currentPatches
 */
function applyPatches (node, currentPatches) {
  each(currentPatches, function (currentPatch) {
    switch (currentPatch.type) {
      // 替换元素
      case 0:
        var newNode =
          currentPatch.node instanceof VNode ?
            create(currentPatch.node) :
            document.createTextNode(currentPatch.node)
        node.parentNode.replaceChild(newNode, node)
        break
      // 列表排序
      case 1:
        reorderChildren(node, currentPatch.moves)
        break
      // 变更属性
      case 2:
        setProps(node, currentPatch.props)
        break
      // 变更文本
      case 3:
        node.innerTextf = currentPatch.text
        break
    }
  })
}

function setProps (node, props) {
  for (var key in props) {
    var value = props[key]
    setAttr(node, key, value)
  }
}

function reorderChildren (node, moves) {
  var staticNodeList = toArray(node.childNodes)
  var maps = {}

  // 收集列表项 key ，用于复用元素
  each(staticNodeList, function (node) {
    if (node.nodeType === 1) {
      var key = node.getAttribute('key')
      if (key) maps[key] = node
    }
  })

  // 执行列表项项操作
  each(moves, function (move) {
    var index = move.index
    if (move.type === 0) {
      // remove item
      node.removeChild(node.childNodes[index])
      staticNodeList.splice(index, 1)
    } else if (move.type === 1) {
      // insert item
      var insertNode = maps[move.item.key] ?
        maps[move.item.key].cloneNode(true) : // 复用节点
        move.item instanceof VNode ?
          create(move.item) : // 创建元素节点
          document.createTextNode(move.item) // 创建文本节点

      staticNodeList.splice(index, 0, insertNode)
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}

export default patch
