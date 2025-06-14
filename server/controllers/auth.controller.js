const { sql, poolPromise } = require('../db/db');
const { v4: uuidv4 } = require('uuid');

const loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .input('pass', sql.VarChar, pass)
      .execute('sp_login');

    const user = result.recordset[0];
    if (user) {
      res.json(user);
    } else {
      res.status(401).send('Sai email hoặc mật khẩu');
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Lỗi máy chủ');
  }
};
const getAllUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    if (!pool) {
      throw new Error('Database pool is undefined');
    }

    const result = await pool.request().execute('sp_get_all_users');
    res.json(result.recordset);
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).send('Lỗi máy chủ');
  }
};


const registerUser = async (req, res) => {
  try {
    const { email, pass, avatar } = req.body;
    const id_user = uuidv4();
    const time = new Date().toISOString();

    const pool = await poolPromise;
    await pool
      .request()
      .input('id_user', sql.Char(36), id_user)
      .input('email', sql.VarChar, email)
      .input('pass', sql.VarChar, pass)
        .input('avatar', sql.VarChar, avatar || null)
      .input('time', sql.VarChar, time)
      .execute('sp_register');

    res.json({ success: true, message: 'Đăng ký thành công' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).send('Lỗi máy chủ');
  }
};
// Sửa lại đúng cú pháp JavaScript


module.exports = { loginUser, registerUser ,getAllUsers };
