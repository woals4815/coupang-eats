import mysql2 from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
};

const pool = mysql2.createPool(dbConfig);

export default pool;
