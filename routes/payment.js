// Import necessary modules
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const OrderList = require('../models/OrderList');
const User = require('../models/User'); // Assuming you have a User model to fetch user details
const Cart = require('../models/cart'); // Import the Cart model

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new order
router.post('/', async (req, res) => {
  const { userId, cart } = req.body;
  const amount = Object.keys(cart).reduce((total, productId) => {
    const item = cart[productId];
    return total + (item.quantity * parseFloat(item.product.price));
  }, 0) * 100; // amount in the smallest currency unit

  const options = {
    amount,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Verify payment and save order details
router.post('/verify', async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId, cart ,ptoken} = req.body;

  try {
    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Save order to database
      const order = new OrderList({
        userId,
        name: user.name,
        status: 'not_confirmed',
        ready: 'preparing',
        date: new Date(),
        paymentId: razorpay_payment_id,
        products: Object.keys(cart).map(productId => ({
          productId,
          name: cart[productId].product.name,
          quantity: cart[productId].quantity,
          price: cart[productId].product.price
        }))
      });
      await order.save();

      // Clear user's cart
      const cartcheck = await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
      // console.log(cartcheck)
      // console.log(ptoken)
            //updating plastic_token in user
            // console.log(userId)
           const c = await User.findOneAndUpdate(
              { _id: userId },          // The filter to find the specific user
              { $inc: { token: ptoken } },  // The update operation to increment the token field
              { new: true }        // Options: returns the updated document
            );
      // console.log(c)

    res.json({ message: 'Payment verified, order saved, and cart cleared' });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Failed to verify payment, save order, or clear cart:', error);
    res.status(500).json({ message: 'Failed to verify payment, save order, or clear cart' });
  }
});

module.exports = router;
