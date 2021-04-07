// Locally database connection:
const fs = require('fs');
var mysql = require('mysql');

eval(process.env.MYSQLCONNSTR_PoolConnection);

// console.log(process.env.MYSQLCONNSTR_PoolConnection,"=========> poool");

// mysql.createConnection({multipleStatements: true});
// pooldb.connect(function (err) {
//   if (err) {
//     return console.log(`Error connecting to database: ${err.message}`.bgRed.white);
//   }
//   console.log(`Successfully connected to your local MySQL server`.yellow);
// });

module.exports = pooldb;
