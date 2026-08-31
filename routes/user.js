const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// GET /api/users - Current Logged In User Profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Server error retrieving profile' });
    }
});

// POST /api/users - Register User
router.post('/', async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        // 1. Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required fields.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        email = email.toLowerCase().trim();

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'An account with this email address already exists.' });
        }

        // 3. Create and Save User
        const user = new User({
            name: name.trim(),
            email,
            password,
            role: role || 'admin'
        });

        await user.save();

        // 4. Generate JWT Token
        const jwtData = { _id: user._id, name: user.name, role: user.role };
        const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Return token and user metadata
        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            message: 'User registered successfully'
        });
    } catch (err) {
        console.error('Registration error:', err);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'An account with this email already exists.' });
        }
        res.status(500).json({ message: err.message || 'Internal server error during registration.' });
    }
});

module.exports = router;
