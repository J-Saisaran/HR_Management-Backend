const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave'); // Import the Leave model
const Employee = require('../models/Employee'); // Import the Employee model (if needed)

// Get all leave requests for a specific employee

router.get('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;

    try {
        const leaveRequests = await Leave.find({ employee: employeeId });
        res.json(leaveRequests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a new leave request for a specific employee
router.post('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { startDate, endDate, type, reason ,status} = req.body;

    try {
        const newLeaveRequest = new Leave({
            employee: employeeId,
            startDate,
            endDate,
            type,
            status,
            reason,
        });
        await newLeaveRequest.save();
        res.json(newLeaveRequest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a leave request's status by its ID
router.put('/:requestId', async (req, res) => {
    try {
        const updatedRequest = await Leave.findByIdAndUpdate(
            req.params.requestId,
            {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                type: req.body.type,
                reason: req.body.reason,
                status: req.body.status,
            },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.status(200).json(updatedRequest);
    } catch (err) {
        res.status(500).json({ message: 'Error updating leave request', error: err.message });
    }
});

// Delete a leave request by its ID (optional, if needed)
router.delete('/:requestId', async (req, res) => {
    try {
        const deletedRequest = await Leave.findByIdAndDelete(req.params.requestId);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.status(200).json({ message: 'Leave request deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting leave request', error: err.message });
    }
});

module.exports = router;
