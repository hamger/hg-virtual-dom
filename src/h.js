import _ from './util'

class VNode {
  constructor (tagName, properties, children) {
    this.tagName = tagName
    this.properties = properties || {}
    this.children = children || []
    this.key = properties && properties.key

    // 记录该节点下有多少个子节点
    let count = 0
    this.children.forEach(child => {
      // 如果子节点是 VNode 实例，记录它拥有的子节点数目
      if (child instanceof VNode) count += child.count
      // child 本身是一个子节点，所以还需要 +1
      count++
    })
    this.count = count
  }
}
export { VNode }

function h (tagName, properties, children) {
  let childNodes = [] // 用于存放所有的子节点
  let tag = tagName
  let props, childs

  // 如果 properties 是数组，则默认是 children
  if (_.isArray(properties)) {
    props = {}
    childs = properties
  } else {
    props = properties || {}
    childs = children || []
  }

  if (childs.length > 0) {
    addChild(childs, childNodes, tag, props)
  }

  return new VNode(tag, props, childNodes)
}

function addChild (c, childNodes, tag, props) {
  if (_.isPrimitive(c)) {
    childNodes.push(String(c))
  } else if (c instanceof VNode) {
    childNodes.push(c)
  } else if (_.isArray(c)) {
    for (var i = 0; i < c.length; i++) {
      addChild(c[i], childNodes, tag, props)
    }
  } else {
    throw Error(`${c} is a unexpected virtual dom node`)
  }
}

export default h
