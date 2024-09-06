


const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },  
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

// Register 
async function registerUser(req, res) {
    const { username, email, password, mobileNumber, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
        username,
        email,
        password,
        mobileNumber,
        role
    });
    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
}

// Login


async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log("User object before token generation:", user);

    const token = generateToken(user);
    const decodedToken = jwt.decode(token);  // Decode the token to verify its contents
    console.log("Decoded Token after generation:", decodedToken);  // This should show the role

    res.json({ user, token });
}



// User Information
async function userInformation(req, res) {
    console.log('User --', req.user);

    try {
        const user = await User.findById(req.user.id);
        console.log(user)
        if (!user) {
            return res.status(404).send({ message: 'User not found', success: false });
        } else {
            return res.status(200).send({ user, success: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error', success: false });
    }
}

module.exports = {
    registerUser,
    loginUser,
    userInformation
};
