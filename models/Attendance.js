const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Assuming you have an Employee model
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Present','present', 'Absent', 'absent','leave', 'Leave','late', 'Late'], // Example statuses
        required: true,
    },
    notes: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);