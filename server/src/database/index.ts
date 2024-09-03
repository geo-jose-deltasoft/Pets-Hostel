import { Dialect, Sequelize } from 'sequelize';
import config from '../config/config';

const { database, user, password, host, driver } = config.postgres;

const sequelizeConnection = new Sequelize(
  database as string,
  user as string,
  password,
  {
    host,
    dialect: driver as Dialect,
    // dialectOptions: {
    //   ssl: {
    //     require: process.env.ENVIRONMENT
    //       ? process.env.ENVIRONMENT !== 'local'
    //       : true,
    //     rejectUnauthorized: false // You can set this to true if you have a valid SSL certificate
    //   }
    // },
    define: {
      timestamps: true, // Enable timestamps
      createdAt: 'created_at', // Use custom 'created_at' field
      updatedAt: 'updated_at' // Use custom 'updated_at' field
    },
    logging: false
  }
);

export default sequelizeConnection;
