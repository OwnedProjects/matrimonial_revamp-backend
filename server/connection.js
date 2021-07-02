const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 20,
  user: "root",
  password: "",
  host: "localhost",
  database: "matrimonial",
  port: 3306,
});

module.exports = pool;
