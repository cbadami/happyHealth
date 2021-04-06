const db = require('../../database');

const moment = require('moment');

exports.getUserChallenges = (req, res) => {
	const userId = req.session.userId;
	console.log(userId, '=========> current user');
	let currentDate = moment(new Date()).format('L').toString();

	console.log(currentDate);

	let query = `SELECT userId, challengetbl.challengeId, challengeName, challengeType , challengeDescription, startDate, endDate ,  activeUser FROM challengemembertbl JOIN challengetbl ON challengemembertbl.challengeId = challengetbl.challengeId WHERE challengemembertbl.userId = ${userId} and archive =0;`;

	db.query(query, (err, result) => {
		if (err) {
			console.log(err, '====> error while getting user challenges');
		} else {
			console.log(result, '=========> result of user challenges');

			let present = [];
			let previous = [];

			//moment("04/06/2021").isSameOrBefore(currentDate)

			for (let i = 0; i < result.length; i++) {
				console.log(result[i].endDate, '=============> date of chall');

				let eventDate = moment(result[i].endDate).format('L').toString();

				console.log(eventDate, currentDate, '===========> event current date');
				console.log(moment(eventDate).isBefore(currentDate));

				if (moment(result[i].endDate).isBefore(currentDate)) {
					previous.push(result[i]);
				} else {
					present.push(result[i]);
				}
			}

			console.log(present, '=========> present ');
			console.log(previous, '============> previous');

			res.render('userViews/userChallenges', {
				layout: 'layouts/userLayout',
				result: present,
				title: 'User Management',
			});
		}
	});
};

exports.joinChallenge = (req, res) => {
	console.log('*** user is joining  *************');

	let challengeId = req.params.challengeId;
	let userId = req.session.userId;
	let joinedDate = moment(new Date()).format('L').toString();
	console.log(challengeId, userId, typeof joinedDate);

	let joinChallengeQuery = `UPDATE happyhealth.challengemembertbl set joinedDate = '${joinedDate}', activeUser=1, leftDate= '', archive=0 where challengeId = ${challengeId} and userId = ${userId};`;

	db.query(joinChallengeQuery, (err, result) => {
		if (err) {
			console.log(err, 'error while joining');
		} else {
			console.log(result, '=============> joined Successfully');
			res.redirect('/userChallenges');
		}
	});
};

exports.leaveChallenge = (req, res) => {
	console.log('*********** user leaving   *********');
	let challengeId = req.params.challengeId;
	let userId = req.session.userId;
	let leftDate = moment(new Date()).format('L').toString();

	console.log(challengeId, userId, typeof joinedDate);

	let joinChallengeQuery = `UPDATE happyhealth.challengemembertbl set activeUser=0, leftDate= '${leftDate}', archive=1 where challengeId = ${challengeId} and userId = ${userId};`;

	db.query(joinChallengeQuery, (err, result) => {
		if (err) {
			console.log(err, '======>error while leaving');
		} else {
			console.log(result, '=============> left Successfully');
			res.redirect('/userChallenges');
		}
	});
};

exports.getUserMoreChallenges = (req, res) => {
	res.render('userViews/user_more_challenges', {
		layout: 'layouts/userLayout',
		title: 'User Management',
	});
};

exports.setChallengesAccept = (req, res) => {
	console.log('Set activeUser');
	const userId = req.session.userId;
	res.render('userViews/challengeAccepted', {
		layout: 'layouts/userLayout',
		title: 'Active Challenges',
	});
};

exports.getActiveChallenges = (req, res) => {
	res.render('userViews/activeChallenges', {
		layout: 'layouts/userLayout',
		title: 'Active Challenges',
	});
	// const allGroupsQuery = `SELECT * FROM happyhealth.groupTbl`;

	// db.query(allGroupsQuery, function (err, result) {
	//     if (err) {
	//         throw err;
	//     } else {
	//         console.log(result, "------------db group result");
	//         res.render('userViews/activeChallenges', {layout: 'layouts/userLayout', title: 'Active Challenges', result });
	//         console.log("***************getGroup executed successfully******************");
	//     }
	// });
};

exports.getAvailableChallenges = (req, res) => {
	const allAvailableChallenges = `Select * from happyhealth.challengetbl`;

	db.query(allAvailableChallenges, function (err, result) {
		if (err) {
			throw err;
		} else {
			console.log(result, '------------db group result');
			res.render('userViews/availableChallenges', {
				layout: 'layouts/userLayout',
				title: 'Available Challanges',
				result,
			});
			console.log(req.session.userId);
			console.log('***************Available challanges executed successfully******************');
		}
	});
};

exports.getCompletedChallenges = (req, res) => {
	res.render('userViews/completedChallenges', {
		layout: 'layouts/userLayout',
		title: 'Completed Challenges',
	});
};

exports.getPersonalGoals = (req, res) => {
	res.render('userViews/personalGoals', {
		layout: 'layouts/userLayout',
		title: 'Personal Goals',
	});
};

exports.getPast;
