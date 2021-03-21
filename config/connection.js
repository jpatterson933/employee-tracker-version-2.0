const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,
  // 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.end();
});

module.exports = connection;