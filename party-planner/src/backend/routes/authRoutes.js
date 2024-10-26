// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Attempting login for email:", email); // Debug 1
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User not found with email:", email); // Debug 2
      return res.status(400).json({ message: "Email sau parolă incorectă" });
    }

    console.log("User found:", user); // Debug 3

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for user:", email); // Debug 4
      return res.status(400).json({ message: "Email sau parolă incorectă" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Login successful, token generated:", token); // Debug 5
    res.json({ token, user: { name: user.name } });
  } catch (error) {
    console.error("Server error during login:", error); // Debug 6
    res.status(500).json({ message: "Server error" });
  }
  console.log("JWT Secret:", process.env.JWT_SECRET); // Debug pentru a verifica că JWT_SECRET este disponibil

});

module.exports = router;
