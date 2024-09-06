


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
