import listDiff from '../src/list-diff'

describe('listDiff', () => {
  it('listDiff return a childern and moves', () => {
    var oldList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    var newList = [{ id: 6 }, { id: 3 }, { id: 2 }, { id: 1 }]
    var patches = listDiff(oldList, newList, 'id')
    expect(patches.children).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, null])
    // type 1 表示插入， 0 表示删除
    expect(patches.moves).toEqual([
      { type: 0, index: 3 },
      { type: 1, index: 0, item: { id: 6 } },
      { type: 1, index: 1, item: { id: 3 } },
      { type: 0, index: 2 },
      { type: 1, index: 3, item: { id: 1 } },
      { type: 0, index: 4 }
    ])

    var oldList2 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    var newList2 = [{ id: 6 }, { id: 3 }, { id: 2 }, { id: 1 }, { id: 5 },  { id: 7 }]
    var patches2 = listDiff(oldList2, newList2, 'id')
    expect(patches2.children).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, null])
    expect(patches2.moves[5]).toEqual({ type: 1, index: 4, item: { id: 5 } })
  })
})
