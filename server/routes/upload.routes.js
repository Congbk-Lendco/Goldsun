const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { sql, poolPromise } = require('../db/db');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'images/avatar';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    const id_user = req.body.id_user;
    const avatarUrl = `/images/avatar/${req.file.filename}`;

    // Cập nhật avatar trong DB (tùy bạn dùng query hay sp_update_avatar)

    const pool = await poolPromise;
    await pool.request()
      .input('id_user', sql.Char(36), id_user)
      .input('avatar', sql.VarChar, avatarUrl)
      .query('UPDATE [user] SET avatar = @avatar WHERE id_user = @id_user');

    res.json({ avatarUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send('Upload thất bại');
  }
});

module.exports = router;
