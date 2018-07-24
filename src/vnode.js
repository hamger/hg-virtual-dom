import {isVNode} from './util'

function VirtualNode (tagName, properties, children, key) {
  this.tagName = tagName
  this.properties = properties || {}
  this.children = children || []
  this.key = key != null ? String(key) : undefined

  var count = (children && children.length) || 0
  var descendants = 0

  for (var i = 0; i < count; i++) {
    var child = children[i]
    if (isVNode(child)) {
      descendants += child.count || 0
    }
  }

  this.count = count + descendants
}

VirtualNode.prototype.type = 'VirtualNode'

export default VirtualNode
