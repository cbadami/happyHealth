var mysql = require('mysql');
var conn = mysql.createConnection({
  // socketPath: "exalted-legacy-290621:us-central1:happyhealth-test01",
  host: "35.194.21.170",
  user: "root",
  password: "123456",
  database: "happyhealth_MySQL"
})

//connect to database
conn.connect(function(err) {
  if(err){
    return console.log("Error connecting to database: "+err.message);
  }
  console.log("connected to Google cloud MySQL server");
});

// Query 
// conn.query("select emailid from User_Info where username = 'abcd'", function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });

module.exports = conn;
