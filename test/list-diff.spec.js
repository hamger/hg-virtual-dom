import listDiff from '../src/list-diff'

describe('listDiff', () => {
  it('listDiff return a childern and moves', () => {
    var oldList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    var newList = [{ id: 2 }, { id: 3 }, { id: 1 }]
    var patches = listDiff(oldList, newList, 'id')
    expect(patches.children).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, null])
    expect(patches.moves).toEqual([
      { type: 0, index: 3 },
      { type: 0, index: 0 },
      { type: 1, index: 2, item: { id: 1 } }
    ])
  })
})
