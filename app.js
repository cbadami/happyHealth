var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// dotenv.config({ path: '.env' })

// const sql = require('mysql');
// const dev_db_url = process.env.connection-string;
// const sqlDB = process.env.sqlURI || dev_db_url;
// sql.connect(sqlDB, { useNewUrlParser: true  ,   useUnifiedTopology: true });
// sql.Promise = global.Promise;
// const db = sql.connection;
// db.on('error', console.error.bind(console, 'sql connection error:'));

//setting up database connection
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   // socketPath: "exalted-legacy-290621:us-central1:happyhealth-test01",
//   host: "35.194.21.170",
//   user: "root",
//   password: "123456",
//   database: "happyhealth_MySQL"
// })

// //connect to database
// connection.connect(function(err) {
//   if(err){
//     return console.log("Error connecting to database: "+err.message);
//   }
//   console.log("connected to Google cloud MySQL server");
// });

// // Query 
// connection.query("SELECT * FROM User_Info", function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
