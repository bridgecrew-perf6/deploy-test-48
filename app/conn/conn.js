const pgp = require("pg-promise")();

const cn = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const db = pgp(cn);

module.exports = db;
