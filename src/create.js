import { isVNode, isVText } from './util'
let applyProperties = require('./apply-properties')

function create (vnode) {
  let doc = document
  if (isVText(vnode)) {
    return doc.createTextNode(vnode.text)
  } else if (!isVNode(vnode)) {
    throw Error('Item is not a valid virtual dom node', vnode)
  }

  let node = doc.createElement(vnode.tagName)

  let props = vnode.properties
  applyProperties(node, props)

  let children = vnode.children

  for (let i = 0; i < children.length; i++) {
    let childNode = create(children[i])
    if (childNode) node.appendChild(childNode)
  }

  return node
}

export default create
