const express = require('express');
const router = express.Router();



const userHomeController = require('../controllers/user/userHomeController')
const userProfileController = require('../controllers/user/userProfileController')
const userChallengeController = require('../controllers/user/userChallengeController')
const userProgressController = require('../controllers/user/userProgressController')
const userNotificationController = require('../controllers/user/userNotificationController')



/**
 * User home routes
 */
router.get('/home', userHomeController.getUserHome);

router.get('/userStep/:date', userHomeController.getUserStepByDate);
router.get('/userStep', userHomeController.getUserStep);
router.post('/userStep', userHomeController.postUserStep);

router.get('/userSleep', userHomeController.getUserSleep);
router.post('/userSleep', userHomeController.postUserSleep);

router.get('/userTrack', userHomeController.getUserTrack);
router.post('/userTrack', userHomeController.postUserTrack);

router.get('/userHydration', userHomeController.getUserHydration);
router.post('/userHydration', userHomeController.postUserHydration);

router.get('/getFruitsVeggies', userHomeController.getFruitsVeggies)
router.post('/postFruitsVeggies', userHomeController.postFruitsVeggies)



router.get('/userFruits', userHomeController.getUserFruits);
router.post('/userFruits', userHomeController.postUserFruits);

router.get('/userVegetables', userHomeController.getUserVegetables);
router.post('/userVegetables', userHomeController.postUserVegetables);

router.get('/userPhysicalActivity', userHomeController.getUserPhysicalActivity);
router.post('/userPhysicalActivity', userHomeController.postUserPhysicalActivity);

/**
 * User Profile routes
 */
 router.get('/userInfo',userProfileController.getUserInfo);
 router.get('/userProfile', userProfileController.getUserProfile);
 router.post('/userProfile', userProfileController.postUserProfile);

/**
 * User Challenges
 */

 router.get('/userChallenges', userChallengeController.getUserChallenges);
 router.post('/joinChallenge/:challengeId', userChallengeController.joinChallenge )
 router.post('/leaveChallenge/:challengeId', userChallengeController.leaveChallenge ) 
 router.get('/userMoreChallenges', userChallengeController.getUserMoreChallenges);
 router.get('/activeChallenges', userChallengeController.getActiveChallenges);
 router.get('/availableChallenges', userChallengeController.getAvailableChallenges);
 router.get('/completedChallenges', userChallengeController.getCompletedChallenges);
 router.post('/challengeAccepted/:challengeId', userChallengeController.setChallengesAccept);
 router.get('/personalGoals', userChallengeController.getPersonalGoals);


 /**
  * User Progress
  */

 router.get('/userProgress', userProgressController.getTodayProgress);
 router.get('/progress',userProgressController.getProgress);

 /**
  * User Notification Controller
  */
 
router.get('/notifications', userNotificationController.getNotifications);
// router.post('/notifications', userNotificationController.postNotifications);
router.post('/dismissAnnouncement/:messageId', userNotificationController.dismissAnnouncement)


/**
 * Updating User metrics everyday with zeros
 */

 router.get('/resetJobs', userHomeController.resetUserMetrics)
 





module.exports = router;