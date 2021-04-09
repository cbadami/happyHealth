// const db = require('../../database');
const pooldb = require('../../pooldb');
const moment = require('moment');

exports.getChallengeManagement = (_req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const viewChallengesQuery = `SELECT * FROM happyhealth.challengetbl`;
			return conn.query(viewChallengesQuery, function (err, result) {
				if (err) throw err;
				else {
					return res.render('adminViews/challengeManagement', {
						layout: 'layouts/adminLayout',
						result,
						title: 'Challenge Management',
					});
				}
			});

			conn.release();
		}
	});
};

exports.addChallenge = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log(req.body, '===============> ADD CHALLENGE DATA');
			let { name, description, userId, startDate, endDate } = req.body;

			let users = '';
			const getUsers = `select userId, userName from usertbl;`;

			conn.query(getUsers, (err, result) => {
				if (err) {
					console.log(err, '-------> error while getting users.');
				} else {
					console.log(result, '=======> users result');
					users = result;
					res.render('adminViews/addChallenge', { layout: 'layouts/adminLayout', users });
				}
			});

			conn.release();
		}
	});
};

exports.editChallenge = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let cid = req.params.cid;

			const viewChallengesQuery = `SELECT * FROM happyhealth.challengetbl WHERE challengeId =  ${cid}`;
			return conn.query(viewChallengesQuery, function (err, result) {
				if (err) throw err;
				else {
					console.log(result);
					return res.render('adminViews/editChallenge', { result, layout: 'layouts/adminLayout' });
				}
			});
			// conn.release();
		}
	});
};

exports.updateChallenge = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let cid = req.params.cid;
			console.log(req.body, '==============> COMPLETE DATA');
			let { name, description, challengeType, CT, startDate, SD, endDate, ED } = req.body;

			console.log(startDate, '===============> StartDate');
			console.log(SD, '===========> SD');

			if (challengeType == undefined) {
				challengeType = CT;
			}

			if (startDate == '') {
				startDate = SD;
			}

			if (endDate == '') {
				endDate = ED;
			}

			challengeType = challengeType;
			startDate = moment(startDate).format('L');
			endDate = moment(endDate).format('L');
			console.log(name, description, challengeType, startDate, endDate, '----------updated values');

			const updateQuery = `UPDATE happyhealth.challengetbl SET challengeName =  '${name}' , challengeDescription = '${description}', challengeType= '${challengeType}', startDate='${startDate}', endDate= '${endDate}' where challengeId = ${cid}`;
			conn.query(updateQuery, function (err, result) {
				if (err) throw err;
				else {
					console.log(result, '=======>Successfully updated');
					// return res.render('adminViews/challengeManagement', {result, layout: "layouts/adminLayout" })
					res.redirect('/challengeManagement');
				}
			});

			conn.release();
		}
	});
};

exports.deleteChallenge = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let cid = req.params.cid;

			const deleteQuery = `DELETE from happyhealth.challengetbl where challengeId = ${cid} `;
			conn.query(deleteQuery, function (err, result) {
				if (err) throw err;
				else {
					console.log(result, '======>Successfully deleted');
					res.redirect('/challengeManagement');
				}
			});

			conn.release();
		}
	});
};

exports.postChallenge = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log(req.body, '----------adding post challenge');
			let { name, description, challengeType, userId, startDate, endDate } = req.body;

			challengeType = challengeType.toString();
			startDate = moment(startDate).format('L');
			endDate = moment(endDate).format('L');
			console.log(name, description, challengeType, startDate, endDate, '----------dates');
			const insert = `INSERT INTO happyhealth.challengetbl (challengeName, challengeDescription, challengeType , startDate, endDate) VALUES('${name}', '${description}', '${challengeType}' , '${startDate}', '${endDate}'); `;

			conn.query(insert, (err, result) => {
				if (err) throw err;
				else {
					console.log('Successfully added challenge to db');
				}
			});

			const getLastRow = `SELECT * FROM happyhealth.challengetbl ORDER BY challengeId DESC LIMIT 1;`;

			conn.query(getLastRow, (err, result) => {
				if (err) {
					console.log(err, '=====> unable to get last row');
				} else {
					lastAddedChallengeId = result[0].challengeId;

					//What values to insert into challengemember table
					let values = '';
					for (let i = 0; i < userId.length; i++) {
						values += `(${lastAddedChallengeId}, ${userId[i]}, 0, 0 ),`;
					}
					values = values.slice(0, -1);
					console.log(values, '============> VALUES ');

					// ADD USER INTO challengemembertbl
					const addUsersQuery = `INSERT INTO happyhealth.challengemembertbl(challengeId, userId, activeUser, archive) values ${values}; `;
					conn.query(addUsersQuery, (err, result) => {
						if (err) {
							console.log(err, 'error while inviting users');
						} else {
							console.log(result, '=======> invited users');
						}
					});
				}
			});
			res.redirect('/challengeManagement');

			conn.release();
		}
	});
};

