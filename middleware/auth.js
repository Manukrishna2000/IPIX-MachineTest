const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkAuth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Token do not exist' });
    }

    try {
        const decoded = jwt.verify(token, 'jwtSecret');
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

const checkAdmin = async (req, res, next) => {
    await checkAuth(req, res, async () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admins only' });
        }
        next();
    });
};

const checkCustomer = async (req, res, next) => {
    await checkAuth(req, res, async () => {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: 'Customers only' });
        }
        next();
    });
};

module.exports = { checkAuth, checkAdmin, checkCustomer };
