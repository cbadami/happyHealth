const db = require('../../database');
const moment = require('moment');

exports.getChallengeManagement = (_req, res) => {
	const viewChallengesQuery = `SELECT * FROM happyhealth.challengeTbl`;
	return db.query(viewChallengesQuery, function (err, result) {
		if (err) throw err;
		else {
			return res.render('adminViews/challengeManagement', {
				layout: 'layouts/adminLayout',
				result,
				title: 'Challenge Management',
			});
		}
	});
};

exports.addChallenge = (req, res) => {
	res.render('adminViews/addChallenge', { layout: 'layouts/adminLayout' });
};

exports.editChallenge = (req, res) => {
	let cid = req.params.cid;

	const viewChallengesQuery = `SELECT * FROM happyhealth.challengeTbl WHERE challengeId =  ${cid}`;
	return db.query(viewChallengesQuery, function (err, result) {
		if (err) throw err;
		else {
			console.log(result);
			return res.render('adminViews/editChallenge', { result, layout: 'layouts/adminLayout' });
		}
	});
};

exports.updateChallenge = (req, res) => {
	let cid = req.params.cid;
	let { name, description, challengeType, participantType, participantCount, startDate, endDate } = req.body;
	let [year, month, date] = startDate.split('-');
	startDate = month + '/' + date + '/' + year;
	let [y, m, d] = endDate.split('-');
	endDate = m + '/' + d + '/' + y;
	console.log(startDate, endDate, '----------dates');

	const updateQuery = `UPDATE happyhealth.challengeTbl SET challengeName =  '${name}' , challengeDescription = '${description}', challengeType= '${challengeType}', participantType='${participantType}', participantCount=${participantCount},startDate='${startDate}', endDate= '${endDate}' where challengeId = ${cid}`;
	db.query(updateQuery, function (err, result) {
		if (err) throw err;
		else {
			console.log('Successfully updated');
			// return res.render('adminViews/challengeManagement', {result, layout: "layouts/adminLayout" })
			res.redirect('/challengeManagement');
		}
	});
};

exports.deleteChallenge = (req, res) => {
	let cid = req.params.cid;

	const deleteQuery = `DELETE from happyhealth.challengeTbl where challengeId = ${cid} `;
	db.query(deleteQuery, function (err, result) {
		if (err) throw err;
		else {
			console.log('Successfully deleted');
			res.redirect('/challengeManagement');
		}
	});
};

exports.postChallenge = (req, res) => {
	console.log(req.body, '----------adding post challenge');
	let { name, description, adminChallengeType, participantCount, participantType, startDate, endDate } = req.body;
	//(id,challengeName,description,challengeType,startDate,endDate,partcipantType,participantCount)
	let [year, month, date] = startDate.split('-');
	startDate = month + '/' + date + '/' + year;
	let [y, m, d] = endDate.split('-');
	endDate = m + '/' + d + '/' + y;
	console.log(startDate, endDate, '----------dates');
	const insert = `INSERT INTO happyhealth.challengeTbl (challengeName, challengeDescription, challengeType, participantType, participantCount , startDate, endDate) VALUES('${name}', '${description}', '${adminChallengeType}', '${participantType}', ${participantCount}, '${startDate}', '${endDate}'); `;
	db.query(insert, (err, results) => {
		if (err) throw err;
		else {
			console.log('Successfully added challenge to db');
		}
	});
	res.redirect('/challengeManagement');
};

// exports.getChallengeUsers = async (req, res) => {
// 	let challengeId = req.params.challengeId;
// 	console.log(challengeId, '--------challenge Id');
// 	let joinedUsers = (notJoinedUsers = challengeData = '');
// 	const usersQuery = `SELECT userId, userName FROM happyhealth.usertbl where userId IN (SELECT userId FROM happyhealth.challengemembertbl where challengeId=${challengeId});`;
// 	await db.query(usersQuery, (err, result) => {
// 		if (err) throw err;
// 		else {
// 			console.log(result, '----------------userQuery challenge result');
// 			joinedUsers = result;
// 		}
// 	});
// 	const notUsersQuery = `SELECT userId, userName FROM happyhealth.usertbl where userId NOT IN (SELECT userId FROM happyhealth.challengemembertbl where challengeId=${challengeId});`;
// 	await db.query(notUsersQuery, (err, result) => {
// 		if (err) throw err;
// 		else {
// 			console.log(result, '------------notUsersQuery result');
// 			notJoinedUsers = result;
// 		}
// 	});

