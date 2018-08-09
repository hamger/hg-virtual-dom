
import { isPrimitive } from './util'

export default function setAttr (node, key, value) {
  if (value === undefined) {
    removeProperty(node, key, value)
  } else if (key === 'style') {
    node.style.cssText = value
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

function emptyClass (node) {
  var arr = []
  for (var i = 0; i < node.classList.length; i++) {
    arr.push(node.classList.item(i))
  }
  arr.forEach(item => {
    node.classList.remove(item)
  })
}

function isClassName (name) {
  return /^(className|class)$/.test(name)
}

function isEventProp (name) {
  return /^on[A-Za-z]/.test(name)
}

function removeProperty (node, propName, propValue) {
  if (isClassName(propName)) {
    node.removeAttribute('class')
  } else if (!isEventProp(propName)) {
    if (propName === 'attributes') {
      for (var attrName in propValue) {
        node.removeAttribute(attrName)
      }
    } else if (propName === 'style') {
      for (var i in propValue) {
        node.style[i] = ''
      }
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
