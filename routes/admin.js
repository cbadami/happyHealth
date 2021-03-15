const express = require('express');
const router = express.Router();


const adminHomeController = require('../controllers/admin/adminHomeController');
const adminProfileContorller = require('../controllers/admin/adminProfileController.js');
const userManagement = require('../controllers/admin/userManagementController');
const challengeManagement = require('../controllers/admin/challengeManagementController');
const announcementController = require('../controllers/admin/announcementController.js');
const analyticsController = require('../controllers/admin/analyticsController');





/**
 * Admin Home routes
 */
router.get('/adminHome', adminHomeController.getAdminHome);


/**
 *  Admin Profile Controller
 */
router.get('/getAdminUserName/:userId', adminProfileContorller.getAdminUserName);
router.get('/editUserInfo/:userId', adminProfileContorller.getUserInfo);


/**
  * Admin user management routes
  */
router.get('/userManagement', userManagement.getUserManagement);
//router.get('/editUser/:userId', adminLoginController.editUser);
router.post('/updateUser/:userId', userManagement.updateUser);
router.get('/deleteUser/:userId', userManagement.deleteUser);



/**
 * Admin challenge management routes
 */
router.get('/challengeManagement', challengeManagement.getChallengeManagement);
router.get('/addChallenge', challengeManagement.addChallenge);
router.post('/addChallenge', challengeManagement.postChallenge);
// router.get('/editChallenge/', challengeManagement.ed);
router.get('/editChallenge/:cid', challengeManagement.editChallenge);
router.post('/editChallenge/:cid', challengeManagement.updateChallenge);
router.post('/deleteChallenge/:cid', challengeManagement.deleteChallenge);
router.get('/getChallengeUsers/:challengeId', challengeManagement.getChallengeUsers);
// router.get('/addUser', challengeManagement.addUser);


/**
 * Admin user analytics routes
 */
router.get('/getUserTotalMetrics/:userId', analyticsController.getUserTotalMetrics);
router.get('/adminAnalytics', analyticsController.getAdminAnalytics);
router.get('/adminAnalyticsOverAll', analyticsController.getAdminAnalyticsOverAll);


/**
 * Admin Announcement routes
 */

router.get('/adminAnnouncements',announcementController.getAdminAnnouncements)

module.exports = router;