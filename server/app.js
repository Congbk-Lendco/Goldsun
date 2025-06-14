const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');
const adminRouter = require('./routes/admin');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ BẬT CORS TOÀN BỘ - ĐẶT Ở ĐÂU QUAN TRỌNG!
app.use(cors());

// ✅ Middleware đọc JSON phải đứng TRƯỚC routes
app.use(express.json());

// ✅ Cho phép truy cập ảnh tĩnh
app.use('/images', express.static('images'));

// ✅ Các route API
app.use('/', adminRouter);
app.use('/', uploadRoutes);
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
