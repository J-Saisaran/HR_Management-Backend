const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    reviewDate: {
        type: Date,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Performance', PerformanceSchema);
