const express = require('express');
const router = express.Router();


const userLoginController = require('../controllers/userLoginController');
const userHomeController = require('../controllers/userHomeController');
const userSignupController = require('../controllers/userSignupController');
const adminLoginController = require('../controllers/adminLoginController');
const forgotPasswordController = require('../controllers/forgotPasswordController');
const validationController = require('../controllers/validationController');
const resetPasswordController = require('../controllers/resetPasswordController');

/**
 * User Signup and login routes
 */
router.get('/', userLoginController.getUserLogin);
router.post('/', userLoginController.postUserLogin);
router.get('/userSignup', userSignupController.getSignup);
router.post('/userSignup', userSignupController.postSignup);


/**
 * user forgot password routes
 */
router.get('/forgotPassword', forgotPasswordController.getForgotPassword);
router.post('/forgotPassword', forgotPasswordController.postForgotPassword);
router.get('/validationPage', validationController.getValidation);
router.post('/validationPage', validationController.postValidation);
router.get('/resetPassword', resetPasswordController.getResetPassword);
router.post('/resetPassword', resetPasswordController.postResetPassword);


/**
 * Admin login and home routes
 */
 router.get('/adminLogin', adminLoginController.getAdminLogin);
 router.post('/adminLogin', adminLoginController.postAdminLogin);


 /**
  *  Log out route
  */

  router.get('/logout',userLoginController.getUserLogout)


module.exports = router;