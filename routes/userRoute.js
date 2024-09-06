const express = require('express');
const {registerUser,loginUser,userInformation}= require('../controllers/userController');
const auth=require('../middleware/auth')
const router = express.Router();

// POST /api/users/register
 router.post('/register', registerUser);
 // POST /api/users/login
 router.post('/login', loginUser);
 // Example route in your backend
router.get('/api/user/me', auth.authorise, (req, res) => {
    const user = req.user; // assuming 'req.user' is set by 'authenticateToken' middleware
    res.json({
      userId: user.id,
      username: user.username,
      email: user.email,
    });
  });
  
 router.get('/getUserInfo',auth.authorise, userInformation);

module.exports = router;

// http://127.0.0.1:5001/api/users/getUserInfo