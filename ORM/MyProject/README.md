# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command
///////////////////
# for running mssql

# Pull the SQL Server 2019 image
docker pull mcr.microsoft.com/mssql/server:2019-latest

# Run SQL Server container with the password you specified in your data-source.ts
docker run -e "ACCEPT_EULA=Y" \
  -e "SA_PASSWORD=Admin12345" \
  -e "MSSQL_ENCRYPT=OPTIONAL" \
  -p 1433:1433 \
  --name sql_server \
  -d mcr.microsoft.com/mssql/server:2019-latest