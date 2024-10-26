// backend/middleware/checkAdmin.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Acces interzis: Doar administratorii au acces" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Autentificare necesară" });
  }
};

module.exports = checkAdmin;
