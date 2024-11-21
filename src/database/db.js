const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config({ path: '.env' });

const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    port: +(process.env.DATABASE_PORT),
    dialect: 'mysql',
    logging: false,
});

module.exports = db;
