const nodemailer = require('nodemailer');
const { mailjet } = require('../config');

const transport = nodemailer.createTransport({
    service: 'Mailjet',
    auth: {
        user: mailjet.login,
        pass: mailjet.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = (from, to, subject, html) => {
    return new Promise((resolve, reject) => {
        transport.sendMail({ from, subject, to, html }, (err, info) => {
            if (err) {
                reject(err)
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = { sendMail };
