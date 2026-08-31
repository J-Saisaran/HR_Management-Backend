const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/user');
const Employee = require('./models/Employee');
const JobPosting = require('./models/JobPosting');
const Leave = require('./models/Leave');
const Attendance = require('./models/Attendance');
const Performance = require('./models/Performance');
const CandidateApplication = require('./models/CandidateApplication');
const Interview = require('./models/Interview');

const seedDB = async () => {
    try {
        console.log('Connecting to MongoDB database...');
        await mongoose.connect(process.env.DATABASE);
        console.log('Connected to MongoDB successfully!');

        // 1. Seed HR Admin User if not exists
        const adminEmail = 'admin@hrmanagement.com';
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const admin = new User({
                name: 'HR Administrator',
                email: adminEmail,
                password: 'password123',
                role: 'admin'
            });
            await admin.save();
            console.log('Admin User created: admin@hrmanagement.com / password123');
        } else {
            console.log('Admin User already exists.');
        }

        // 2. Seed Sample Employees if empty
        const empCount = await Employee.countDocuments();
        let sampleEmp = null;
        if (empCount === 0) {
            const employees = [
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@company.com',
                    phone: '9876543210',
                    address: { street: '123 Tech Park', city: 'Chennai', state: 'Tamil Nadu', postalCode: '600001', country: 'India' },
                    position: 'Senior Backend Engineer',
                    department: 'Engineering',
                    startDate: new Date('2023-01-15'),
                    dateOfBirth: new Date('1995-06-20'),
                    emergencyContact: { name: 'Jane Doe', relationship: 'Spouse', phone: '9876543211' },
                    password: 'password123'
                },
                {
                    firstName: 'Priya',
                    lastName: 'Sharma',
                    email: 'priya.sharma@company.com',
                    phone: '9876543220',
                    address: { street: '45 IT Highway', city: 'Chennai', state: 'Tamil Nadu', postalCode: '600096', country: 'India' },
                    position: 'Lead HR Operations Specialist',
                    department: 'Human Resources',
                    startDate: new Date('2022-08-01'),
                    dateOfBirth: new Date('1994-03-12'),
                    emergencyContact: { name: 'Rohan Sharma', relationship: 'Sibling', phone: '9876543222' },
                    password: 'password123'
                },
                {
                    firstName: 'Arun',
                    lastName: 'Kumar',
                    email: 'arun.kumar@company.com',
                    phone: '9876543230',
                    address: { street: '78 Silicon Avenue', city: 'Bangalore', state: 'Karnataka', postalCode: '560001', country: 'India' },
                    position: 'Frontend React Specialist',
                    department: 'Engineering',
                    startDate: new Date('2023-05-10'),
                    dateOfBirth: new Date('1997-11-25'),
                    emergencyContact: { name: 'Kavitha Kumar', relationship: 'Mother', phone: '9876543233' },
                    password: 'password123'
                }
            ];

            const createdEmps = await Employee.create(employees);
            sampleEmp = createdEmps[0];
            console.log(\`Seeded \${createdEmps.length} sample employees.\`);
        } else {
            sampleEmp = await Employee.findOne();
            console.log(\`Employees already exist (Count: \${empCount}).\`);
        }

        // 3. Seed Sample Job Postings if empty
        const jobCount = await JobPosting.countDocuments();
        let sampleJob = null;
        if (jobCount === 0) {
            const jobs = [
                {
                    title: 'Full Stack Node.js & React Developer',
                    description: 'We are seeking a talented full-stack developer to lead development on modern web services, REST APIs, and responsive React interfaces.',
                    requirements: ['Node.js', 'React.js', 'MongoDB', 'REST APIs', 'TypeScript'],
                    location: 'Chennai / Hybrid',
                    salary: 950000,
                    closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                },
                {
                    title: 'Senior Backend Microservices Engineer',
                    description: 'Build high-throughput microservices, Playwright automation workflows, and secure authentication pipelines using Node.js, NestJS, and Java.',
                    requirements: ['NestJS', 'Java', 'Spring Boot', 'Playwright', 'SQL', 'Docker'],
                    location: 'Chennai / On-site',
                    salary: 1200000,
                    closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
                }
            ];
            const createdJobs = await JobPosting.create(jobs);
            sampleJob = createdJobs[0];
            console.log(\`Seeded \${createdJobs.length} job postings.\`);
        } else {
            sampleJob = await JobPosting.findOne();
            console.log(\`Job postings already exist (Count: \${jobCount}).\`);
        }

        // 4. Seed Attendance & Leave if sample employee exists
        if (sampleEmp) {
            const attCount = await Attendance.countDocuments({ employee: sampleEmp._id });
            if (attCount === 0) {
                await Attendance.create([
                    { employee: sampleEmp._id, date: new Date(), status: 'Present', notes: 'Logged in on time' },
                    { employee: sampleEmp._id, date: new Date(Date.now() - 24 * 3600 * 1000), status: 'Present', notes: 'Sprint review meeting' }
                ]);
                console.log('Seeded sample attendance records.');
            }

            const leaveCount = await Leave.countDocuments({ employee: sampleEmp._id });
            if (leaveCount === 0) {
                await Leave.create([
                    {
                        employee: sampleEmp._id,
                        startDate: new Date(Date.now() + 5 * 24 * 3600 * 1000),
                        endDate: new Date(Date.now() + 7 * 24 * 3600 * 1000),
                        type: 'Casual Leave',
                        status: 'Pending',
                        reason: 'Family wedding event'
                    }
                ]);
                console.log('Seeded sample leave requests.');
            }
        }

        console.log('\n=========================================');
        console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
        console.log('=========================================');
        process.exit(0);
    } catch (err) {
        console.error('Database seeding error:', err);
        process.exit(1);
    }
};

seedDB();
