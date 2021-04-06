// Locally database connection:
const fs = require('fs');
var mysql = require('mysql');

eval(process.env.POOL_CONNECTION);

// console.log(process.env.POOL_CONNECTION);

// mysql.createConnection({multipleStatements: true});
// pooldb.connect(function (err) {
//   if (err) {
//     return console.log(`Error connecting to database: ${err.message}`.bgRed.white);
//   }
//   console.log(`Successfully connected to your local MySQL server`.yellow);
// });

module.exports = pooldb;
