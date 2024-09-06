// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     mobileNumber: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['Admin', 'User'], 
//         default: 'User',
//         required: true
//     }
// });

// // Hash the password before saving the user document
// UserSchema.pre('save', async function(next) {
//     const user = this;

//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });

// // Method to compare passwords during login
// UserSchema.methods.comparePassword = async function(password) {
//     return await bcrypt.compare(password, this.password);
// };

// const User = mongoose.model('User', UserSchema);

// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
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
    mobileNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],  // Example roles
        default: 'User'
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
