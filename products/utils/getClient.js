const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

module.exports.getClient = () => {
    const dbOptions = {
        host: PG_HOST,
        port: PG_PORT,
        database: PG_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        },
        connectionTimeoutMillis: 5000
    };

    return new Client(dbOptions);
}
