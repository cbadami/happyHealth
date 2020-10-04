const express = require('express');
const router = express.Router();
// // Load User model
// const User = require('../models/User');
// const { forwardAuthenticated } = require('../config/auth');

// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page


// Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

// // Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

module.exports = router;
