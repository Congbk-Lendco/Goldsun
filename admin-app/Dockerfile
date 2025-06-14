FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và lockfile trước (giúp cache install)
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ project vào container
COPY . .

# Mở cổng Vite (default 5173)
EXPOSE 5174

# Khởi chạy ứng dụng Vite ở chế độ dev
CMD ["npm", "run", "dev", "--", "--host"]
