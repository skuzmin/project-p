const pgp = require('pg-promise')();
const { dbCn } = require('./config');

const db = pgp(dbCn);

module.exports = db;
