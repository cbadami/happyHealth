// const db = require('../../../database');
const pooldb = require('../../pooldb');
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
const { reject } = require('async');

////////////////////////////
// pooldb.getConnection((err1, conn) => {
// 	if (err1) {
// 		console.log(err1, '=====> error occured');
// 	} else {
// 		conn.release();
// 	}
// });

exports.getAdminAnnouncements = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('***** Admin Announcements started ******');
			const messageId = req.session.messageId;
			console.log(messageId);
			const aaQuery = `select * from announcementsTbl where archive=0 order by messageId desc`;
			conn.query(aaQuery, function (err, result) {
				if (err) {
					console.log(err, '*****error while getting admin announcments*****');
				} else {
					// console.log(result, '****getAdminAnnouncements executed successfully****');

					res.render('adminViews/adminAnnouncements', {
						layout: 'layouts/adminLayout',
						title: 'Announcements',
						result,
					});
				}
			});

			conn.release();
		}
	});
};

exports.postAdminAnnouncements = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('=========> posting announcement');
			let messageId = req.session.messageId;

			let usersQuery = `SELECT userId FROM happyhealth.usertbl;`;
			conn.query(usersQuery, (err, result) => {
				if (err) {
					console.log(err, '=======> error while searching users.');
				} else {
					console.log(result, '=====> found users.');
				}
			});

			// const {
			//     title,
			//     message,
			//     userId
			// } = req.body;
			// console.log("-------post Admin Announcements controller");
			// let errors = [];
			// if (!title || !message) {
			//     errors.push('Please enter all fields!');
			//     console.log(errors, "****error while posting admin announcments****");
			//     res.render('adminViews/adminAnnouncements', {
			//         layout: 'layouts/adminLayout',
			//         title: 'Announcements'
			//     });
			// }
			// var aaQuery = `UPDATE happyhealth.announcementsTbl SET title = '${title}', message = '${message}', userId = ${userId} WHERE messageId = ${messageId};`;
			// conn.query(aaQuery, function (error, result) {
			//     if (error) {
			//         console.log(error);
			//     } else {
			//         res.redirect('adminViews/adminAnnouncements');
			//     }
			// });

			conn.release();
		}
	});
};

// exports.getAdminAnnouncements = (req, res) => {
//     res.render('adminViews/adminAnnouncements', {
//         layout: 'layouts/adminLayout',
//         title: 'Admin Announcements'
//     });
//     console.log('****getAdminAnnouncements executed successfully****');
// };

exports.getAdminNewAnnouncements = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('***** Page to create new announcements******');

			const getUsersAndChallenges = `select userId, userName from usertbl; SELECT * FROM happyhealth.challengetbl;`;

			conn.query(getUsersAndChallenges, [1, 2], (err, result) => {
				if (err) {
					console.log(err, '-------> error while getting users.');
				} else {
					// console.log(result, '=======> users result');
					users = result[0];
					challenges = result[1];
					res.render('adminViews/adminNewAnnouncements', {
						layout: 'layouts/adminLayout',
						title: 'Announcements',
						users,
						challenges,
					});
				}
			});

			// const aaQuery = `Insert (title, message, msgDate, userId) from happyhealth.announcementsTbl VALUES (${title}, ${message}, ${msgDate}, ${userId});`;
			// conn.query(aaQuery, function (err, result) {
			//     if (err) {
			//         console.log(err, "*****error while getting admin announcments*****");
			//     } else {
			//         console.log(result, '****getAdminAnnouncements executed successfully****');

			//         res.render('adminViews/adminAnnouncements', {
			//             layout: 'layouts/adminLayout',
			//             title: 'Announcements',
			//             result
			//         });
			//     }
			// });

			conn.release();
		}
	});
};

