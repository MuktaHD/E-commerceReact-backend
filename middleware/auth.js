

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Middleware to authorize users based on JWT token
// const authorise = (req, res, next) => {
//     // Get the token from the Authorization header
//     const token = req.header('Authorization');
    
//     // Check if the Authorization header exists
//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     // Split the header to get the bearer token
//     const parts = token.split(' ');

//     // Check if it starts with 'Bearer' and has a token part
//     if (parts[0] !== 'Bearer' || parts.length !== 2) {
//         return res.status(403).json({ message: 'Invalid Header' });
//     }
    
//     const bearerToken = parts[1].trim();
    
//     try {
//         // Verify the token
//         const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET || 'mukta');
//         console.log("Decoded Token:", decoded);  // Log the decoded token for debugging
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token, authorization denied' });
//     }
// };

// // Middleware to restrict access to admin routes
// async function Admin(req, res, next) {
//     console.log("User Role:", req.user.role);  // Log the user role for debugging
//     if (req.user.role !== 'Admin') {
//         return res.status(403).json({ message: 'Only admin can access this route' });
//     }
//     next();
// }



// // Middleware to restrict access to user routes
// async function User(req, res, next) {
//     if (req.user.role !== 'User') {
//         return res.status(403).json({ message: 'Only user can access this route' });
//     }
//     next();
// }


  
// module.exports = {
//     authorise,
//     Admin,
//     User
// };



const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authorize users based on JWT token
const authorise = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const parts = token.split(' ');

    if (parts[0] !== 'Bearer' || parts.length !== 2) {
        return res.status(403).json({ message: 'Invalid Header' });
    }
    
    const bearerToken = parts[1].trim();
    
    try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET || 'mukta');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};

// Middleware to restrict access to admin routes
const Admin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Only admin can access this route' });
    }
    next();
}

// Middleware to restrict access to user routes
const User = (req, res, next) => {
    if (req.user.role !== 'User') {
        return res.status(403).json({ message: 'Only user can access this route' });
    }
    next();
}

module.exports = {
    authorise,
    Admin,
    User
};
