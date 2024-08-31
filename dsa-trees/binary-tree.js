
/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function minDepthHelper(node) {
      if (!node) return Infinity;
      if (!node.left && !node.right) return 1;
      return 1 + Math.min(minDepthHelper(node.left), minDepthHelper(node.right));
    }

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node) {
      if (!node) return 0;
      return 1 + Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right));
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (!node) return 0;
      const leftMax = Math.max(0, maxSumHelper(node.left));
      const rightMax = Math.max(0, maxSumHelper(node.right));
      result = Math.max(result, node.val + leftMax + rightMax);
      return node.val + Math.max(leftMax, rightMax);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let closest = null;

    function nextLargerHelper(node) {
      if (!node) return;
      if (node.val > lowerBound && (closest === null || node.val < closest)) {
        closest = node.val;
      }
      nextLargerHelper(node.left);
      nextLargerHelper(node.right);
    }

    nextLargerHelper(this.root);
    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(node, target, level = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { level, parent };
      return findLevelAndParent(node.left, target, level + 1, node) ||
             findLevelAndParent(node.right, target, level + 1, node);
    }

    const node1Info = findLevelAndParent(this.root, node1);
    const node2Info = findLevelAndParent(this.root, node2);

    return node1Info && node2Info &&
           node1Info.level === node2Info.level &&
           node1Info.parent !== node2Info.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    if (!tree.root) return '';

    const result = [];
    function serializeHelper(node) {
      if (!node) {
        result.push('null');
        return;
      }
      result.push(node.val);
      serializeHelper(node.left);
      serializeHelper(node.right);
    }

    serializeHelper(tree.root);
    return result.join(',');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return new BinaryTree();

    const values = stringTree.split(',');
    function deserializeHelper() {
      if (values.length === 0) return null;
      const val = values.shift();
      if (val === 'null') return null;

      const node = new BinaryTreeNode(Number(val));
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node;
    }

    return new BinaryTree(deserializeHelper());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function lcaHelper(node) {
      if (!node || node === node1 || node === node2) return node;
      const left = lcaHelper(node.left);
      const right = lcaHelper(node.right);
      if (left && right) return node;
      return left || right;
    }

    return lcaHelper(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
