export default function setAttr (node, key, value) {
  if (value === undefined) {
    if (isClassName(key)) {
      node.removeAttribute('class')
    } else {
      node.removeAttribute(key)
    }
  } else if (key === 'style') {
    node.style.cssText = value
  } else if (key === 'value') {
    var tagName = node.tagName || ''
    tagName = tagName.toLowerCase()
    if (tagName === 'input' || tagName === 'textarea') {
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
  return /^className$/.test(name)
}

function isEventProp (name) {
  return /^on[A-Za-z]/.test(name)
}
