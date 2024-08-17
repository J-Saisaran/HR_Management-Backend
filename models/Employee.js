const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    emergencyContact: {
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        phone: { type: String, required: true }
    },
 password: {
        type: String,
        required: true,
    }
});

EmployeeSchema.pre('save', async function (next){
    if (!this.isModified('password')) {
        return next();}
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });

module.exports = mongoose.model('Employee', EmployeeSchema);
