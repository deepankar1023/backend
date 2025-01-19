const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['confirmed', 'not_confirmed','declined'], required: true },
  ready: { type: String, enum: ['preparing', 'done'], required: true },
  date: { type: Date, default: Date.now },
  paymentId: { type: String, required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductList', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }]
});

const OrderList = mongoose.model('OrderList', orderSchema);

module.exports = OrderList;
