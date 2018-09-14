# hg-virtual-dom

一个易用的解决方案，用来减少手动的 DOM 操作。

[English document](./README.md)

## Usage

```js
import { h, diff, patch, create } from "hg-virtual-dom";

// 使用 `h` 创建一个虚拟 dom 树
var tree = h("div", { id: "container" }, [
  h("h1", { style: "color: blue" }, ["simple virtal dom"]),
  h("p", ["Hello, virtual-dom"]),
  h("ul", [h("li")])
]);

// 使用 `create` 将一个虚拟 dom 树生成一个真实的 Dom 元素
var root = create(tree);

// 创建一个新的虚拟 dom 树
var newTree = h("div", { id: "container" }, [
  h("h1", { style: "color: red" }, ["simple virtal dom"]),
  h("p", ["Hello, virtual-dom"]),
  h("ul", [h("li"), h("li")])
]);

// 使用 `diff` 比较两个树的差异，并获得补丁
var patches = diff(tree, newTree);

// 使用 `patch` 将补丁应用到真实的 Dom 元素
patch(root, patches);
```


You can checkout the full example in example folder.

You should always provide a unique key property for each child in array(just like ReactJS's keyed children) for Virtual-DOM to reorder children instead of replacing the whole list when perform diff algorithm.

```js
var root = h("ul", [
  h("li", { key: "1" }, ["Jerry"]),
  h("li", { key: "2" }, ["Tomy"]),
  h("li", { key: "3" }, ["Lucy"])
]);

var newRoot = h("ul", [
  h("li", { key: "1" }, ["Jerry"]),
  h("li", { key: "2" }, ["Tomy"]),
  h("li", { key: "4" }, ["Lily"]),
  h("li", { key: "3" }, ["Lucy"])
]);

// ensure `patches` is minimum
var patches = diff(root, newRoot);
```

## Changelog
### 2018.8.14
> v1.0.3 修复没有 key 时列表渲染错误

### 2018.8.11
> v1.0.2 修复 VNode 实例不包含事件属性

> v1.0.1 将判断是否为 VNode 实例的属性从 type 改为 $type 

### 2018.8.10
> v1.0.0 完成单元测试，覆盖率达到百分之百

> v0.2.3 修复 list-diff 忽略文本节点的问题

> v0.2.2 修复 list-diff 不清除多余项的问题

### 2018.8.9
> v0.2.1 支持 style 属性值为字符串或者对象的形式

### 2018.8.7

> v0.2.0 修复设置类名前没有清零导致的类名更新错误；修复 addEventListener 导致事件监听累积添加的问题；删除 VNode、VText 方法；删除 VNode 实例中的 render 方法，改用 create 方法代替 

### 2018.7.24

> v0.1.4 添加 VNode、VText 和 create 方法

### 2018.7.23

> v0.1.2 实现事件监听

### 2018.7.22

> v0.1.1 实现 list-diff

### 2018.7.21

> v0.1.0 项目初始化，实现 h、diff 和 patch 方法