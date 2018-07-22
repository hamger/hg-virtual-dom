class Element {
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

    var _eid = 0

    this.children.forEach((child, index) => {
      if (child instanceof Element) _eid += child._eid
      else this.children[index] = String(child)
      _eid++
    })

    this._eid = _eid
  }

  render () {
    let el = document.createElement(this.tagName)
    let props = this.props
    for (let attrName in props) {
      el.setAttribute(attrName, props[attrName])
    }
    this.children.map(child => {
      let childEl =
        child instanceof Element ?
          child.render() :
          document.createTextNode(child)
      el.appendChild(childEl)
    })
    return el
  }
}
export default (tagName, props, children) =>
  new Element(tagName, props, children)
