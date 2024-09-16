const express = require('express');
const router = express.Router();

// Generate dataset of products
const dataset = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 1
}));

// Tree Node Class with name included
class TreeNode {
  constructor(id, name, price, left = null, right = null) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.left = left;
    this.right = right;
  }
}

// Function to insert nodes into the tree (with name included)
const insertNode = (root, id, name, price) => {
  if (!root) return new TreeNode(id, name, price);
  if (price < root.price) {
    root.left = insertNode(root.left, id, name, price);
  } else {
    root.right = insertNode(root.right, id, name, price);
  }
  return root;
};

// Create Binary Search Tree (BST) from dataset
let root = null;
dataset.forEach(product => {
  root = insertNode(root, product.id, product.name, product.price);
});


// Linear Search Function
const linearSearch = (arr, targetPrice) => {
  return arr.find(item => item.price === targetPrice);
};

// Tree-based Search Function with name included
const treeSearch = (node, targetPrice) => {
  if (!node || node.price === targetPrice) {
    // Return id, name, and price if the node is found
    return node ? { id: node.id, name: node.name, price: node.price } : null;
  }
  if (targetPrice < node.price) {
    return treeSearch(node.left, targetPrice);
  } else {
    return treeSearch(node.right, targetPrice);
  }
};



// Search API
router.get('/:algorithm/:price', (req, res) => {
  const { algorithm, price } = req.params;
  const targetPrice = parseInt(price);

  let result;
  const startTime = process.hrtime();

  if (algorithm === 'linear') {
    result = linearSearch(dataset, targetPrice);
  } else if (algorithm === 'tree') {
    result = treeSearch(root, targetPrice);
  }

  const endTime = process.hrtime(startTime);
  const timeInMs = (endTime[0] * 1000) + (endTime[1] / 1e6); // Convert to milliseconds

  res.json({
    result: result ? result : 'Product not found',
    time: timeInMs.toFixed(2) + ' ms'
  });
});

// Endpoint to get all products
router.get('/all', (req, res) => {
  res.json(dataset);
});
module.exports = router;
