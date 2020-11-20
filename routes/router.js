const express = require('express');
const router = express.Router();

var userLoginController = require('../controllers/userLoginController')
var userHomeController = require('../controllers/userHomeController')
var userSignupController = require('../controllers/userSignupController')
var adminLoginController = require('../controllers/adminLoginController')
var forgotPasswordController = require('../controllers/forgotPasswordController')
var validationController = require('../controllers/validationController')
var resetPasswordController = require('../controllers/resetPasswordController');
var userGroupController = require('../controllers/userGroupController')

var challengeManagement = require('../controllers/challengeManagement');



router.get('/', userLoginController.getUserLogin);

router.post('/',userLoginController.postUserLogin);

router.get('/userHome', userHomeController.getUserHome);


router.get('/userSignup', userSignupController.getSignup);

router.post('/userSignup', userSignupController.postSignup);

router.get('/forgotPassword', forgotPasswordController.getForgotPassword);

router.post('/forgotPassword', forgotPasswordController.postForgotPassword);

router.get('/validationPage',validationController.getValidation);

router.post('/validationPage',validationController.postValidation );

router.get('/resetPassword',resetPasswordController.getResetPassword );

router.post('/resetPassword',resetPasswordController.postResetPassword );

router.get('/userChallenges',userHomeController.getUserChallenges);

router.get('/userMoreChallenges',userHomeController.getUserMoreChallenges)

router.get('/userStep',userHomeController.getUserStep)

router.post('/userStep',userHomeController.postUserStep)

router.get('/userSleep',userHomeController.getUserSleep)

router.post('/userSleep',userHomeController.postUserSleep)

router.get('/userHydration',userHomeController.getUserHydration)

router.post('/userHydration',userHomeController.postUserHydration)

router.get('/userProfile',userHomeController.getUserProfile)



router.get('/userFruits' , userHomeController.getUserFruits );

router.get('/userVegetables', userHomeController.getUserVegetables );




router.get('/adminLogin',adminLoginController.getAdminLogin );

router.post('/adminLogin', adminLoginController.postAdminLogin);

router.get('/adminHome',adminLoginController.getAdminHome);

router.get('/challengeManagement', challengeManagement.getChallengeManagement);

router.get('/addChallenge')

router.post('/addChallenge',challengeManagement.postChallenge );

router.get('/leaderboard/:challengeId', challengeManagement.getLeaderboard )

router.get('/userManagement',adminLoginController.getUserManagement)

router.get('/editUser/:userName',adminLoginController.editUser)

router.post('/updateUser/:userName',adminLoginController.updateUser)

router.get('/deleteUser/:userName',adminLoginController.deleteUser)

/**
 * User Group routes
 */

router.get('/groupManagement',userGroupController.getGroup)

router.get('/editGroup/:groupId',userGroupController.editGroup)

router.post('/updateGroup/:groupId',userGroupController.updateGroup)

router.get('/deleteGroup/:groupId',userGroupController.deleteGroup)



router.get('/adminAnalytics',adminLoginController.getAdminAnalytics)

router.get('/adminAnalyticsStep',adminLoginController.getAdminAnalyticsStep)

router.get('/adminAnalyticsSleep',adminLoginController.getAdminAnalyticsSleep)

router.get('/adminAnalyticsWater',adminLoginController.getAdminAnalyticsWater)

router.get('/adminAnalyticsMeditation',adminLoginController.getAdminAnalyticsMediation)

module.exports = router;
