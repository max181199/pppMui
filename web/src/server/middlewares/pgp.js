const pgp = require("pg-promise")({});

const cn = {
    host: 'dad-datamart1.consultant.ru',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
};

const client = pgp(cn);

module.exports = {
    pgp, client
};
