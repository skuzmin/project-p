
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');

const userRepository = require('../users/repository');
const mailer = require('../shared/mailer');
const { jwtSecret, saltRounds } = require('../config');

const views = {
    login,
    register,
    forgotPassword,
    verify,
    setNewPassword
};

function login(res) {
    res.onAborted();
    res.onData(async (ab) => {
        const credentials = JSON.parse(Buffer.from(ab));
        try {
            const user = await userRepository.getUserByFieldName('email', credentials.email);
            if (!user) {
                res
                    .writeStatus('400 Bad Request')
                    .writeHeader('Content-Type', 'application/json')
                    .end(JSON.stringify({ error: 'Wrong login or password' }));
            } else if(!user.is_active) {
                res
                    .writeStatus('400 Bad Request')
                    .writeHeader('Content-Type', 'application/json')
                    .end(JSON.stringify({ error: 'User is not active. Please verify your account before login' }));
            } else {
                bcrypt.compare(credentials.password, user.password, async function (_err, result) {
                    if (result) {
                        const token = jwt.sign(user, jwtSecret, { expiresIn: 60 * 60 });;
                        await userRepository.bumpLoginTimestamp(user.id);
                        res
                            .writeStatus('200 OK')
                            .writeHeader('Content-Type', 'application/json')
                            .end(JSON.stringify({ token }));
                    } else {
                        res
                            .writeStatus('400 Bad Request')
                            .writeHeader('Content-Type', 'application/json')
                            .end(JSON.stringify({ error: 'Wrong login or password' }));
                    }
                });
            }
        } catch (error) {
            res
                .writeStatus('500 Internal Server Error')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error }));
        }
    });
}

function register(res) {
    res.onAborted();
    res.onData(async (ab) => {
        const data = JSON.parse(Buffer.from(ab));
        try {
            const user = await userRepository.getUserByFieldName('email', data.email);
            if (user) {
                res
                    .writeStatus('400 Bad Request')
                    .writeHeader('Content-Type', 'application/json')
                    .end(JSON.stringify({ error: 'This email is already in use' }));
            } else {
                const token = randomstring.generate();
                const newUser = {
                    username: data.email,
                    email: data.email,
                    password: bcrypt.hashSync(data.password, saltRounds),
                    isActive: false,
                    token
                };
                const html = `
                <div>
                    <h3 style="text-align: center">Verify your email!</h3>
                    <br/>
                    <a href="http://localhost:8080/verify?token=${newUser.token}">---VERIFY---</a>
                </div>
                `;
                try {
                    await userRepository.createUser(newUser);
                    await mailer.sendMail('erngorn@gmail.com', newUser.email, 'Please verify your email', html);
                    res
                        .writeStatus('201 Created')
                        .end();
                } catch (error) {
                    res
                        .writeStatus('500 Internal Server Error')
                        .writeHeader('Content-Type', 'application/json')
                        .end(JSON.stringify(error));
                }
            }
        } catch (error) {
            res
                .writeStatus('500 Internal Server Error')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error }));
        }
    });
}

function verify(res) {
    res.onAborted();
    res.onData(async (ab) => {
        const { token } = JSON.parse(Buffer.from(ab));
        try {
            const user = await userRepository.getUserByFieldName('token', token);
            if (!user) {
                res
                    .writeStatus('400 Bad Request')
                    .writeHeader('Content-Type', 'application/json')
                    .end(JSON.stringify({ error: 'Your token is invalid' }));
            } else {
                try {
                    await userRepository.updateUserField(user.id, 'is_active', true);
                    await userRepository.updateUserField(user.id, 'token', null);
                    res
                        .writeStatus('204 No Content')
                        .end();
                } catch (error) {
                    res
                        .writeStatus('500 Internal Server Error')
                        .writeHeader('Content-Type', 'application/json')
                        .end(JSON.stringify(error));
                }
            }
        } catch (error) {
            res
                .writeStatus('500 Internal Server Error')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error }));
        }
    });
}

function setNewPassword(res) {
    res.onAborted();
    res.onData(async (ab) => {
        const { token, password } = JSON.parse(Buffer.from(ab));
        try {
            const user = await userRepository.getUserByFieldName('token', token);
            if (!user) {
                res
                    .writeStatus('400 Bad Request')
                    .end(JSON.stringify({ error: 'Your token is invalid' }));
            } else {
                try {
                    await userRepository.updateUserField(user.id, 'is_active', true);
                    await userRepository.updateUserField(user.id, 'password', bcrypt.hashSync(password, saltRounds));
                    await userRepository.updateUserField(user.id, 'token', null);
                    res
                        .writeStatus('204 No Content')
                        .end();
                } catch (error) {
                    res
                        .writeStatus('500 Internal Server Error')
                        .writeHeader('Content-Type', 'application/json')
                        .end(JSON.stringify(error));
                }
            }
        } catch (error) {
            res
                .writeStatus('500 Internal Server Error')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error }));
        }
    });
}

function forgotPassword(res) {
    res.onAborted();
    res.onData(async (ab) => {
        const { email } = JSON.parse(Buffer.from(ab));
        try {
            const user = await userRepository.getUserByFieldName('email', email);
            if (!user) {
                res
                    .writeStatus('204 No Content')
                    .writeHeader('Content-Type', 'application/json')
                    .end();
            } else {
                const token = randomstring.generate();
                const html = `
                <div>
                    <h3 style="text-align: center">Reset password!</h3>
                    <br/>
                    <a href="http://localhost:8080/forgot-password?token=${token}">---RESET PASSWORD---</a>
                </div>
                `;
                try {
                    await userRepository.updateUserField(user.id, 'token', token);
                    await mailer.sendMail('erngorn@gmail.com', user.email, 'Link for password reset', html);
                    res
                        .writeStatus('204 No Content')
                        .end();
                } catch (error) {
                    res
                        .writeStatus('500 Internal Server Error')
                        .writeHeader('Content-Type', 'application/json')
                        .end(JSON.stringify(error));
                }
            }
        } catch (error) {
            res
                .writeStatus('500 Internal Server Error')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error }));
        }
    });
}

module.exports = views;
