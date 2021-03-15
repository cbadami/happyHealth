const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userSignupController = require('../controllers/userSignupController');
const passwordController = require('../controllers/passwordController');

/**
 * User Signup and login routes
 */
router.get('/', authController.getUserLogin);
router.post('/', authController.postUserLogin);
router.get('/signup', userSignupController.getSignup);
router.post('/signup', userSignupController.postSignup);

/**
 * Admin login and home routes
 */
router.get('/adminLogin', authController.getAdminLogin);
router.post('/adminLogin', authController.postAdminLogin);


/**
 *  Log out route
 */

router.get('/logout', authController.getLogout);

/**
 *  Forgot Password routes
 */
router.get('/forgotPassword', passwordController.getForgotPassword);
router.post('/forgotPassword', passwordController.postForgotPassword);
router.get('/validationPage', passwordController.getValidation);
router.post('/validationPage', passwordController.postValidation);
router.get('/resetPassword', passwordController.getResetPassword);
router.post('/resetPassword', passwordController.postResetPassword);



module.exports = router;