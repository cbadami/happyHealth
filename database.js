// Locally database connection:
var mysql = require('mysql');

eval(process.env.MYSQLCONNSTR_MyDBConnString);


db.connect(function (err) {
  if (err) {
    return console.log("Error connecting to database: " + err.message);
  }
  console.log("connected to your Local MySQL server");
});

module.exports = db;





