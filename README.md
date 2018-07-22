# hg-virtual-dom
 A simple virtual-dom

## Usage
```js
import hgVdom from 'hg-virtual-dom'

var h = hgVdom.h
var diff = hgVdom.diff
var patch = hgVdom.patch

// 1. use `el(tagName, [propeties], children)` to create a virtual dom tree
var tree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: blue'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li')])
])

// 2. generate a real dom from virtual dom. `root` is a `div` element
var root = tree.render()

// 3. generate another different virtual dom tree
var newTree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: red'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li'), el('li')])
])

// 4. diff two virtual dom trees and get patches
var patches = diff(tree, newTree)

// 5. apply patches to real dom
patch(root, patches)

// now the `root` dom is updated
```
You can checkout the full example in example folder.

You should always provide a unique key property for each child in array(just like ReactJS's keyed children) for Virtual-DOM to reorder children instead of replacing the whole list when perform diff algorithm.
```js
var root = el('ul', [
  el('li', {key: 'uid1'}, ['Jerry']),
  el('li', {key: 'uid2'}, ['Tomy']),
  el('li', {key: 'uid3'}, ['Lucy']),
])

var newRoot = el('ul', [
  el('li', {key: 'uid1'}, ['Jerry']),
  el('li', {key: 'uid2'}, ['Tomy']),
  el('li', {key: 'uid4'}, ['Lily']),
  el('li', {key: 'uid3'}, ['Lucy']),
])

// ensure `patches` is minimum
var patches = diff(root, newRoot)
```

## Changelog
### 2018.7.22
> v0.1.1 实现 list-diff

### 2018.7.21
> v0.1.0 项目初始化，实现基础功能