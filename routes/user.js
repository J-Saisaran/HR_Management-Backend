// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

// // Current User Information
// router.get("/", auth, async (req, res) => {
//   const profile = await User.findById(req.user._id);
//   res.send(profile);
// });

// // Register User
// router.post("/", async (req, res) => {
//   const { name, email, password, role } = req.body;

//   // Checking the user
//   let user = await User.findOne({ email });
//   if (user) return res.status(400).send("User already exists");

//   // Save User Into Database
//   user = new User({
//     name,
//     email,
//     password,
//     role,
//   });
//   await user.save();

//   //Generate Token

//   const jwtData = { _id: user._id, name: user.name };
//   const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: "2h" });
//   res.send(token);
// });


// module.exports = router;

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require("./dbconnection/connectdb"); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Cache-Control Middleware
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send("Access Denied (Token not found)");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

// Routes
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');
const leaveRoutes = require('./routes/leave');
const performanceRoutes = require('./routes/performance');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const jobPostingsRoutes = require('./routes/jobPostings');
const candidateApplicationsRoutes = require('./routes/candidateApplications');
const interviewsRoutes = require('./routes/interviews');

// Apply JWT authentication middleware to protected routes
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/employees', authenticateToken, employeeRoutes);
app.use('/api/leaves', authenticateToken, leaveRoutes);
app.use('/api/performances', authenticateToken, performanceRoutes);
app.use('/api/jobpostings', authenticateToken, jobPostingsRoutes);
app.use('/api/candidates', authenticateToken, candidateApplicationsRoutes);
app.use('/api/interviews', authenticateToken, interviewsRoutes);
app.use('/api/auth', authRoutes); // Authentication routes do not need token protection
app.use('/api/attendance', authenticateToken, attendanceRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
