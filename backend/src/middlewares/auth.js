const jwt = require('jsonwebtoken')

exports.requireSignin = (roles = []) => {
    return (req, res, next) => {
      const token = req.headers['authorization'];
      
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
  
      try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
  
        // If roles are specified, check the user's role
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
  
        next();
      } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
      }
    };
  };