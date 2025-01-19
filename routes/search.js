const express = require('express');
const router = express.Router();
const ProductList = require('../models/ProductList');

// Search products by name
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const results = await ProductList.find({ name: new RegExp(query, 'i') });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
