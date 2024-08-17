const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

// Create Employee
router.post("/", async (req, res) => {
    const {
        firstName, lastName, email, phone, address,
        position, department, startDate, dateOfBirth,
        emergencyContact, password
    } = req.body;

    try {
        let employee = await Employee.findOne({ email });
        if (employee) return res.status(400).send("Employee already exists");

        // Save Employee Into Database
        employee = new Employee({
            firstName,
            lastName,
            email,
            phone,
            address,
            position,
            department,
            startDate,
            dateOfBirth,
            emergencyContact,
            password,
        });

        await employee.save();
        res.send(employee);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Get All Employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).send('Employee not found');
        await employee.deleteOne();
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Employee by ID
router.put('/:id', async (req, res) => {
    try {
        const {
            firstName, lastName, email, phone, address,
            position, department, startDate, dateOfBirth,
            emergencyContact, password
        } = req.body;

        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update employee details
        employee.firstName = firstName || employee.firstName;
        employee.lastName = lastName || employee.lastName;
        employee.email = email || employee.email;
        employee.phone = phone || employee.phone;
        employee.address = address || employee.address;
        employee.position = position || employee.position;
        employee.department = department || employee.department;
        employee.startDate = startDate || employee.startDate;
        employee.dateOfBirth = dateOfBirth || employee.dateOfBirth;
        employee.emergencyContact = emergencyContact || employee.emergencyContact;

        // If password is provided, hash it before saving
        if (password) {
            const salt = await bcrypt.genSalt(10);
            employee.password = await bcrypt.hash(password, salt);
        }

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Employee
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Log the incoming email and password to ensure they are received correctly
        console.log('Email:', email);
        console.log('Password:', password);

        // Check if employee exists
        const employee = await Employee.findOne({ email });
        if (!employee) {
            console.log('Employee not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Log the found employee data
        console.log('Employee found:', employee);

        // Check password
        employeepassword = employee.password;
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Log success and return employee details
        console.log('Login successful');
        res.json({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            position: employee.position,
            department: employee.department,
            startDate: employee.startDate,
            dateOfBirth: employee.dateOfBirth,
            emergencyContact: employee.emergencyContact
        });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;