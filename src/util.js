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

_.isPrimitive = list => {
  return _.type(list) === 'String' || _.type(list) === 'Number'
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

export default _
