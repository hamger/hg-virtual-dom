import listDiff from './list-diff'
import { isString } from './util'

// 补丁类型
var patchType = {
  REPLACE: 0, // 替换元素
  REORDER: 1, // 列表排序
  PROPS: 2, // 变更属性
  TEXT: 3 // 变更文本
}

function diff (oldTree, newTree) {
  var index = 0
  // 将两棵树所有的差异存放在 patches
  var patches = {}
  walk(oldTree, newTree, index, patches)
  return patches
}

function walk (oldNode, newNode, index, patches) {
  var currentPatch = []

  if (newNode === null) {
    // Node is removed.
    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
  } else if (isString(oldNode) && isString(newNode)) {
    // TextNode content replacing
    if (newNode !== oldNode) {
      currentPatch.push({ type: patchType.TEXT, text: newNode })
    }
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // Nodes are the same, diff old node's props and children
    // Diff props
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patchType.PROPS, props: propsPatches })
    }
    // Diff children
    diffChildren(
      oldNode.children,
      newNode.children,
      index,
      patches,
      currentPatch
    )
    // Nodes are not the same, replace the old node with new node
  } else {
    currentPatch.push({ type: patchType.REPLACE, node: newNode })
  }
  // 如果存在差异，则记录在 patchs 对象中
  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

// compare children
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  // oldchildren 和 newchildren 为数组
  var diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length) {
    var reorderPatch = { type: patchType.REORDER, moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }

  var leftNode = null
  var currentNodeIndex = index
  oldChildren.forEach((child, i) => {
    var newChild = newChildren[i]
    // 计算当前节点标记，区分左边的节点是否拥有子节点的情况
    currentNodeIndex =
      leftNode && leftNode.count ?
        currentNodeIndex + leftNode.count + 1 :
        currentNodeIndex + 1
    // 深度遍历子节点
    walk(child, newChild, currentNodeIndex, patches)
    // 更新左边的节点
    leftNode = child
  })
}

// compare attributes
function diffProps (oldNode, newNode) {
  var count = 0
  var oldProps = oldNode.properties
  var newProps = newNode.properties

  var key
  var propsPatches = {}

  // 遍历旧属性，当一个老的属性不在新的属性集合里时，需要删除掉。
  for (key in oldProps) {
    // 如果原来的属性值等于现在属性值，说明不需要变更这个属性，不记录在 propPatches 中
    // 如果原来的属性值不等于现在属性值，说明需要变更这个属性，记录在 propPatches 中
    // 如果是事件都会进入下面的判断，也就是说事件都会重新添加
    if (newProps[key] !== oldProps[key]) {
      // 此处的 newProps 有可能为 undefined ，以此来告知 patch 删除这个属性
      propsPatches[key] = newProps[key]
      count++
    }
  }

  // 遍历新属性
  for (key in newProps) {
    // 如果旧的属性值中有新属性，前面已经遍历过了，不记录在 propPatches 中
    // 如果旧的属性值中没有新属性，说明是新增的属性，记录在 propPatches 中
    if (!oldProps.hasOwnProperty(key)) {
      propsPatches[key] = newProps[key]
      count++
    }
  }

  // 如果两个节点的属性完全相同，返回空
  if (count === 0) return null

  return propsPatches
}

export default diff
