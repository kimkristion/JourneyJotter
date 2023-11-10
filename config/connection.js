const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {

    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        protocol: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    });
} else {

    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.local_host,
            dialect: 'mysql',
            port: 3306,
        }
    );
}

module.exports = { sequelize };
