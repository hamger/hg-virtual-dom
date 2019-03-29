# hg-virtual-dom

An easy-to-use solution to reduce manual DOM manipulation.

[中文文档](./README_CN.md)

## Install

```bash
yarn add hg-virtual-dom
```

or with npm:

```bash
npm install --save hg-virtual-dom
```

## Usage

```js
import { h, diff, patch, create } from "hg-virtual-dom";

// use `h` to create a virtual dom tree
var tree = h("div", { id: "container" }, [
  h("h1", { style: "color: blue" }, ["simple virtal dom"]),
  h("p", ["Hello, virtual-dom"]),
  h("ul", [h("li")])
]);

// use `create` generate a real dom from virtual dom.
var root = create(tree);

// generate another different virtual dom tree
var newTree = h("div", { id: "container" }, [
  h("h1", { style: "color: red" }, ["simple virtal dom"]),
  h("p", ["Hello, virtual-dom"]),
  h("ul", [h("li"), h("li")])
]);

// use `diff` diff two virtual dom trees and get patches
var patches = diff(tree, newTree);

// use `patch` apply patches to real dom
patch(root, patches);
```

You can checkout an another example in [example folder](./example).

You should always provide a unique `key` property for each child in array(just like ReactJS's keyed children) for `hg-virtual-dom` to reorder children instead of replacing the whole list when perform diff algorithm.

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
