const User=require('../model/user');
const jwt =require('jsonwebtoken');

require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


//Register 
async function registerUser  (req, res) {
const {username,email,password,mobileNumber,role}=req.body;

const userExists = await User.findOne({email});

if(userExists){
    return res.status(400).json({error: 'User already exists'});
}

const user= await User.create({
    username,
    email,
    password,
    mobileNumber,
    role
});
await  user.save();
res.status(200).json({ message: 'User registered successfully'});
}

//Login
async function loginUser  (req, res)  {
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user ||!(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = generateToken(user._id);
    res.json({ user, token });
}

module.exports={
    registerUser,
    loginUser
    
 };
