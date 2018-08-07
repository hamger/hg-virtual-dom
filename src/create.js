import _ from './util'
import { VNode } from './h'

function create (vnode) {
  let el = document.createElement(vnode.tagName)
  let props = vnode.properties
  for (let attrName in props) {
    _.setAttr(el, attrName, props[attrName])
  }
  vnode.children.map(child => {
    let childEl =
      child instanceof VNode ? create(child) : document.createTextNode(child)
    if (childEl) el.appendChild(childEl)
  })
  return el
}

export default create
