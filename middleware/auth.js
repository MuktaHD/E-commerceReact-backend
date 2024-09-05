// const jwt=require('jsonwebtoken');
// require('dotenv').config();

// const authorise = (req,res,next)=>{
//     const token=req.header('Authorization');
//     const bearerWord=(token.split(" ")[0]).trim();
//     const bearerToken=token.split(" ")[1];
//   if(bearerWord != "Bearer"){
//     return res.status(403).json({message:'Invalid Header'});
//   }
//     if(!bearerToken){
//         return res.status(401).json({message: 'No token,authorization denied'});
//     }
//     try{
//         const decoded=jwt.verify(bearerToken,'mukta');
//         req.user=decoded;
//         next();
//     }catch(error){
//         return res.status(401).json({message:'Invalid token,authorization denied'});
//     }

// }

// async function admin(req,res,next) {
//   if(req.user.role!=='admin'){
//     return res.status(403).json({message:'Only admin can access this route'});
//   }
//   next();
  
// }

// async function user(req,res,next) {
//   if(req.user.role!=='user'){
//     return res.status(403).json({message:'Only user can access this route'});
//   }
//   next();
  


// module.exports={authorise,
//   admin,
//   user
// };

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorise = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization');
    
    // Check if the Authorization header exists
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Split the header to get the bearer token
    const parts = token.split(' ');
    
    // Check if it starts with 'Bearer' and has a token part
    if (parts[0] !== 'Bearer' || parts.length !== 2) {
        return res.status(403).json({ message: 'Invalid Header' });
    }
    
    const bearerToken = parts[1].trim();
    
    try {
        // Verify the token
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET || 'mukta');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};

async function admin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can access this route' });
    }
    next();
}

async function user(req, res, next) {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Only user can access this route' });
    }
    next();
}

module.exports = {
    authorise,
    admin,
    user
};
