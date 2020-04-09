const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

const helpers = {
    isAuthenticated
};

function isAuthenticated(res, req) {
    const header = req.getHeader('authorization');
    if (!header) {
        setUnauthorizedStatus(res, 'You are not authorized');
    } else {
        const token = header.split('JWT ')[1];
        jwt.verify(token, jwtSecret, err => {
            if (err) {
                setUnauthorizedStatus(res, err);
            }
        });
    }
};

function setUnauthorizedStatus(res, error) {
    res
        .writeStatus('401 Unauthorized')
        .writeHeader('Content-Type', 'application/json')
        .end(JSON.stringify({ error }));
}

module.exports = helpers;
