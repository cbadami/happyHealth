const express = require('express');
const router = express.Router();
// const db = require('../database');


router.get('/', (req, res) => res.render('userLogin'));

router.post('/', (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  var em = email + ' Please enter all fields'
  if (!email && !password) {
    errors.push({ msg: em });
  }
  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }
  if (errors.length > 0) {
    res.render('userLogin', {
      errors,
      email,
      password
    });
  }
  else{
    res.send('Login sucessful');
  }

});

router.get('/adminLogin', (req, res) => res.render('adminLogin'))

router.post('/adminLogin', (req, res) => {

  const { email, password } = req.body;
  let errors = [];
  var em = email + ' Please enter all fields'
  if (!email && !password) {
    errors.push({ msg: em });
  }
  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }
  if (errors.length > 0) {
    res.render('adminLogin', {
      errors,
      email,
      password
    });
  }
  else{
    res.render('userLogin');
  }

});

router.get('/forgotPassword', (req, res) => res.render('forgotPassword'))

router.get('/validationPage', (req, res) => res.render('validationPage'))

router.get('/resetPassword', (req, res) => res.render('resetPassword'))


module.exports = router;
