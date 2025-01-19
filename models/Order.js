const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: Array,
  status: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
