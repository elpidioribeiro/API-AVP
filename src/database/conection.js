require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'permissively-lavish-muskox.data-1.use1.tembo.io',
        user: 'postgres',
        password: 'P3ziOEmatrMM0X7L',
        database: 'AVP-DATABASE',
        port: 5432,
        ssl: { rejectUnauthorized: false } // Aceitar certificados autoassinados ou desativar verificação
    }
});

module.exports = knex;
