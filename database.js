// Locally database connection:
var mysql = require('mysql');

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


db.connect(function (err) {
  if (err) {
    return console.log("Error connecting to database: " + err.message);
  }
  console.log("connected to your Local MySQL server");
});

module.exports = db;





