const mongosse = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongosse.Schema({
   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'Admin'],
        default: 'admin'
    }
});

userSchema.pre('save', async function (next){
   if (!this.isModified('password')) {
       return next();}
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
       next();
   });

   module.exports = mongosse.model('User', userSchema);
