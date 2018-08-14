import { isPrimitive } from './util'
/**
 * @param {Array} oldList   原始数组
 * @param {Array} newList   新数组
 * @param {String} key 键名称
 * @return {Object} {children: [], moves: []}
 * children 表示从 oldList 到 newList 保留下来的原始数组的数据，
 * 比如 oldList = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
 * newList = [{id: 2}, {id: 3}, {id: 1}];
 最后返回的 children = [{id: 1}, {id: 2}, {id: 3}, null]

 moves 表示从 oldList 到 newList 所需的操作，children为null的话，依次删除掉掉，因此返回的是
 moves = [
  {type: 0, index:3},
  {type: 0, index: 0},
  {type: 1, index: 2, item: {id: 1}}
 ]
 规定：type = 0 是删除操作， type = 1 是新增操作
*/
export default function listDiff (oldList, newList, key) {
  var oldMap = makeKeyIndexAndFree(oldList, key)
  var newMap = makeKeyIndexAndFree(newList, key)
  // 获取新数组中没有key属性的项
  var newFree = newMap.free

  var moves = []
  var children = []
  var i = 0
  var freeIndex = 0
  var item
  var itemKey

  // if (newFree.length === newList.length) {
  //   return {
  //     children: newList,
  //     moves: 'reset'
  //   }
  // }

  // 获得新旧数组中 key 和 数组索引 的映射关系
  var oldKeyIndex = oldMap.keyIndex
  var newKeyIndex = newMap.keyIndex

  // 遍历旧数组，获取源数组
  while (i < oldList.length) {
    item = oldList[i]
    itemKey = getItemKey(item, key)
    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        // 旧数组中某项 不存在于 新数组的情况
        children.push(null)
      } else {
        // 旧数组中某项 存在于 新数组的情况
        var newItemIndex = newKeyIndex[itemKey]
        children.push(newList[newItemIndex])
      }
    } else {
      // 如果不存在key值，直接将 free 中的项依次植入
      var freeItem = newFree[freeIndex++]
      children.push(freeItem || null)
    }
    i++
  }
  // 用于记录操作后的数组长度和新数组长度的相对值
  var count = 0
  // 删除不存在的项，不直接操作 children ，因为 children 会作为源数组返回
  var simulateList = children.slice(0)
  // 先把新数组中没有的项删除
  i = 0
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      // 记录删除操作
      remove(i)
      // 调用该方法执行删除
      removeSimulate(i)
      count--
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
    // 如果源数组中存在该项，进行对比
    if (simulateItem) {
      if (isPrimitive(item) && item !== simulateItem) {
        // 如果是文本节点，不能用key比较，直接比较值，如果不相等，插入
        insert(i, item)
        count++
      } else if (itemKey === simulateItemKey) {
        // 文本节点相等的情况会进入，因为 undefined === undefined 返回 true
        // 某项在源数组和新数组中位置都相同，则不进行任何操作，跳入下一个循环
        j++
      } else {
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          // 新数组中某项 不存在于 旧数组的情况，则在当前位置插入新项
          insert(i, item)
          count++
        } else {
          // 新数组中某项 存在于 旧数组的情况
          // 获取源数组的下一项
          var nextItemKey = getItemKey(simulateList[j + 1], key)
          if (nextItemKey === itemKey) {
            // 如果源数组的下一项是新数组中的当前项，只需要删除源数组中的该项即可，因为下一项会自行往前移动一位
            remove(i)
            removeSimulate(j)
            count--
            j++
          } else {
            // 如果源数组的下一项不是新数组中的当前项，则在当前位置插入新项
            insert(i, item)
            count++
          }
        }
      }
    } else {
      // 如果源数组中不存在该项，直接插入
      insert(i, item)
      count++
    }
    i++
    // 考虑操作后的数组长度超过期望的新数组长度的情况，需要移除尾部多余的项
    if (i === newList.length && count + oldList.length > i) {
      for (var k = i; k < count + oldList.length; k++) {
        remove(k)
      }
    }
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

  // 输出 源数组 和 操作
  return {
    moves: moves,
    children: children
  }
}

/*
 * 获得 keyIndex 和 free
 * keyIndex 表示 key 和 索引 的映射关系
 * free 储存没有 key 的项
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
  if (!item || !key) return undefined
  else return item[String(key)]
}
