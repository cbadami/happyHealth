const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var cookieParser = require('cookie-parser');
// var MemoryStore = require('memorystore')(session)
var cookieSession = require('cookie-session');
var bodyParser =  require('body-parser')
var dotenv = require('dotenv')

const app = express();


//.env setup
dotenv.config({ path: '.env' })

// cookie parser
app.use(cookieParser())

// Passport Config
// require('./config/passport')(passport);

// css styles
app.use("/public/stylesheets", express.static(__dirname + "/public/stylesheets"));

// EJS
app.use(expressLayouts);
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

// // Memory store session
// app.use(session({
//     cookie: { maxAge: 86400000 },
//     store: new MemoryStore({
//       checkPeriod: 86400000 // prune expired entries every 24h
//     }),
//     resave: false,
//     secret: 'keyboard cat',
//     saveUninitialized: true
// }))

// Cookie-session use
app.use(cookieSession({
  name: 'session',
  keys: ['tobo!'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

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
app.use('/', require('./routes/router.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
