const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.treeRoot === null) {
      this.treeRoot = newNode;
    } else {
      this._addNode(this.treeRoot, newNode);
    }
  }
  _addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._addNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this._hasNode(this.treeRoot, data);
  }
  _hasNode(node, data) {
    if (node === null) {
      return false;
    }
    if (data < node.data) {
      return this._hasNode(node.left, data);
    } else if (data > node.data) {
      return this._hasNode(node.right, data);
    } else {
      return true;
    }
  }

  find(data) {
    return this._findNode(this.treeRoot, data);
  }
  _findNode(node, data) {
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      return this._findNode(node.left, data);
    } else if (data > node.data) {
      return this._findNode(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.treeRoot = this._removeNode(this.treeRoot, data);
  }

  _removeNode(node, data) {
    if (node == null) {
      return null;
    }
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const minRight = this._findMinNode(node.right);
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    const node = this._findMinNode(this.treeRoot);
    return node ? node.data : null;
  }

  _findMinNode(node) {
    if (node.left === null) {
      return node;
    }
    return this._findMinNode(node.left);
  }

  max() {
    const node = this._findMaxNode(this.treeRoot);
    return node ? node.data : null;
  }
  _findMaxNode(node) {
    if (node.right === null) {
      return node;
    }
    return this._findMaxNode(node.right);
  }
}

module.exports = {
  BinarySearchTree
};
