let _ = {}

_.type = obj => {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

_.isArray = list => {
  return _.type(list) === 'Array'
}

_.slice = (arrayLike, index) => {
  return Array.prototype.slice.call(arrayLike, index)
}

_.isString = list => {
  return _.type(list) === 'String'
}

_.each = (array, fn) => {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

_.toArray = listLike => {
  if (!listLike) return []
  var list = []
  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }
  return list
}

_.setAttr = (node, key, value) => {
  if (key === 'style') {
    node.style.cssText = value
  } else if (key === 'value') {
    var tagName = node.tagName || ''
    tagName = tagName.toLowerCase()
    if (tagName === 'input' || tagName === 'textarea') {
      node.value = value
    } else {
      node.setAttribute(key, value)
    }
  } else if (isEventProp(key)) {
    node.addEventListener(extractEventName(key), value)
  } else {
    node.setAttribute(key, value)
  }
}

function isEventProp (name) {
  return /^on/.test(name)
}

function extractEventName (name) {
  return name.slice(2).toLowerCase()
}

_.isVNode = x => {
  return x && x.type === 'VirtualNode'
}

_.isVText = x => {
  return x && x.type === 'VirtualText'
}

export default _
