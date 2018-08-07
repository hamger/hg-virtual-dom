export const type = obj => {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

export const isArray = list => {
  return type(list) === 'Array'
}

export const isString = list => {
  return type(list) === 'String'
}

export const isPrimitive = list => {
  return type(list) === 'String' || type(list) === 'Number'
}

export const each = (array, fn) => {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

export const toArray = listLike => {
  if (!listLike) return []
  var list = []
  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }
  return list
}
