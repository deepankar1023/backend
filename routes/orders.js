const express = require('express');
const { auth } = require('../middleware/auth');
const {completeOrder} = require('../controllers/ordercontroller'); // Ensure this path is correct
const router = express.Router();

router.post('/complete', auth, completeOrder);

module.exports = router;
