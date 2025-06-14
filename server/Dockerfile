FROM node:18

# Cài sqlcmd để sử dụng script chờ DB sẵn sàng
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev && \
    rm -rf /var/lib/apt/lists/*

ENV PATH="$PATH:/opt/mssql-tools/bin"

WORKDIR /app

# Copy package.json để dùng cache nếu dependencies không thay đổi
COPY package*.json ./

RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Copy script chờ SQL Server sẵn sàng
COPY wait-for-mssql.sh ./wait-for-mssql.sh
RUN chmod +x wait-for-mssql.sh

EXPOSE 3000

CMD ["./wait-for-mssql.sh", "node", "app.js"]
