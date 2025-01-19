const express = require('express');
const router = express.Router();
const ProductList = require("../models/ProductList");
const {getitems} = require('../controllers/getitems.controller');

router.get("/getitems",getitems);

module.exports = router;

