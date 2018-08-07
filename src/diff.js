import patch from './patch'
import listDiff from './list-diff'
import _ from './util'

function diff (oldTree, newTree) {
  var index = 0
  var patches = {}
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

function dfsWalk (oldNode, newNode, index, patches) {
  var currentPatch = []

  // Node is removed.
  if (newNode === null) {
    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
    // TextNode content replacing
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode })
    }
    // Nodes are the same, diff old node's props and children
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // Diff props
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
    }
    // 支持手动设置 ignore 忽略 diff 子元素
    // Diff children. If the node has a `ignore` property, do not diff children
    if (!isIgnoreChildren(newNode)) {
      diffChildren(
        oldNode.children,
        newNode.children,
        index,
        patches,
        currentPatch
      )
    }
    // Nodes are not the same, replace the old node with new node
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }
  // 如果存在差异，则记录在 patchs 对象中
  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

// compare children
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
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
    dfsWalk(child, newChild, currentNodeIndex, patches)
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

  // 遍历旧属性
  for (key in oldProps) {
    // 如果原来的属性值等于现在属性值，说明不需要变更这个属性，不记录在 propPatches 中
    // 如果原来的属性值不等于现在属性值，说明需要变更这个属性，记录在 propPatches 中
    // 如果是事件跳过比较，因为对于 function 类型，a !== b 会返回 true
    if (isEventProp(key)) continue
    if (newProps[key] !== oldProps[key]) {
      // 此处的 newProps 有可能为 undefined ，以此来告知 patch 删除这个属性
      propsPatches[key] = newProps[key]
      count++
    }
  }

  // 遍历新属性
  for (key in newProps) {
    // 如果原来的属性值中有现在属性值，前面已经遍历过了，不记录在 propPatches 中
    // 如果原来的属性值没有现在属性值，说明是新增的属性，记录在 propPatches 中
    if (!oldProps.hasOwnProperty(key) || isEventProp(key)) {
      propsPatches[key] = newProps[key]
      count++
    }
  }

  // 如果两个节点的属性完全相同，返回空
  if (count === 0) return null

  return propsPatches
}

function isEventProp (name) {
  return /^on/.test(name)
}

function isIgnoreChildren (node) {
  return node.props && node.props.hasOwnProperty('ignore')
}

export default diff
