const express = require('express');
const cors = require('cors');
require('dotenv').config();
require("./dbconnection/connectdb")
const PORT = process.env.PORT || 5000;


const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');
const leaveRoutes = require('./routes/leave');
const performanceRoutes = require('./routes/performance');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const jobPostingsRoutes = require('./routes/jobPostings');
const candidateApplicationsRoutes = require('./routes/candidateApplications');
const interviewsRoutes = require('./routes/interviews');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/jobpostings', jobPostingsRoutes);
app.use('/api/candidates', candidateApplicationsRoutes);
app.use('/api/interviews', interviewsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// require("./dbconnection/connectdb"); // Ensure this path is correct

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware to parse JSON
// app.use(express.json());

// // Middleware to enable CORS
// app.use(cors());

// // Cache-Control Middleware
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//   next();
// });

// // JWT Authentication Middleware
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).send("Access Denied (Token not found)");

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// }

// // Routes
// const userRoutes = require('./routes/user');
// const employeeRoutes = require('./routes/employee');
// const leaveRoutes = require('./routes/leave');
// const performanceRoutes = require('./routes/performance');
// const authRoutes = require('./routes/auth');
// const attendanceRoutes = require('./routes/attendance');
// const jobPostingsRoutes = require('./routes/jobPostings');
// const candidateApplicationsRoutes = require('./routes/candidateApplications');
// const interviewsRoutes = require('./routes/interviews');

// // Apply JWT authentication middleware to protected routes
// app.use('/api/users', authenticateToken, userRoutes);
// app.use('/api/employees', authenticateToken, employeeRoutes);
// app.use('/api/leaves', authenticateToken, leaveRoutes);
// app.use('/api/performances', authenticateToken, performanceRoutes);
// app.use('/api/jobpostings', authenticateToken, jobPostingsRoutes);
// app.use('/api/candidates', authenticateToken, candidateApplicationsRoutes);
// app.use('/api/interviews', authenticateToken, interviewsRoutes);
// app.use('/api/auth', authRoutes); // Authentication routes do not need token protection
// app.use('/api/attendance', authenticateToken, attendanceRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



