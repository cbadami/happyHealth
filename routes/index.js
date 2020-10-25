const express = require('express');
const router = express.Router();

var userLoginController = require('../controllers/userLoginController')
var userHomeController = require('../controllers/userHomeController')
var userSignupController = require('../controllers/userSignupController')
var adminLoginController = require('../controllers/adminLoginController')
var forgotPasswordController = require('../controllers/forgotPasswordController')
var validationController = require('../controllers/validationController')
var resetPasswordController = require('../controllers/resetPasswordController')

// const async = require('async');

// const email = 'james234@gmail.co';
// const password = 'JamesBond';

// var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' and Password = '${password}'`;

router.get('/', userLoginController.getUserLogin);

router.post('/',userLoginController.postUserLogin);

router.get('/userHome', userHomeController.getUserHome);

router.get('/adminLogin',adminLoginController.getAdminLogin );

router.post('/adminLogin', adminLoginController.postAdminLogin);

router.get('/userSignup', userSignupController.getSignup);

router.post('/userSignup', userSignupController.postSignup);

router.get('/forgotPassword', forgotPasswordController.getForgotPassword);

router.post('/forgotPassword', forgotPasswordController.postForgotPassword);

router.get('/validationPage/:userName',validationController.getValidation);

router.post('/validationPage/:userName',validationController.postValidation );

// router.get('/resetPassword',resetPasswordController.getResetPassword );


module.exports = router;
