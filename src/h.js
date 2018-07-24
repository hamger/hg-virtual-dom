import _ from './util'
class VNode {
  constructor (tagName, props, children) {
    this.tagName = tagName
    if (Array.isArray(props)) {
      this.props = {}
      this.children = props
      this.key = undefined
    } else {
      this.props = props || {}
      this.children = children
      this.key = props && props.key
    }

    // 记录该节点下有多少个子节点
    let _count = 0
    this.children.forEach(child => {
      // 如果子节点是 VNode 实例，记录它拥有的子节点数目
      if (child instanceof VNode) _count += child._count
      // child 本身是一个子节点，所以还需要 +1
      _count++
    })
    this._count = _count
  }

  render () {
    let el = document.createElement(this.tagName)
    let props = this.props
    for (let attrName in props) {
      _.setAttr(el, attrName, props[attrName])
    }
    this.children.map(child => {
      let childEl =
        child instanceof VNode ? child.render() : document.createTextNode(child)
      el.appendChild(childEl)
    })
    return el
  }
}

export default (tagName, props, children) => new VNode(tagName, props, children)
