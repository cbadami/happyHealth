// Locally database connection:
const fs = require('fs');
var mysql = require('mysql');

eval(process.env.MYSQLCONNSTR_MyDBConnString);


db.connect(function (err) {
  if (err) {
    return console.log(`Error connecting to database: ${err.message}`.red);
  }
  console.log(`connected to your Local MySQL server`.yellow);
});

module.exports = db;















