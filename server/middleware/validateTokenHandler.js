const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "User is not authorized" });
      } else {
        req.user = decoded.user; // Attach decoded user info to req.user
        next(); // Move to the next middleware
      }
    });
  } else {
    return res.status(401).json({ error: "Invalid token format" });
  }
};

module.exports = validateToken;
