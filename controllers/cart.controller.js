const Cart = require('../models/cart');

const addItemToCart = async (req, res) => {
  try {
    const { userId, product, quantity } = req.body;
    
    if (!userId || !product || !product._id || typeof quantity !== 'number') {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.equals(product._id));
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: product._id, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
    // console.log('added')
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log("user id is",userId);
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.userId; // Assuming you have user info in the request after authentication

  // console.log('User ID from token:', userId); // Debugging
  // console.log('Product ID:', productId); // Debugging
  // console.log(quantity);
  try {
    // Find the cart for the logged-in user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    // Find the item in the cart
    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).send({ error: 'Item not found in cart' });
    }

    // Update the quantity
    item.quantity = quantity;
    await cart.save();

    res.status(200).send({ success: true, cart });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update cart item' });
  }
};

const deleteItem =  async (req, res) => {
  const { productId } = req.params;
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
}

module.exports = { addItemToCart, getCart ,updateCartItem ,deleteItem};
