/**
 * @param {Array} oldList   原始列表
 * @param {Array} newList   新列表
 * @param {String} key 键名称
 * @return {Object} {children: [], moves: [] }
 * children 表示从 oldList 到 newList 保留下来的原始列表的数据，
 * 比如 oldList = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
 * newList = [{id: 2}, {id: 3}, {id: 1}];
 最后返回的 children = [{id: 1}, {id: 2}, {id: 3}, null]

 moves 表示从 oldList 到 newList 所需的操作，children为null的话，依次删除掉掉，因此返回的是
 moves = [
  {type: 0, index:3},
  {type: 0, index: 0},
  {type: 1, index: 2, item: {id: 1}}
 ]
 注意：type = 0 是删除操作， type = 1 是新增操作
*/
function listDiff (oldList, newList, key) {
  var oldMap = makeKeyIndexAndFree(oldList, key)
  var newMap = makeKeyIndexAndFree(newList, key)
  var newFree = newMap.free

  var oldKeyIndex = oldMap.keyIndex
  var newKeyIndex = newMap.keyIndex

  var moves = []
  var children = []
  var i = 0
  var freeIndex = 0
  var item
  var itemKey

  while (i < oldList.length) {
    item = oldList[i]
    itemKey = getItemKey(item, key)
    if (itemKey) {
      // 老数组中某项 不存在于 新数组的情况
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        // 老数组中某项 不存在于 新数组的情况
        children.push(null)
      } else {
        // 老数组中某项 存在于 新数组的情况
        var newItemIndex = newKeyIndex[itemKey]
        children.push(newList[newItemIndex])
      }
    } else {
      var freeItem = newFree[freeIndex++]
      children.push(freeItem || null)
    }
    i++
  }
  // 删除不存在的项，不直接操作 children ，因为 children 会作为源列表返回
  var simulateList = children.slice(0)
  i = 0
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i)
      // 调用该方法执行删除
      removeSimulate(i)
    } else {
      i++
    }
  }

  // j 表示源数组中的索引， i 表示新数组中的索引
  var j = (i = 0)
  // 从第 i 项开始遍历 newList，先和 simulateList 的第 j 项比较，如果相等的，不进行数组操作并 j++，跳到下一个内部循环，
  // 否则，先判断该键是否在 oldKeyIndex 里面，如果不存在，说明是新增项，插入，
  // 如果存在, 判断 simulateList[j + 1] 与 newList[i] 的 key 是否相等，
  // 若相等，移除 simulateList[j]; 若不相等，插入
  while (i < newList.length) {
    item = newList[i]
    itemKey = getItemKey(item, key)

    var simulateItem = simulateList[j]
    var simulateItemKey = getItemKey(simulateItem, key)
    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        // 某项在源数组和新数组中位置都相同
        j++
      } else {
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          // 新数组中某项 不存在于 源数组的情况，以当前项在新数组中的位置插入该项
          insert(i, item)
        } else {
          // 新数组中某项 存在于 源数组的情况，移动该项
          var nextItemKey = getItemKey(simulateList[j + 1], key)
          if (nextItemKey === itemKey) {
            // 如果源数组的下一项是新数组中的当前项，只需要删除源数组中的该项即可，因为下一项会自行往前移动一位
            remove(i)
            removeSimulate(j)
            j++
          } else {
            // 如果源数组的下一项不是新数组中的当前项，以当前项在新数组中的位置插入该项
            insert(i, item)
          }
        }
      }
    } else {
      insert(i, item)
    }
    i++
  }

  // 记录删除操作, type = 0 表示删除操作
  function remove (index) {
    var move = { index: index, type: 0 }
    moves.push(move)
  }

  // 记录插入操作，type = 1 表示新增操作
  function insert (index, item) {
    var move = { index: index, item: item, type: 1 }
    moves.push(move)
  }

  // 删除数组的某项
  function removeSimulate (index) {
    simulateList.splice(index, 1)
  }

  // 输出 源列表 和 操作
  return {
    moves: moves,
    children: children
  }
}

/*
 * 列表转化为 {key: Index} 对象
 * @param {Array} list
 * @param {String|Function} key
 * 比如
  var list = [{ key: 'id1' }, { key: 'id2' }, { key: 'id3' }, { key: 'id4' }]
  var map = makeKeyIndexAndFree(list, 'key')
  console.log(map) // {keyIndex: {id1: 0, id2: 1, id3: 2, id4: 3}, free: []}
*/
function makeKeyIndexAndFree (list, key) {
  var keyIndex = {}
  // 没有 key 的项存放在 free 数组
  var free = []
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i]
    var itemKey = getItemKey(item, key)
    if (itemKey) {
      // 键代表 key，值代表数组索引
      keyIndex[itemKey] = i
    } else {
      free.push(item)
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  }
}

function getItemKey (item, key) {
  if (!item || !key) {
    return
  }
  return typeof key === 'string' ? item[key] : key[item]
}

export default listDiff
