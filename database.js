// Locally database connection:
const fs = require('fs');
var db = require('mysql');

eval(process.env.MYSQLCONNSTR_MyDBConnString);


db.connect(function (err) {
  if (err) {
    return console.log(`Error connecting to database: ${err.message}`.bgRed.white);
  }
  console.log(`Successfully connected to your local MySQL server`.yellow);
});

module.exports = db;















