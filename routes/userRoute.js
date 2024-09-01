const express = require('express');
const {registerUser,loginUser,userInformation}= require('../controllers/userController');
const auth=require('../middleware/auth')
const router = express.Router();

// POST /api/users/register
 router.post('/register', registerUser);
 // POST /api/users/login
 router.post('/login', loginUser);
 router.get('/getUserInfo',auth.authorise, userInformation);

module.exports = router;

// http://127.0.0.1:5001/api/users/getUserInfo