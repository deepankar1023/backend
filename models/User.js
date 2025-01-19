const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contact:{
    type:Number,
    required: true
  },
  token:{
    type:Number,
    default:0
  },
  fcmToken: {
    type: String,
    required: false // not required initially
  }
});



const User = mongoose.model('User', userSchema);
module.exports = User;
