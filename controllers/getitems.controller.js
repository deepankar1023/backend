
const ProductList = require('../models/ProductList');

exports.getitems = async (req, res) => {
    try {
      const products = await ProductList.find();
      res.json(products);
      // console.log('called')
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }