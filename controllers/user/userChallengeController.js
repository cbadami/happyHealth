// const db = require('../../database');
const pooldb = require('../../pooldb');
const moment = require('moment');

exports.getUserChallenges = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.session.userId;
			console.log(userId, '=========> current user');
			let currentDate = moment(new Date()).format('L').toString();

			console.log(currentDate);

			let query = `SELECT userId, challengetbl.challengeId, challengeName, challengeType , challengeDescription, startDate, endDate ,  activeUser FROM challengemembertbl JOIN challengetbl ON challengemembertbl.challengeId = challengetbl.challengeId WHERE challengemembertbl.userId = ${userId} and archive =0;`;

			conn.query(query, (err, result) => {
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

					const leftChalls = `select * from challengetbl where challengeId in (SELECT challengeId FROM happyhealth.challengemembertbl where userId =${userId} and leftDate != '' );`
					conn.query(leftChalls, (err, leftChallenges) => {
						if(err){
							console.log(err, "===> error while getting left challenges")
						}else{
							console.log(leftChallenges, "====> these are left challenges")


							console.log(present, '=========> present ');
						console.log(previous, '============> previous');

					res.render('userViews/userChallenges', {
						layout: 'layouts/userLayout',
					 	present,
						 previous,
						 leftChallenges, 
						title: 'User Management',
					});
						}
					})


					
				}
			});

			conn.release();
		}
	});
};

exports.joinChallenge = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('*** user is joining  *************');

			let challengeId = req.params.challengeId;
			let userId = req.session.userId;
			let joinedDate = moment(new Date()).format('L').toString();
			console.log(challengeId, userId, typeof joinedDate);

			let joinChallengeQuery = `UPDATE happyhealth.challengemembertbl set joinedDate = '${joinedDate}', activeUser=1, leftDate= '', archive=0 where challengeId = ${challengeId} and userId = ${userId};`;

			conn.query(joinChallengeQuery, (err, result) => {
				if (err) {
					console.log(err, 'error while joining');
				} else {
					console.log(result, '=============> joined Successfully');
					res.redirect('/userChallenges');
				}
			});

			conn.release();
		}
	});
};

exports.leaveChallenge = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('*********** user leaving   *********');
			let challengeId = req.params.challengeId;
			let userId = req.session.userId;
			let leftDate = moment(new Date()).format('L').toString();

			console.log(challengeId, userId, typeof joinedDate);

			let joinChallengeQuery = `UPDATE happyhealth.challengemembertbl set activeUser=0, leftDate= '${leftDate}', archive=1 where challengeId = ${challengeId} and userId = ${userId};`;

			conn.query(joinChallengeQuery, (err, result) => {
				if (err) {
					console.log(err, '======>error while leaving');
				} else {
					console.log(result, '=============> left Successfully');
					res.redirect('/userChallenges');
				}
			});
			conn.release();
		}
	});
};

exports.getUserMoreChallenges = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			res.render('userViews/user_more_challenges', {
				layout: 'layouts/userLayout',
				title: 'User Management',
			});
			conn.release();
		}
	});
};

exports.setChallengesAccept = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('Set activeUser');
			const userId = req.session.userId;
			res.render('userViews/challengeAccepted', {
				layout: 'layouts/userLayout',
				title: 'Active Challenges',
			});
			conn.release();
		}
	});
};

exports.getActiveChallenges = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			res.render('userViews/activeChallenges', {
				layout: 'layouts/userLayout',
				title: 'Active Challenges',
			});
			
			conn.release();
		}
	});
};

exports.getAvailableChallenges = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const allAvailableChallenges = `Select * from happyhealth.challengetbl`;

			conn.query(allAvailableChallenges, function (err, result) {
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
			conn.release();
		}
	});
};

exports.getCompletedChallenges = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			res.render('userViews/completedChallenges', {
				layout: 'layouts/userLayout',
				title: 'Completed Challenges',
			});
			conn.release();
		}
	});
};

exports.getPersonalGoals = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			res.render('userViews/personalGoals', {
				layout: 'layouts/userLayout',
				title: 'Personal Goals',
			});
			conn.release();
		}
	});
};

exports.getPast;