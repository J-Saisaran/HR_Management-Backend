const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    interviewDate: {
        type: Date,
        required: true
    },
    interviewer: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ['In-Person', 'Online'],
        required: true
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Interview', InterviewSchema);
