const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

    const token = req.header("x-auth-token");

    // check if no token
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    //  Verify token
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.userId;

        next();

    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};