// get the client
import mysql from "mysql2/promise";


//create the connection to database
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'qtda_website'
//   // password: ''
// });

//Sử dụng remoteMysql
const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'wNyptXHFXJ',
    database: 'wNyptXHFXJ',
    password: 'RdjGyOsS6Q'
  });

export default pool;