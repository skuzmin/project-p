const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

const helpers = {
    isAuthenticated
};

function isAuthenticated(req) {
    const header = req.getHeader('authorization');
    if (!header) {
        return null;
    }
    const token = header.split('JWT ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (err) {
        return null;
    }
};

module.exports = helpers;
