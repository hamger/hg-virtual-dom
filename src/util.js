export const type = arg => {
  return Object.prototype.toString.call(arg).replace(/\[object\s|\]/g, '')
}

export const isObject = arg => {
  return type(arg) === 'Object'
}

export const isArray = arg => {
  return type(arg) === 'Array'
}

export const isString = arg => {
  return type(arg) === 'String'
}

export const isPrimitive = arg => {
  return type(arg) === 'String' || type(arg) === 'Number'
}

export const toArray = listLike => {
  var list = []
  // 该对象需要有lenght属性，才能转化
  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }
  return list
}
