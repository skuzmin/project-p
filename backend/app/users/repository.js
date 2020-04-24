const db = require('../db');

const repository = {
    getUsers,
    getUserById,
    getUserByFieldName,
    updateUserField,
    deleteUserById,
    updateUserById,
    bumpLoginTimestamp,
    activateUser,
    createUser
};

async function activateUser(id) {
    await db.none(`
        UPDATE users 
        SET is_active = true
        WHERE id = ${id}
    `);
}

async function getUsers() {
    const user = await db.any(`SELECT id, username, email, is_admin, is_active, created_on, last_login FROM users`);
    return user;
}

async function getUserById(id) {
    const user = await db.oneOrNone(`SELECT id, username, email, created_on, is_admin, is_active, last_login FROM users WHERE id = ${id}`);
    return user;
}

async function getUserByFieldName(name, value) {
    return db.oneOrNone(`SELECT id, username, email, password, is_active, is_admin, created_on, last_login FROM users WHERE ${name} = '${value}'`);
}

async function deleteUserById(id) {
    await db.none(`DELETE FROM users WHERE id = ${id}`);
}

async function updateUserField(id, name, value) {
    await db.none(`
        UPDATE users 
        SET ${name} = '${value}'
        WHERE id = ${id}
    `);
}

async function bumpLoginTimestamp(id) {
    await db.none(`
        UPDATE users 
        SET last_login = current_timestamp
        WHERE id = ${id}
    `);
}

async function updateUserById(id, userData) {
    await db.none(`
        UPDATE users 
        SET username = '${userData.username}', email = '${userData.email}'
        WHERE id = ${id}
    `);
}

async function createUser(user) {
    const id = await db.one(`
            INSERT INTO users (username, password, email, created_on, is_admin, is_active, token)
            VALUES ('${user.username}', '${user.password}', '${user.email}', current_timestamp, ${user.isAdmin}, ${user.isActive}, '${user.token}') 
            RETURNING id
        `);
    return id;
}

module.exports = repository;
