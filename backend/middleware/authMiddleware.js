const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;

    if (!token) {
        return res.status(403).send("Un token est requis pour l'accès.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Token invalide.");
    }

    next();
};

module.exports = verifyToken;