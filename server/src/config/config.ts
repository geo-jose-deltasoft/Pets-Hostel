import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const JWT_SECRET = process.env.JWT_SECRET;
const DB_DRIVER = process.env.DB_DIALECT;

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;



const POSTGRES = {
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
  driver: DB_DRIVER
};


console.log('the post gres ', POSTGRES)
const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};


const config = {
  postgres: POSTGRES,
  server: SERVER,
  auth: {secret: JWT_SECRET}
};

export default config;
