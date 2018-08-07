import {isArray, isPrimitive} from './util'
import VNode from './vnode'

function h (tagName, properties, children) {
  let childNodes = [] // 用于存放所有的子节点
  let tag = tagName
  let props, childs

  // 如果 properties 是数组，则默认是 children
  if (isArray(properties)) {
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
  if (isPrimitive(c)) {
    childNodes.push(String(c))
  } else if (c instanceof VNode) {
    childNodes.push(c)
  } else if (isArray(c)) {
    for (var i = 0; i < c.length; i++) {
      addChild(c[i], childNodes, tag, props)
    }
  } else {
    throw Error(`${c} is a unexpected virtual dom node`)
  }
}

export default h
