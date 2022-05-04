var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "logindetails.cj7yotdeanl8.us-east-2.rds.amazonaws.com",
  user     : "admin",
  password : "Alameda393",
  port     : "3306"

  
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();

module.exports = connection;