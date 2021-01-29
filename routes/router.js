const express = require('express');
const router = express.Router();

const userLoginController = require('../controllers/userLoginController');
const userHomeController = require('../controllers/userHomeController');
const userSignupController = require('../controllers/userSignupController');
const adminLoginController = require('../controllers/adminLoginController');
const forgotPasswordController = require('../controllers/forgotPasswordController');
const validationController = require('../controllers/validationController');
const resetPasswordController = require('../controllers/resetPasswordController');
const userGroupController = require('../controllers/userGroupController');
const challengeManagement = require('../controllers/challengeManagement');
// const userProfileController = require('../controllers/userProfileController');

router.get('/', userLoginController.getUserLogin);
router.post('/', userLoginController.postUserLogin);
router.get('/userHome', userHomeController.getUserHome);

router.get('/userSignup', userSignupController.getSignup);
router.post('/userSignup', userSignupController.postSignup);


/**
 * User Home routes
 */
router.get('/userChallenges', userHomeController.getUserChallenges);
router.get('/userMoreChallenges', userHomeController.getUserMoreChallenges);
router.get('/userStep', userHomeController.getUserStep);
router.post('/userStep', userHomeController.postUserStep);
router.get('/userSleep', userHomeController.getUserSleep);
router.post('/userSleep', userHomeController.postUserSleep);
router.get('/userHydration', userHomeController.getUserHydration);
router.post('/userHydration', userHomeController.postUserHydration);
router.get('/userProfile', userHomeController.getUserProfile);
router.post('/userProfile', userHomeController.postUserProfile);
router.get('/userFruits', userHomeController.getUserFruits);
//router.get('/userFruits', userHomeController.postUserFruits);
router.get('/userVegetables', userHomeController.getUserVegetables);
router.get('/userTrack', userHomeController.getUserTrack);
router.get('/userTrack', userHomeController.postUserTrack);



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
router.get('/adminHome', adminLoginController.getAdminHome);


/**
 * Admin challenge management routes
 */
router.get('/challengeManagement', challengeManagement.getChallengeManagement);
router.get('/addChallenge', challengeManagement.addChallenge);
router.post('/addChallenge', challengeManagement.postChallenge);

// router.get('/editChallenge/', challengeManagement.ed);
router.get('/editChallenge/:cid', challengeManagement.editChallenge);

//router.get('/leaderboard/:challengeId', challengeManagement.getLeaderboard);


/**
 * Admin user management routes
 */
router.get('/userManagement', adminLoginController.getUserManagement);
router.get('/editUser/:userId', adminLoginController.editUser);
router.post('/updateUser/:userId', adminLoginController.updateUser);
router.get('/deleteUser/:userId', adminLoginController.deleteUser);


/**
 *  Admin user group management routes
 */
router.get('/groupManagement', userGroupController.getGroup);
router.get('/editGroup/:groupId', userGroupController.editGroup);
router.post('/updateGroup/:groupId', userGroupController.updateGroup);
router.get('/deleteGroup/:groupId', userGroupController.deleteGroup);
router.get('/getGroupMembers/:groupId', userGroupController.getGroupMembers);
router.get('/removeUser/:groupId/:userId', userGroupController.removeUserGroup);
router.get('/addUser/:groupId/:username', userGroupController.addUserGroup);


/**
 * Admin user analytics routes
 */
router.get('/adminAnalytics', adminLoginController.getAdminAnalytics);
router.get('/adminAnalyticsStep', adminLoginController.getAdminAnalyticsStep);
router.get('/adminAnalyticsSleep', adminLoginController.getAdminAnalyticsSleep);
router.get('/adminAnalyticsWater', adminLoginController.getAdminAnalyticsWater);
router.get('/adminAnalyticsMeditation', adminLoginController.getAdminAnalyticsMediation);
router.get('/adminAnalyticsFruits', adminLoginController.getAdminAnalyticsFruits);
router.get('/adminAnalyticsVegetables', adminLoginController.getAdminAnalyticsVegetables);


module.exports = router;
