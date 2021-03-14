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
const userChallengeController = require('../controllers/userChallengesController');



/**
 * Home route
 */
router.get('/home', userHomeController.getUserHome);


/**
 * User Home routes
 */
router.get('/userProfile', userHomeController.getUserProfile);
router.post('/userProfile', userHomeController.postUserProfile);
router.get('/userInfo',userHomeController.getUserInfo);

router.get('/userChallenges', userHomeController.getUserChallenges);
router.get('/userMoreChallenges', userHomeController.getUserMoreChallenges);

router.get('/userStep', userHomeController.getUserStep);
router.post('/userStep', userHomeController.postUserStep);

router.get('/userSleep', userHomeController.getUserSleep);
router.post('/userSleep', userHomeController.postUserSleep);

router.get('/userTrack', userHomeController.getUserTrack);
router.post('/userTrack', userHomeController.postUserTrack);

router.get('/userHydration', userHomeController.getUserHydration);
router.post('/userHydration', userHomeController.postUserHydration);

router.get('/userFruits', userHomeController.getUserFruits);
router.post('/userFruits', userHomeController.postUserFruits);

router.get('/userVegetables', userHomeController.getUserVegetables);
router.post('/userVegetables', userHomeController.postUserVegetables);

router.get('/notifications', userHomeController.getNotifications);


/**
 * User Challenges
 */

 router.get('/activeChallenges', userChallengeController.getActiveChallenges);
 router.get('/availableChallenges', userChallengeController.getAvailableChallenges);
 router.get('/completedChallenges', userChallengeController.getCompletedChallenges);
 router.post('/challengeAccepted/:challengeId', userChallengeController.setChallengesAccept);
 router.get('/personalGoals', userChallengeController.getPersonalGoals);
 
 /**
  * User Groups 
  */
 router.post('/userGroups/:groupId', userHomeController.joinGroup); // TO join Group
 router.get('/availableGroups', userHomeController.getAvailableGroups)
 router.get("/joinedGroups", userHomeController.getJoinedGroups);
 router.get('/createNewGroup', userHomeController.getCreateGroupPage);
 router.post('/createNewGroup', userHomeController.addNewUserGroup);
 router.post('/leaveGroup/:groupId', userHomeController.leaveGroup)
 router.get('/joinedUsers/:groupId', userHomeController.getJoinedUsers );


module.exports = router;