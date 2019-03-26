class VNode {
  constructor (tagName, properties, children) {
    // 参数已经在 h 中做了规范，所以不需要规定默认值
    this.tagName = tagName
    this.children = children
    this.key = undefined
    if (properties.hasOwnProperty('key')) {
      this.key = properties.key
    }
    // 为了在 patch 时复用 dom 节点，需要将 key 保留在 Properties 中
    this.properties = properties

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

// 添加 type 属性，作为外部判断是否是 VNode 实例的标识
VNode.prototype.$type = 'VNode'

export default VNode
