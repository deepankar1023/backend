const express = require('express');
const { addItemToCart, getCart ,updateCartItem } = require('../controllers/cart.controller');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/cart', auth, addItemToCart);
router.get('/cart', auth, getCart);
// Update cart item
router.put('/cart/items/:productId', auth, updateCartItem);

const Cart = require('../models/cart'); // Adjust the path if necessary


router.delete('/cart/:productId', auth, async (req, res) => {
  const { productId } = req.params;
  // console.log(productId)
  const userId = req.user.userId; // Extract userId from the authenticated user

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      
      return res.status(404).send({ error: 'Cart not found' });
      
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      
      return res.status(404).send({ error: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    
    await cart.save();
    
    res.status(200).send({ success: true, cart });
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).send({ error: 'Failed to remove cart item' });
  }
});



  
  

module.exports = router;
