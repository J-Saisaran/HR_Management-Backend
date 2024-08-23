const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the user exists by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      //Generate token
    const jwtData = { _id: user._id, name: user.name };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.send(token);
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;