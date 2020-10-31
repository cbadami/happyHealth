
// Locally database connection:
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: "35.194.21.170",
  user: "master",
  password: "123456",
  database: "happyhealth_MySQL",
  //port: 3000y
})
conn.connect(function(err) {
  if(err){
    return console.log("Error connecting to database: "+err.message);
  }
  console.log("connected to Google cloud MySQL server");
});
module.exports = conn;


// // Google cloud database connection"
// var mysql = require("mysql");

// const config = {
//   user: process.env.SQL_USER,
//   password: process.env.SQL_PASSWORD,
//   database: process.env.SQL_DATABASE
// };

// if (
//   process.env.INSTANCE_CONNECTION_NAME &&
//   process.env.NODE_ENV === "production"
// ) {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }
// const connection = mysql.createConnection(config);

// module.exports = connection;