// exports.getChallengeUsers = async (req, res) => {
// 	let challengeId = req.params.challengeId;
// 	console.log(challengeId, '--------challenge Id');
// 	let joinedUsers = (notJoinedUsers = challengeData = '');
// 	const usersQuery = `SELECT userId, userName FROM happyhealth.usertbl where userId IN (SELECT userId FROM happyhealth.challengemembertbl where challengeId=${challengeId});`;
// 	await conn.query(usersQuery, (err, result) => {
// 		if (err) throw err;
// 		else {
// 			console.log(result, '----------------userQuery challenge result');
// 			joinedUsers = result;
// 		}
// 	});
// 	const notUsersQuery = `SELECT userId, userName FROM happyhealth.usertbl where userId NOT IN (SELECT userId FROM happyhealth.challengemembertbl where challengeId=${challengeId});`;
// 	await conn.query(notUsersQuery, (err, result) => {
// 		if (err) throw err;
// 		else {
// 			console.log(result, '------------notUsersQuery result');
// 			notJoinedUsers = result;
// 		}
// 	});

// 	const challengeQuery = `select * from happyhealth.challengetbl where challengeId =${challengeId}`;
// 	await conn.query(challengeQuery, (err, result) => {
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

exports.getChallengeUsers = (req, res) => {
	pooldb.getConnection(async (err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let challengeId = req.params.challengeId;
			let joinedUsers = (notJoinedUsers = challengeData = '');

			let joinedQuery = `SELECT challengemembertbl.userId, userName, challengemembertbl.challengeId, challengeName, activeUser FROM challengemembertbl INNER JOIN challengetbl ON challengemembertbl.challengeId = challengetbl.challengeId INNER JOIN usertbl on challengemembertbl.userId=usertbl.userId WHERE challengemembertbl.challengeId=${challengeId};`;
			await conn.query(joinedQuery, (err, result) => {
				if (err) {
					console.log(err, '=======> error getChallengeUsers');
					conn.release();
					return;
				} else {
					console.log(result, '============> result getChallengeUsers');
					joinedUsers = result;
				}
			});

			const notJoinedQuery = `SELECT userId, userName FROM happyhealth.usertbl where userId NOT IN (SELECT userId FROM happyhealth.challengemembertbl where challengeId=${challengeId});`;
			await conn.query(notJoinedQuery, (err, result) => {
				if (err){
					console.log(err,"-----------error")
					conn.release();
					return;
				}
				else {
					console.log(result, '------------notUsersQuery result');
					notJoinedUsers = result;
				}
			});

			const challengeQuery = `select * from happyhealth.challengetbl where challengeId =${challengeId}`;
			await conn.query(challengeQuery, (err, result) => {
				if (err){
					console.log(err,"-----------error")
					conn.release();
					return;
				}
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

					console.log(notJoinedUsers.length, "========> not joined users")
				}
			});

		}
	});
};

exports.addUserToChallenge = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {

			let userId = req.body.userId;
			let challengeId = req.params.challengeId;
			let joinedDate = moment(new Date()).format('L');
			console.log(userId , challengeId );

			let values = '';
			for(let i=0;i<userId.length;i++) {
				console.log( userId[i], "====> "  )
				values += `(${userId[i]},"${joinedDate}",${challengeId},0,0),`
			}
			values = values.slice(0,-1);
			console.log(values)

			let addUserQuery = `INSERT INTO happyhealth.challengemembertbl (userId, joinedDate, challengeId, activeUser, archive ) VALUES ${values}; `;

			conn.query(addUserQuery, (err, result) => {
				if (err) {
					console.log(err, '-------> error while adding user.');
				} else {
					console.log(result);
					res.redirect(`/getChallengeUsers/${challengeId}`);
				}
			});

			conn.release();
		}
	});
};

exports.removeUser = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.params.userId;
			let challengeId = req.params.groupId;

			console.log(userId, challengeId, ' USER AND GROUP ID');

			const deleteQuery = `DELETE from happyhealth.challengemembertbl where userId=${userId} and challengeId = ${challengeId}`;
			conn.query(deleteQuery, (err, result) => {
				if (err) {
					console.log(err, '-----------> Error while deleting');
				} else {
					console.log(result, 'deleted successfully');
					res.redirect(`/getChallengeUsers/${challengeId}`);
				}
			});

			conn.release();
		}
	});
};

exports.getChallengeUsersAdminSide = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('Inside Challenge USers');
			let userId = req.params.userId;
			let challengeId = req.params.challengeId;
			//let query = `SELECT * FROM happyhealth.challengemembertbl where userId = ${userId} and challengeId = ${challengeId}`

			let query = `SELECT userId, userName FROM happyhealth.usertbl where userId IN (SELECT userId FROM happyhealth.challengemembertbl where challengeId=${challengeId});`;
			conn.query(query, (err, res) => {
				if (err) {
					console.log(err, ' =====> error while getting users inv');
				} else {
					console.log(res);
				}
			});

			conn.release();
		}
	});
};
