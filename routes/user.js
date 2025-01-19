// routes/user.js
const express = require('express');
const {auth} = require('../middleware/auth');
const router = new express.Router();

router.get('/api/user', auth, async (req, res) => {
   try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
