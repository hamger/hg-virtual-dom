import setAttr from './setAttr'
import VNode from './vnode'

function create (vnode) {
  let el = document.createElement(vnode.tagName)
  let props = vnode.properties
  for (let attrName in props) {
    setAttr(el, attrName, props[attrName])
  }
  vnode.children.map(child => {
    if (!child) return
    let childEl =
      child instanceof VNode ? create(child) : document.createTextNode(child)
    el.appendChild(childEl)
  })
  return el
}

export default create
