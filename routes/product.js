const express = require('express');
const router = express.Router();
const ProductList = require('../models/ProductList'); // Adjust the path to your ProductList model

// GET product by ID
router.get('/:productId', async (req, res) => {
  try {
    const product = await ProductList.findById(req.params.productId, '_id name price image');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
