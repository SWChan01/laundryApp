var mysql = require('mysql');
require('dotenv').config()
var connection = mysql.createConnection({
  host     : process.env.hostname,
  user     : process.env.user,
  password : process.env.dbPassword,
  database : process.env.databaseName
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});


module.exports=connection;