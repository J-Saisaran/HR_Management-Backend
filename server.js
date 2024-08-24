const express = require('express');
const cors = require('cors');
require('dotenv').config();
require("./dbconnection/connectdb"); // Ensure this path is correct
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




