const express = require('express');
const router = express.Router();
const db = require('../database');

// const email = 'james234@gmail.com';
// const password = 'JamesBond';

// var sql = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' and Password = '${password}'`;

// db.query(sql, function (err, data, fields) {
//   if (err) throw err;
//   console.log("connected ");
//   console.log(data[0]['UserName']);
//   var userName = "Hello " + data[0]['UserName'];
//   // res.send(userName);
// });


router.get('/', (req, res) => res.render('userLogin'));

router.post('/', async (req, res) => {
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
    // var queryString = `SELECT * FROM happyhealth_MySQL.USER WHERE Email = 'james234@gmail.com' and Password = 'JamesBond'`;
    try {
     db.query({
      sql: queryString, 
      timeout: 10000,
      }, function (err, data) {
       
        if(err) {
          res.send("Not Implemented: Please enter correct email id and password");
        }
        console.log(data[0]['UserName']);
        out = "Not implemented: Hello user: " + data[0]['UserName'];
        res.send(out);

      });
    } catch (err) {
      res.send("Not Implemented: Please enter correct email id and password");
    }
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

router.get('/forgotPassword', (req, res) => res.render('forgotPassword'));

router.get('/validationPage', (req, res) => res.render('validationPage'));

router.get('/resetPassword', (req, res) => res.render('resetPassword'));

router.get('/userSignup', (req, res) => res.render('userSignup'));

module.exports = router;
