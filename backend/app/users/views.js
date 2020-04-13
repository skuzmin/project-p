const repository = require('./repository');
const bcrypt = require('bcrypt');

const { saltRounds } = require('../config');
const { newUserValidation, updateUserValidation } = require('./helpers');
const { isAuthenticated } = require('../auth/helpers');

const views = {
    getUserById,
    getUsers,
    updateUserById,
    deleteUserById,
    activateUser,
    createUser
};

async function getUsers(res, req) {
    res.onAborted();
    isAuthenticated(res,req);
    try {
        const users = await repository.getUsers();
        res
            .writeStatus('200 OK')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    } catch (error) {
        res
            .writeStatus('500 Internal Server Error')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify({ error }));
    }
};

async function getUserById(res, req) {
    res.onAborted();
    const id = req.getParameter(0);
    isAuthenticated(res,req);
    try {
        const user = await repository.getUserById(id);
        if (user) {
            res
                .writeStatus('200 OK')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify(user));
        } else {
            res
                .writeStatus('404 Not Found')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error: 'user not found' }));
        }
    } catch (error) {
        res
            .writeStatus('500 Internal Server Error')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify({ error }));
    }
};

async function activateUser(res, req) {
    res.onAborted();
    const id = req.getParameter(0);
    isAuthenticated(res,req);
    try {
        await repository.activateUser(id);
        res
            .writeStatus('204 No Content')
            .end();
    } catch(error) {
        res
            .writeStatus('500 Internal Server Error')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify({ error }));
    }
}

function updateUserById(res, req) {
    res.onAborted();
    const id = req.getParameter(0);
    isAuthenticated(res,req);
    res.onData(async (ab) => {
        const userData = JSON.parse(Buffer.from(ab));
        const validation = updateUserValidation(userData);
        if (validation.length) {
            res
                .writeStatus('400 Bad Request')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error: `Field(s): ${validation.join(', ')} are required` }));
        } else {
            try {
                const isUserExist = await repository.getUserById(id);
                if (!isUserExist) {
                    res
                        .writeStatus('400 Bad Request')
                        .writeHeader('Content-Type', 'application/json')
                        .end(JSON.stringify({ error: 'The user doesn\'t exist in the system' }));
                } else {
                    try {
                        await repository.updateUserById(id, userData);
                        const updatedUser = await repository.getUserById(id);
                        res
                            .writeStatus('201 Created')
                            .writeHeader('Content-Type', 'application/json')
                            .end(JSON.stringify(updatedUser));
                    } catch (error) {
                        console.log(error)
                        res
                            .writeStatus('500 Internal Server Error')
                            .writeHeader('Content-Type', 'application/json')
                            .end(JSON.stringify({ error }));
                    }
                }
            } catch (error) {
                res
                    .writeStatus('500 Internal Server Error')
                    .writeHeader('Content-Type', 'application/json')
                    .end(JSON.stringify({ error }));
            }
        }
    });
}

async function deleteUserById(res, req) {
    res.onAborted();
    const id = req.getParameter(0);
    isAuthenticated(res,req);
    try {
        await repository.deleteUserById(id);
        res
            .writeStatus('204 No Content')
            .end();
    } catch (error) {
        res
            .writeStatus('500 Internal Server Error')
            .writeHeader('Content-Type', 'application/json')
            .end(JSON.stringify({ error }));
    }
}

function createUser(res) {
    res.onAborted();
    res.onData(async (ab) => {
        const user = JSON.parse(Buffer.from(ab));
        const error = newUserValidation(user);
        if (error) {
            res
                .writeStatus('400 Bad Request')
                .writeHeader('Content-Type', 'application/json')
                .end(JSON.stringify({ error }));
        } else {
            try {
                const isUserExist = await repository.getUserByFieldName('email', user.email);
                if (isUserExist) {
                    res
                        .writeStatus('400 Bad Request')
                        .writeHeader('Content-Type', 'application/json')
                        .end(JSON.stringify({ error: 'User with this email already exists' }));
                } else {
                    const newUser = {
                        username: user.username,
                        email: user.email,
                        password: bcrypt.hashSync(user.password, saltRounds),
                        isActive: !!user.isActive,
                        isAdmin: !!user.isAdmin
                    };
                    try {
                        const newUserId = await repository.createUser(newUser);
                        res
                            .writeStatus('201 Created')
                            .end(JSON.stringify(newUserId));
                    } catch (error) {
                        res
                            .writeStatus('500 Internal Server Error')
                            .writeHeader('Content-Type', 'application/json')
                            .end(JSON.stringify({ error }));
                    }
                }
            } catch (error) {
                res
                    .writeStatus('500 Internal Server Error')
                    .writeHeader('Content-Type', 'application/json')
                    .end(JSON.stringify({ error }));
            }
        }
    });
};

module.exports = views;
