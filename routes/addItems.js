const express = require('express');
const router = express.Router();
const {addItems} = require('../controllers/addItems.controller');

router.post('/additem', addItems);



module.exports = router;
