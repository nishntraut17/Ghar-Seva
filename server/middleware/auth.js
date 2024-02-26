const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.sendStatus(401).send("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).send("Unauthorized");
        }
        req.user = decoded; // Assuming the decoded token contains the entire user object
        next();
    });
};

module.exports = auth;
