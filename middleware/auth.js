const jwt = require('jsonwebtoken');

const JWT_SECRET = 'una_clave_secreta_segura';
const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = auth;
