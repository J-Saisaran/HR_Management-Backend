const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./dbconnection/connectdb');

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

// Fast Health Check Endpoint (to keep Render backend alive)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'HR Management API is running', timestamp: new Date().toISOString() });
});

// Application Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/jobpostings', jobPostingsRoutes);
app.use('/api/candidates', candidateApplicationsRoutes);
app.use('/api/interviews', interviewsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
