const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// Schedule an interview
router.post('/schedule', async (req, res) => {
    const { interviewDate, interviewer, mode, notes } = req.body;

    try {
        const newInterview = new Interview({ interviewDate, interviewer, mode, notes });
        await newInterview.save();
        res.json(newInterview);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all interviews for a candidate
router.get('/', async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.json(interviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
