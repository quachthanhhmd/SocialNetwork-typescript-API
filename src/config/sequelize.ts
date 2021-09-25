import { Sequelize } from 'sequelize';

import env from "./environments";


export const sequelize = new Sequelize(
    env.DB.DB_DATABASE_NAME,
    env.DB.DB_USERNAME,
    env.DB.DB_PASSWORD,
    {
        host: env.DB.DB_DATABASE_HOST,
        dialect: env.DB.DB_DIALECT,
        port: env.DB.DB_DATABASE_PORT,
        query: {
            raw: true
        }
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })