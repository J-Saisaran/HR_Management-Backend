const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');



// login employee
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the employee exists
      const employee = await Employee.findOne({ email });
      if (!employee) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // If password matches, send a success response
      res.json({ message: 'Login successful', employee: employee._id });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});





module.exports = router;