exports.getAdminIndividualAnnouncements = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('***** Page to create individual announcements******');

			const getUsers = `select userId, userName from usertbl;`;

			conn.query(getUsers, (err, result) => {
				if (err) {
					console.log(err, '-------> error while getting users.');
				} else {
					console.log(result, '=======> users result');
					users = result;
					res.render('adminViews/adminIndividualAnnouncements', {
						layout: 'layouts/adminLayout',
						title: 'Announcements',
						users,
					});
				}
			});
			conn.release();
		}
	});
};

exports.postAnnouncement = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			conn.release();

			let title = req.body.title;
			let description = req.body.description;
			let postedDate = moment(new Date()).format('L');

			console.log(req.body, 'posted announcement');

			if (req.body.userType === 'Send to Everyone' || req.body.userType === 'Send Selected Individuals') {
				// console.log(req.body.type, "============> Type announcemnt");

				const usersList = req.body.users.toString();
				let postAnn = `INSERT INTO announcementsTbl(title, message, userId, msgDate, archive) VALUES ("${title}", "${description}", "${usersList}", '${postedDate}', 0)`;

				conn.query(postAnn, (err, result) => {
					if (err) {
						console.log(err, '======> error while sending');
					} else {
						console.log(result, '========> posted annoncement');

						let mailUsers = `SELECT userId, email,admin FROM happyhealth.usertbl having userId in (${usersList}) UNION  SELECT userId, email,admin FROM happyhealth.usertbl where admin = "yes";`;
						conn.query(mailUsers, (err, result) => {
							if (err) throw err;
							else {
								console.log(result, '====> retreived mail ids');

								let userMailIds = [];
								let adminMailIds = [];
								result.map((res) => {
									if (res.admin === 'Yes') adminMailIds.push(res.email);
									else userMailIds.push(res.email);
								});

								console.log(userMailIds, '======> user mails');
								console.log(adminMailIds, '======> admin mails');

								sgMail.setApiKey(process.env.CUSTOMCONNSTR_SENDGRID_API_KEY);
								const msg = {
									to: userMailIds,
									bcc: adminMailIds,
									from: 'fitnestgdp@outlook.com',
									subject: `Well hub announcement`,
									text: `You've got a new inivtaion to  below is the link to login to the applicaiton`,
									html: `<h3>${title}</h2> <br>  <p> ${description}</p> <br> <a href="https://cb-test-health-app-dev-test.azurewebsites.net/">Well hub Login </a> `,
								};
								sgMail
									.sendMultiple(msg)
									.then((success) => {
										console.log(success, '==> sent');
									})
									.catch((notsent) => {
										notsent, '==> not sent';
									});
							}
						});
					}
				});

				res.redirect('/adminAnnouncements');
			}

			if (req.body.userType === 'Send to All Groups' || req.body.userType === 'Send Selected Groups') {
				let selectedChallenges = req.body.challenge.toString();
				console.log(selectedChallenges, '=======> sdkjb');
				let getUsers = `SELECT distinct userId, challengeId FROM happyhealth.challengemembertbl having challengeId in (${selectedChallenges}) order by userId;`;
				conn.query(getUsers, (err, usersResult) => {
					if (err) {
						console.log(err, '=======> error while getting users');
					} else {
						// console.log(usersResult, '======> users');
						let jusers = [];
						usersResult.map((user) => {
							jusers.push(user.userId);
						});
						console.log(usersResult, '===============================sldjnv');

						var unique = jusers.filter((v, i, a) => a.indexOf(v) === i);
						let usersList = unique.toString();
						console.log(usersList, '===========> jusers');

						let postAnn = `INSERT INTO announcementsTbl(title, message, userId,seenUsers, msgDate, archive) VALUES ("${title}", "${description}", "${usersList}",' ','${postedDate}', 0)`;

						conn.query(postAnn, (err, result) => {
							if (err) {
								console.log(err, '======> error while sending');
							} else {
								console.log(result, '========> posted annoncement');

								let mailUsers = `SELECT userId, email,admin FROM happyhealth.usertbl having userId in (${usersList}) UNION  SELECT userId, email,admin FROM happyhealth.usertbl where admin = "yes";`;
								conn.query(mailUsers, (err, result) => {
									if (err) throw err;
									else {
										console.log(result, '====> retreived mail ids');

										let userMailIds = [];
										let adminMailIds = [];
										result.map((res) => {
											if (res.admin === 'Yes') adminMailIds.push(res.email);
											else userMailIds.push(res.email);
										});

										console.log(userMailIds, '======> user mails');
										console.log(adminMailIds, '======> admin mails');

										sgMail.setApiKey(process.env.CUSTOMCONNSTR_SENDGRID_API_KEY);
										const msg = {
											to: userMailIds,
											bcc: adminMailIds,
											from: 'fitnestgdp@outlook.com',
											subject: `Well hub announcement`,
											text: `You've got a new inivtaion to  below is the link to login to the applicaiton`,
											html: `<h3>${title}</h2> <br>  <p> ${description}</p> <br> <a href="https://cb-test-health-app-dev-test.azurewebsites.net/">Well hub Login </a> `,
										};
										sgMail
											.sendMultiple(msg)
											.then((success) => {
												console.log(success, '==> sent');
											})
											.catch((notsent) => {
												notsent, '==> not sent';
											});
									}
								});
							}
						});

						res.redirect('/adminAnnouncements');
					}
				});
			}
		}
	});
};

