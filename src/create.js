import _ from './util'

function create (vnode) {
  let doc = document
  if (_.isVText(vnode)) return doc.createTextNode(vnode.text)
  else if (!_.isVNode(vnode)) throw Error(vnode + ' is not a valid virtual dom node')

  let node = doc.createElement(vnode.tagName)
  let props = vnode.properties
  for (let key in props) {
    _.setAttr(node, key, props[key])
  }

  let children = vnode.children
  for (let i = 0; i < children.length; i++) {
    let childNode = create(children[i])
    if (childNode) node.appendChild(childNode)
  }

  return node
}

export default create
