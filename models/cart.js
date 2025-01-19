const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductList', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

// Check if the model exists before defining it to avoid OverwriteModelError
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartItemSchema);

module.exports = Cart;
