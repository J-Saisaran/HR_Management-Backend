const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    closingDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('JobPosting', JobPostingSchema);
