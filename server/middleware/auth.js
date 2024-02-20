const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401).send(error);

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) return res.send(err);
        req.user = decoded.userId;
        next();
    });
};

module.exports = auth;
