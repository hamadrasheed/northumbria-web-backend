const jwt = require('jsonwebtoken');
require('dotenv').config();

const authAndRoleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        try {

            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authorization token missing or invalid' });
            }

            const token = authHeader.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 

            // Check if user's role is in the allowed roles
            if (allowedRoles?.length && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access denied: You are not allowed for this action.' });
            }

            req.body.userId = decoded.userId;
            req.body.userRole = decoded.role;
            req.query.userId = decoded.userId;
            req.query.userRole = decoded.role;
    

            next();
        } catch (error) {
            console.error('Role verification failed:', error.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};

module.exports = authAndRoleMiddleware;
