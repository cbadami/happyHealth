const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var cookieParser = require('cookie-parser')


const app = express();

// cookie parser
app.use(cookieParser())

// Passport Config
// require('./config/passport')(passport);

// css styles
app.use("/public/stylesheets",express.static(__dirname + "/public/stylesheets"));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use( express.static( "views" ) );

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true // prune expired entries every 24h

  })
);

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
