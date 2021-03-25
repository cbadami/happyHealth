const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// var MemoryStore = require('memorystore')(session)
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');
const {isAuth, isAdmin} = require('./middleware/auth.js');
const cron = require('node-cron');




const app = express();

//.env setup
dotenv.config({ path: '.env' });

// cookie parser
app.use(cookieParser());

// Passport Config
// require('./config/passport')(passport);

// css styles
//app.use("/public/stylesheets", express.static(__dirname + "/public/stylesheets"));
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use(express.static('public'))
app.use('/static', express.static(__dirname + "/public"));
// Setting template engine
app.use(expressLayouts);
app.set('view options', {
  layout: false
});
app.set('view engine', 'ejs');

app.use(express.static("views"));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// accept url encoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// accept json 
app.use(bodyParser.json());


// Cookie-session use
app.use(cookieSession({
  name: 'session',
  keys: ['tobo!'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/auth.js'));
app.use('/',isAuth,require('./routes/user.js'));
app.use('/',isAdmin,require('./routes/admin.js'));

// app.get('/error',(req, res) => {
//   console.log("************No route***************");
//   res.status(404).send({
//     status: 404,
//     Error: 'Page Not Found'
//   });
// });

const db = require('./database')
const moment = require('moment');
let currentDate = moment(new Date()).format('L').toString();
// Schedule tasks to be run on the server.
cron.schedule('* * * * *', async function() {
  console.log('running a task every minute');
  const usersQuery = "SELECT userId FROM usertbl"
  await db.query(usersQuery,(err,result)=>{
    if(err){
      console.log(err,"------error while users");
    }
    console.log(result,"-------result")
  })

  

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Successfully app running local at: `.yellow, `http://localhost:${PORT}`.cyan.underline));
