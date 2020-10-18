const express = require('express');
const router = express.Router();

var userLoginController = require('../controllers/userLoginController')
var userHomeController = require('../controllers/userHomeController')
var userSignupController = require('../controllers/userSignupController')

// const async = require('async');

// const email = 'james234@gmail.co';
// const password = 'JamesBond';

// var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' and Password = '${password}'`;

router.get('/', userLoginController.getUserLogin);

router.post('/',userLoginController.postUserLogin);

router.get('/userHome', userHomeController.getUserHome);

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

router.get('/userSignup', userSignupController.getSignup);


router.post('/userSignup', userSignupController.postSignup);

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
