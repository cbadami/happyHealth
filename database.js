const fs = require('fs');
var mysql = require('mysql');

eval(process.env.MYSQLCONNSTR_MyDBConnString);

/* var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {ca:fs.readFileSync("BaltimoreCyberTrustRoot.crt")}
});
 */

db.connect(function (err) {
  if (err) {
    return console.log("Error connecting to database: " + err.message);
  }
  console.log("Connected to MySQL server");
});

module.exports = db;
