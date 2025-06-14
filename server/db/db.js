const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false, // false nếu không sử dụng Azure
    trustServerCertificate: true, // cần cho môi trường Docker / dev
  },
};

const poolPromise = sql.connect(config)
  .then(pool => {
    console.log('✅ DB connected (SQL Auth)');
    return pool;
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise
};
