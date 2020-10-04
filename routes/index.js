const express = require('express');
const router = express.Router();
const db = require('../database');
const async = require('async');

// const email = 'james234@gmail.co';
// const password = 'JamesBond';

// var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' and Password = '${password}'`;

router.get('/', (req, res) => res.render('userLogin'));

router.post('/', (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email && !password) {
    errors.push({ msg: 'Please enter all fields' });
  }
  else if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }
  if (errors.length > 0) {
    res.render('userLogin', {
      errors,
      email,
      password
    });
  }
  else {

    var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' and Password = '${password}'`;
    db.query(queryString, function (err, result) {
      if (result.length > 0) {
        console.log(result[0]['UserName']);
        out = "Not implemented: Login Sucessful: " + result[0]['UserName'];
        res.send(out);
      } else {
        errors.push({ msg: 'Please enter correct email id or password' });
        res.render('userLogin', {
          errors,
          email,
          password
        });
      }

    });

  }

});

router.get('/adminLogin', (req, res) => res.render('adminLogin'));

router.post('/adminLogin', (req, res) => {

  const { email, password } = req.body;
  let errors = [];
  if (!email && !password) {
    errors.push({ msg: 'Please enter all fields' });
  }
  else if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.render('adminLogin', {
      errors,
      email,
      password
    });
  }
  else {
    res.send("Not implemented: Admin Home page")
  }

});

router.get('/userSignup', (req, res) => res.render('userSignup'));


// router.post('/userSignup', (req, res) => {
//   const { email, password } = req.body;
//   let errors = [];
//   if (!email && !password) {
//     errors.push({ msg: 'Please enter all fields' });
//   }
//   else if (password.length < 8) {
//     errors.push({ msg: 'Password must be at least 8 characters' });
//   }
//   if (errors.length > 0) {
//     res.render('userLogin', {
//       errors,
//       email,
//       password
//     });
//   }
//   else {

//     var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' and Password = '${password}'`;
//     db.query(queryString, function (err, result) {
//       if (result.length > 0) {
//         console.log(result[0]['UserName']);
//         out = "Not implemented: Login Sucessful: " + result[0]['UserName'];
//         res.send(out);
//       } else {
//         errors.push({ msg: 'Please enter correct email id or password' });
//         res.render('userLogin', {
//           errors,
//           email,
//           password
//         });
//       }

//     });

//   }

// });

router.get('/forgotPassword', (req, res) => res.render('forgotPassword'));

router.get('/validationPage', (req, res) => res.render('validationPage'));

router.get('/resetPassword', (req, res) => res.render('resetPassword'));



module.exports = router;
