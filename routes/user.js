const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Current User Information
router.get("/", auth, async (req, res) => {
  const profile = await User.findById(req.user._id);
  res.send(profile);
});

// Register User
router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Checking the user
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already exists");

  // Save User Into Database
  user = new User({
    name,
    email,
    password,
    role,
  });
  await user.save();

  //Generate Token

  const jwtData = { _id: user._id, name: user.name };
  const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.send(token);
});


module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const auth = require('../middleware/auth');


// // Register User
// router.post("/", async (req, res) => {
//     const { name, email, password, role } = req.body;
  
//     // Checking the user
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).send("User already exists");
  
//     // Save User Into Database
//     user = new User({
//       name,
//       email,
//       password,
//       role
//     });
//     await user.save();
  
//     //Generate Token
//     const jwtData = { _id: user._id, name: user.name };
//     const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.send(token);
//   });

// // // Login User
// // router.post('/', async (req, res) => {
// //     const { email, password } = req.body;
// //     try {
// //         const user = await User.findOne({ email });
// //         if (!user) {
// //             return res.status(400).json({ msg: 'Invalid credentials' });
// //         }
// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(400).json({ msg: 'Invalid credentials' });
// //         }
// //         const payload = { user: { id: user.id } };
// //         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
// //             if (err) throw err;
// //             res.json({ token });
// //         });
// //     } catch (err) {
// //         console.error(err.message);
// //         res.status(500).send('login Server error');
// //     }
// // });

// router.get("/", auth, async (req, res) => {
//     const user = await User.findById(req.user._id);
//     res.send(user);
//   });

// module.exports = router;