// 	const challengeQuery = `select * from happyhealth.challengetbl where challengeId =${challengeId}`;
// 	await db.query(challengeQuery, (err, result) => {
// 		if (err) throw err;
// 		else {
// 			console.log(result, '------------challengeQuery result');
// 			challengeData = result;
// 			res.render('adminViews/challengeMembers', {
// 				layout: 'layouts/adminLayout',
// 				title: 'Challenge Members',
// 				joinedUsers,
// 				notJoinedUsers,
// 				challengeData,
// 			});
// 		}
// 	});
	
// };

exports.getChallengeUsers = async (req, res) => {
	let challengeId = req.params.challengeId;
	let joinedUsers = (notJoinedUsers = challengeData = '');

	let joinedQuery = `SELECT challengemembertbl.userId, userName, challengemembertbl.challengeId, challengeName, accepted FROM challengemembertbl INNER JOIN challengetbl ON challengemembertbl.challengeId = challengetbl.challengeId INNER JOIN usertbl on challengemembertbl.userId=usertbl.userId WHERE challengemembertbl.challengeId=${challengeId};`;
	db.query(joinedQuery, (err, result) => {
		if (err) {
			console.log(err, '=======> error getChallengeUsers');
		} else {
			console.log(result , "============> result getChallengeUsers");
			joinedUsers = result;
		}
	});

	const notJoinedQuery = `SELECT userId, userName FROM happyhealth.usertbl where userId NOT IN (SELECT userId FROM happyhealth.challengemembertbl where challengeId=${challengeId});`;
	await db.query(notJoinedQuery, (err, result) => {
		if (err) throw err;
		else {
			console.log(result, '------------notUsersQuery result');
			notJoinedUsers = result;
		}
	});

	const challengeQuery = `select * from happyhealth.challengetbl where challengeId =${challengeId}`;
	await db.query(challengeQuery, (err, result) => {
		if (err) throw err;
		else {
			console.log(result, '------------challengeQuery result');
			challengeData = result;
			res.render('adminViews/challengeMembers', {
				layout: 'layouts/adminLayout',
				title: 'Challenge Members',
				joinedUsers,
				notJoinedUsers,
				challengeData,
			});
		}
	});

};

exports.addUserToChallenge = (req, res) => {
	let userId = req.body.userId;
	let challengeId = req.params.challengeId;
	let joinedDate = moment(new Date()).format('L');
	console.log(joinedDate);

	let addUserQuery = `INSERT INTO happyhealth.challengemembertbl (userId, joinedDate, challengeId, accepted ) VALUES( ${userId}, '' , ${challengeId} , 0); `;

	db.query(addUserQuery, (err, result) => {
		if (err) {
			console.log(err, '-------> error while adding user.');
		} else {
			console.log(result);
			res.redirect(`/getChallengeUsers/${challengeId}`);
		}
	});
};

exports.removeUser = (req, res) => {
	let userId = req.params.userId;
	let challengeId = req.params.groupId;

	console.log(userId, challengeId, ' USER AND GROUP ID');

	const deleteQuery = `DELETE from happyhealth.challengemembertbl where userId=${userId} and challengeId = ${challengeId}`;
	db.query(deleteQuery, (err, result) => {
		if (err) {
			console.log(err, '-----------> Error while deleting');
		} else {
			console.log(result, 'deleted successfully');
			res.redirect(`/getChallengeUsers/${challengeId}`);
		}
	});
};

exports.getChallengeUsersAdminSide = (req, res) => {
	console.log('Inside Challenge USers');
	let userId = req.params.userId;
	let challengeId = req.params.challengeId;
	//let query = `SELECT * FROM happyhealth.challengemembertbl where userId = ${userId} and challengeId = ${challengeId}`

	let query = `SELECT userId, userName FROM happyhealth.usertbl where userId IN (SELECT userId FROM happyhealth.challengemembertbl where challengeId=${challengeId});`;
	db.query(query, (err, res) => {
		if (err) {
			console.log(err, ' =====> error while getting users inv');
		} else {
			console.log(res);
		}
	});
};
