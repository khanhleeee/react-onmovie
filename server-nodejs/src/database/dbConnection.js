const dotenv = require("dotenv");
dotenv.config();

const dbConnection = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: "localhost",
  port: 64265 || process.env.DB_PORT,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

module.exports = dbConnection;
