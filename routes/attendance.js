const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance'); // Import the Attendance model
const Employee = require('../models/Employee'); // Import the Employee model

// Get all attendance records for a specific employee


router.get('/:employeeId',  async (req, res) => {
    const { employeeId } = req.params;

    try {
        const attendanceRecords = await Attendance.find({ employee: employeeId });
        res.json(attendanceRecords);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




// Add a new attendance record for a specific employee

router.post('/:employeeId',  async (req, res) => {
    const { employeeId } = req.params;
    const {  date, status, notes} = req.body;
    

    try {
        const attendanceRecords = new Attendance({
            employee: employeeId,
            date, 
            status,
            notes
        });
        await attendanceRecords.save();
        res.json(attendanceRecords);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// Update an attendance record by its ID (optional, if needed)
router.put('/:recordId', async (req, res) => {
    try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(
            req.params.recordId,
            {
                date: req.body.date,
                status: req.body.status,
                notes: req.body.notes,
            },
            { new: true }
        );

        if (!updatedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.status(200).json(updatedAttendance);
    } catch (err) {
        res.status(500).json({ message: 'Error updating attendance record', error: err.message });
    }
});

// Delete an attendance record by its ID (optional, if needed)
router.delete('/:recordId', async (req, res) => {
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(req.params.recordId);
        if (!deletedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting attendance record', error: err.message });
    }
});

module.exports = router;
