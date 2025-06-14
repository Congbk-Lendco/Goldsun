const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

const config = {
  connectionString: `Server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;TrustServerCertificate=Yes;Driver={SQL Server Native Client 11.0}`
};

const poolPromise = sql.connect(config)
  .then(pool => {
    console.log('✅ DB connected (Windows Auth)');
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
