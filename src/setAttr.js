
import { isPrimitive, isObject } from './util'

export default function setAttr (node, key, value) {
  if (value === undefined) {
    removeProperty(node, key, value)
  } else if (key === 'style') {
    if (isObject(value)) {
      for (let name in value) {
        node.style[name] = value[name]
      }
    } else {
      node.style.cssText = value
    }
  } else if (key === 'value') {
    var tagName = node.tagName || ''
    tagName = tagName.toUpperCase()
    if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
      node.value = value
    } else {
      node.setAttribute(key, value)
    }
  } else if (isClassName(key)) {
    let arr = value.trim().split(' ')
    emptyClass(node)
    arr.forEach(className => {
      node.classList.add(className)
    })
  } else if (isEventProp(key)) {
    // 这里需要使用 node.onclick = func，而不使用 node.addEventListener('click', func)
    // 因为使用后者会仍然保留旧元素的事件监听，这不是希望的，所以使用前者覆盖事件监听
    node[key] = value
  } else {
    node.setAttribute(key, value)
  }
}

// 置空类名
function emptyClass (node) {
  var arr = []
  for (var i = 0; i < node.classList.length; i++) {
    arr.push(node.classList.item(i))
  }
  arr.forEach(item => {
    node.classList.remove(item)
  })
}

// 属性是否为类
function isClassName (name) {
  return /^(className|class)$/.test(name)
}
// 属性是否为事件
function isEventProp (name) {
  return /^on[A-Za-z]/.test(name)
}

// 移除属性
function removeProperty (node, propName, propValue) {
  if (isClassName(propName)) {
    node.removeAttribute('class')
  } else if (!isEventProp(propName)) {
    if (propName === 'style') {
      node.removeAttribute('style')
    } else if (isPrimitive(propValue)) {
      node[propName] = ''
    } else {
      node[propName] = null
    }
  } else if (propValue) {
    // 简单地置空事件监听
    node[propName] = null
  }
}
