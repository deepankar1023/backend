// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Log token for debugging (optional, remove in production)
  // console.log('Received Token:', token); 

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    // Log decoded token for debugging (optional, remove in production)
    // console.log('Decoded Token:', decoded);

    // Set user in request
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { auth };
