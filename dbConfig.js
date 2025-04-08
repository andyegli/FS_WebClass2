// Load environment variables
require('dotenv').config();
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'webclass2db'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database connected');
});

module.exports = conn;
