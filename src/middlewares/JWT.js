const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await User.findById(decoded.id)
        req.user = userData;
        console.log(req.user)
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
