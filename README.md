# hg-virtual-dom

A simple virtual-dom

## Usage

```js
import hgVdom from "hg-virtual-dom";
var { h, diff, patch } = hgVdom;

// 1. use `h(tagName, [propeties], children)` to create a virtual dom tree
var tree = h("div", { id: "container" }, [
  h("h1", { style: "color: blue" }, ["simple virtal dom"]),
  h("p", ["Hello, virtual-dom"]),
  h("ul", [h("li")])
]);

// 2. generate a real dom from virtual dom. `root` is a `div` element
var root = tree.render();

// 3. generate another different virtual dom tree
var newTree = h("div", { id: "container" }, [
  h("h1", { style: "color: red" }, ["simple virtal dom"]),
  h("p", ["Hello, virtual-dom"]),
  h("ul", [h("li"), h("li")])
]);

// 4. diff two virtual dom trees and get patches
var patches = diff(tree, newTree);

// 5. apply patches to real dom
patch(root, patches);

// now the `root` dom is updated
```

You can checkout the full example in example folder.

You should always provide a unique key property for each child in array(just like ReactJS's keyed children) for Virtual-DOM to reorder children instead of replacing the whole list when perform diff algorithm.

```js
var root = h("ul", [
  h("li", { key: "uid1" }, ["Jerry"]),
  h("li", { key: "uid2" }, ["Tomy"]),
  h("li", { key: "uid3" }, ["Lucy"])
]);

var newRoot = h("ul", [
  h("li", { key: "uid1" }, ["Jerry"]),
  h("li", { key: "uid2" }, ["Tomy"]),
  h("li", { key: "uid4" }, ["Lily"]),
  h("li", { key: "uid3" }, ["Lucy"])
]);

// ensure `patches` is minimum
var patches = diff(root, newRoot);
```

## Example - creating a Element using the objects directly

```js
import hgVdom from "hg-virtual-dom";
var { VNode, VText, ceate } = hgVdom;

function render(data) {
  var vTree = new VNode(
    "div",
    {
      className: "greeting"
    },
    [new VText("Hello " + String(data.name))]
  );

  return create(VNode);
}
```

## Example - creating a Element using virtual-hyperscript

```js
import hgVdom from "hg-virtual-dom";
var { h } = hgVdom;

function render(data) {
  var vTree = h(".greeting", ["Hello " + data.name]);
  return vNode.render();
}
```

## Changelog

### 2018.7.24

> v0.1.3 添加 VNode、VText 和 create 方法

### 2018.7.23

> v0.1.2 实现事件监听

### 2018.7.22

> v0.1.1 实现 list-diff

### 2018.7.21

> v0.1.0 项目初始化，实现 h、diff 和 patch 方法
