
const ProductList = require('../models/ProductList');

exports.addItems = async (req, res) => {
  try {
    const { id,name,info,image,price,category } = req.body;
    if (!id || !name || !info || !image || !price ||!category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const item = new ProductList({ id,name,info,image,price,category});
    await item.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Addition error:', error);
    res.status(400).json({ error: error.message });
  }
};