const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // make sure this is used in app.js

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // get token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Credential error' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
