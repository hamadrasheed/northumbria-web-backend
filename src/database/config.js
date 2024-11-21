require('dotenv').config({ path: '.env' });

module.exports = {
    dialect: "mysql",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    seederStorage: 'sequelize'
};
