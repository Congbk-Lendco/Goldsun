
#!/bin/bash
echo "⏳ Waiting for SQL Server to be ready..."

until /opt/mssql-tools/bin/sqlcmd -S $DB_SERVER -U $DB_USER -P $DB_PASS -Q "SELECT 1" > /dev/null 2>&1
do
  sleep 2
  echo "Waiting..."
done

echo "✅ SQL Server is ready. Starting Node.js app."
exec "$@"
