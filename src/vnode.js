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

// 添加 type 属性，作为外部判断是否是 VNode 实例的标识
VNode.prototype.type = 'VNode'

export default VNode