exports.deleteAnnouncement = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let aid = req.params.aid;
			console.log(aid, '+============> deleting annoucnement');

			let deleteAnnoun = `UPDATE happyhealth.announcementstbl set archive = 1 where messageId=${aid};`;

			conn.query(deleteAnnoun, (err, result) => {
				if (err) {
					console.log(err, '===> error while deleting announcemtn');
				} else {
					console.log(result, '==========> deleted successfully');
				}

				res.redirect('/adminAnnouncements');
			});

			conn.release();
		}
	});
};

exports.editAnnouncement = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let aid = req.params.aid;

			//const getAnnouncement = `SELECT a.*, CONCAT( COALESCE(a.userId), ',', COALESCE(a.seenUsers)) AS sentUsers FROM   happyhealth.announcementstbl a  where messageId = ${aid};`;
			const getAnnouncement = `SELECT a.*, CONCAT(COALESCE(a.userId,''),',',COALESCE(a.seenUsers,'')) AS sentUsers FROM   happyhealth.announcementstbl a  where messageId = ${aid};`;

			conn.query(getAnnouncement, (err, announcementResult) => {
				console.log(announcementResult, '===> announcement');

				let sentUsers = announcementResult[0].sentUsers;
				sentUsers = sentUsers.toString().replace(/^,|,$/g, '');
				console.log(sentUsers, typeof sentUsers, '==befores');

				var getSentUsersDetails = '';

				if (sentUsers.length == 0) {
					getSentUsersDetails = 'SELECT * FROM happyhealth.usertbl;';
				} else {
					getSentUsersDetails = `SELECT * FROM happyhealth.usertbl having userid  in (${sentUsers});`;
				}

				let mailedUsers = [];
				let notMailedUsers = [];

				conn.query(getSentUsersDetails, (err, sentResult) => {
					console.log(sentResult, '==> sent users');
					sentResult.map((s) => {
						mailedUsers.push(s.email);
					});

					const notSentUsersQuery = `SELECT * FROM happyhealth.usertbl having userId not in (${sentUsers});`;
					conn.query(notSentUsersQuery, (err, notSentResult) => {
						console.log(notSentResult, '===> not sent users.');
						notSentResult.map((ns) => {
							notMailedUsers.push(ns.email);
						});

						// console.log(mailedUsers, '==> mailed users');
						// console.log(notMailedUsers, '==> not mailed usrs');

						res.render('adminViews/editAnnouncement', {
							layout: 'layouts/adminLayout',
							title: 'Manage Announcnements',
							announcementResult,
							sentResult,
							notSentResult,
						});
					});
				});
			});
		}
	});
};

