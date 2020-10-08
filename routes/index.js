const express = require('express');
const router = express.Router();
const db = require('../database');
const async = require('async');

// const email = 'james234@gmail.co';
// const password = 'JamesBond';

// var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' and Password = '${password}'`;

router.get('/', (req, res) => res.render('userLogin'));

router.post('/', (req, res) => {
  const { username, password } = req.body;
  let errors = [];
  let success_msg;
  if (!username || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('userLogin', {
      errors,
      username,
      password
    });
  }
  else {
    var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE UserName = '${username}' and Password = '${password}'`;

    db.query(queryString, function (err, result) {
      console.log(result);
      if (result.length > 0) {
        success_msg = 'Login successful';
        console.log(success_msg);
        out = "Welcome " + result[0]['UserName'] + "!";
        res.render('userHome', { success_msg, out });
      } else {
        errors.push({ msg: 'Please enter correct username or password' });
        res.render('userLogin', {
          errors,
          username,
          password
        });
      }

    });

  }

});

router.get('/userHome', (req, res) => res.render('userHome'));

router.get('/adminLogin', (req, res) => res.render('adminLogin'));

router.post('/adminLogin', (req, res) => {

  const { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ msg: 'Please enter all fields' });
  }
  else if (!password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('adminLogin', {
      errors,
      email,
      password
    });
  }
  else {

    out = "Welcome Admin!";
    res.render('adminHome', { out });
  }

});

router.get('/userSignup', (req, res) => res.render('userSignup'));


router.post('/userSignup', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  let success_msg;
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  else {
    if (name.length > 12) {
      errors.push({ msg: 'Username must be below 12 characters' });
    }
    else if (name.length < 6) {
      errors.push({ msg: 'Username must be atleast 6 characters' });
    }
    else{
      var userQuery = `SELECT UserName FROM happyhealth_MySQL.USER WHERE UserName = '${name}'`;
      db.query(userQuery, function (err, result) {
        console.log(result);
        if (result.length > 0) {
          console.log('inside username result');
          errors.push({ msg: 'Username already taken' });
        }
      });
    }

    if (password.length > 15) {
      errors.push({ msg: 'Password must be below 15 characters' });
    }
    else if (password.length < 8) {
      errors.push({ msg: 'Password must be at least 8 characters' });
    }

    if(email.length>30){
      errors.push({ msg: 'Email id must be below 30 characters' });
    }
    else{
      var userQuery = `SELECT UserName FROM happyhealth_MySQL.USER WHERE email = '${email}'`;
      db.query(userQuery, function (err, result) {
        if (result.length > 0) {
          errors.push({ msg: 'Email id already registered' });
        }
  
      });
    }

    if (password != password2) {
      errors.push({ msg: 'Passwords not matched' });
    }
  }
  console.log(errors);
  if (errors.length > 0) {
    res.render('userSignup', {
      errors,
      name,
      email,
      password,
      password2
    });
  }
  else {      
    var queryString = `INSERT INTO  happyhealth_MySQL.USER values(
      '${name}','${password}','No','No','No','Yes','${email}');`;
    db.query(queryString, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      success_msg = 'Register sucessful';
      res.render('userLogin', {
        success_msg
      });
    });

  }

});

router.get('/forgotPassword', (req, res) => res.render('forgotPassword'));

router.post('/forgotPassword', (req, res) => {
  const { email } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ msg: 'Please enter email id' });
  }
  if (errors.length > 0) {
    res.render('forgotPassword', {
      errors,
      email
    });
  }
  else {

    var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' Limit 1 `;
    db.query(queryString, function (err, result) {
      console.log(result)
      if (result.length > 0) {
        console.log(`under forgot password page ${result[0]['UserName']}`);
        var UserName = result[0]['UserName'];
        console.log(`post forgot page Hello user ${email}`);
        // errors.push({ msg: `Email id: ${email}` })
        res.render('validationPage', { email });
      } else {
        errors.push({ msg: 'Email id not registered' });
        res.render('forgotPassword', {
          errors,
          email,
        });
      }

    });

  }

});

router.get('/validationPage', (req, res) => {
  // const errors = req.errors;
  const email = req.body;
  console.log(`under get validation page ${email}`);
  res.render('validationPage', { email });
});

router.post('/validationPage', (req, res) => {

  res.render('resetPassword');
  // const {email,code} = req.body;
  // console.log(`under post validation page ${email}`);
  // let errors = [];
  // if (code == '000000') {  
  //   errors.push({ msg: `Hello user ${email}` });
  //   res.render('resetPassword', {
  //     errors,
  //     email
  //   });

  // }
  // else {
  //   errors.push({ msg: 'Please enter correct verification code' });
  //   res.render('validationPage' ,{errors,
  //     email
  //   });
  // }


});


router.get('/resetPassword', (req, res) => res.render('resetPassword', {
  errors,
  email
}));



module.exports = router;
