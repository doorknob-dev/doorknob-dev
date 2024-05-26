const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Check if bearer is undefined
    if (!bearerHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const bearerToken = bearerHeader.substring(7); // Skip "Bearer " to get the actual token
    jwt.verify(bearerToken, '9u23r32f3f9398fj39jfu3', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Invalid token: User ID missing" });
        }
        req.user = decoded; // Assign the decoded user to the request
        next();
    });
}

module.exports = authenticateToken; // Export the middleware function
