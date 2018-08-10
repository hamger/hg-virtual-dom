import setAttr from '../src/setAttr'

describe('setAttr', function () {
  var foo
  beforeEach(function () {
    this.node = document.createElement('div')
    foo = {
      hi: function () {
        console.log('hi')
      }
    }

    spyOn(foo, 'hi') // 使用spyOn()来声明spy
  })

  it('setAttr set calss', function () {
    setAttr(this.node, 'class', 'foo bar')
    expect(this.node.className).toBe('foo bar')
    setAttr(this.node, 'className', 'foo')
    expect(this.node.className).toBe('foo')
    setAttr(this.node, 'class', undefined)
    expect(this.node.className).toBe('')
  })

  it('setAttr set style', function () {
    setAttr(this.node, 'style', 'color: red;')
    setAttr(this.node, 'style', {
      height: '100px'
    })
    expect(this.node.style.color).toBe('red')
    expect(this.node.style.height).toBe('100px')
    setAttr(this.node, 'style', undefined)
    expect(this.node.style.length).toBe(0)
  })

  it('setAttr set event', function () {
    setAttr(this.node, 'onclick', foo.hi)
    this.node.click()
    // 测试spy是否调用
    expect(foo.hi).toHaveBeenCalled()
    setAttr(this.node, 'onclick', undefined)
    this.node.click()
    expect(foo.hi).toHaveBeenCalledTimes(1)
  })

  it('setAttr set value', function () {
    setAttr(this.node, 'value', '1123')
    expect(this.node.attributes.value.nodeValue).toBe('1123')

    var textarea = document.createElement('TEXTAREA')
    setAttr(textarea, 'value', '123')
    expect(textarea.value).toBe('123')

    var input = document.createElement('input')
    setAttr(input, 'value', '234')
    expect(input.value).toBe('234')
  })
})
