const express = require('express');
const router = express.Router();
const JobPosting = require('../models/JobPosting');

// Create a new job posting
router.post('/', async (req, res) => {
    const { title, description, requirements, location, salary, postedDate, closingDate } = req.body;

    try {
        const newJobPosting = new JobPosting({ title, description, requirements, location, salary, postedDate, closingDate });
        await newJobPosting.save();
        res.json(newJobPosting);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all job postings
router.get('/', async (req, res) => {
    try {
        const jobPostings = await JobPosting.find();
        res.json(jobPostings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a single job posting by ID
router.get('/:id', async (req, res) => {
    try {
        const jobPosting = await JobPosting.findById(req.params.id);
        if (!jobPosting) return res.status(404).json({ message: 'Job posting not found' });
        res.json(jobPosting);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
