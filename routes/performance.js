const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Performance = require('../models/Performance');

// Create Performance Review for a specific Employee
router.post('/:employeeId',  async (req, res) => {
    const { employeeId } = req.params;
    const { reviewDate, projectName, rating, comments } = req.body;

    try {
        const performance = new Performance({
            employee: employeeId,
            reviewDate,
            projectName,
            rating,
            comments
        });
        await performance.save();
        res.json(performance);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get All Performance Reviews for a specific Employee
router.get('/:employeeId',  async (req, res) => {
    const { employeeId } = req.params;

    try {
        const performances = await Performance.find({ employee: employeeId }).populate('employee', ['position', 'department']);
        res.json(performances);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a specific Performance Review
router.put('/:performanceId', async (req, res) => {
    try {
        const updatedPerformance = await Performance.findByIdAndUpdate(
            req.params.performanceId,
            req.body,
            {   reviewDate: req.body.reviewDate, 
                projectName: req.body.projectName,
                rating: req.body.rating, 
                comments: req.body.comments },
                { new: true }
                 
        );
       if (!updatedPerformance) {
            return res.status(404).json({ msg: 'Performance review not found' });
        }
        res.status(200).json(updatedPerformance);}
catch (err){
    res.status(500).json({ msg: 'error updating performance review' });
}
});

// Delete a specific Performance Review
router.delete('/:performanceId',  async (req, res) => {
    try {
        const performance = await Performance.findByIdAndDelete(req.params.performanceId);
        if (!performance) {
            return res.status(404).json({ msg: 'Performance review not found' });
        }

        res.json({ msg: 'Performance review removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Error removing performance review' });
    }
});

module.exports = router;
