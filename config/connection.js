const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,
  // we grab our stored variables from .env file
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  //show us how we are connected --not implemented
  // console.log(`connected as id ${connection.threadId}`);
// we do not want our connection to end -- yet
//   connection.end();
});

module.exports = connection;