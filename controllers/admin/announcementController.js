// const db = require('../../../database');
const pooldb = require('../../pooldb');
const moment = require('moment');

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
			const aaQuery = `select * from announcementsTbl where archive=0 order by msgDate desc`;
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

			const getUsers = `select userId, userName from usertbl;`;

			conn.query(getUsers, (err, result) => {
				if (err) {
					console.log(err, '-------> error while getting users.');
				} else {
					console.log(result, '=======> users result');
					users = result;
					res.render('adminViews/adminNewAnnouncements', { layout: 'layouts/adminLayout',title: 'Announcements', users });
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
					res.render('adminViews/adminIndividualAnnouncements', { layout: 'layouts/adminLayout', title: 'Announcements', users });
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
			
			console.log(req.body, 'posted announcement');

			let title = req.body.title;
			let description = req.body.description;
			let postedDate = moment(new Date()).format('L');

			if(req.body.type === 'Post to Everyone'){
				let usersQuery = `SELECT GROUP_CONCAT(userId) as users FROM happyhealth.usertbl ;`;
				conn.query(usersQuery, (err, result) => {
					if (err) {
						console.log(err, '=======> error while searching users.');
					} else {
						console.log(result[0].users, '=====> found users.');
						let usersList = result[0].users;

						console.log(result, '============================> user list')
	
						let postAnn = `INSERT INTO announcementsTbl(title, message, userId, msgDate, archive) VALUES ("${title}", "${description}", "${usersList}", '${postedDate}', 0)`;
						
						conn.query(postAnn, (err, result) => {
							if (err) {
								console.log(err, '======> error while sending');
							} else {
								console.log(result, '========> posted annoncement');
							}
						});
					}
				});
				res.redirect('/adminAnnouncements');
	
			}else{
				console.log(req.body.type, "============> posting individual announcemnt");

				const usersList = req.body.type.toString();

				let postAnn = `INSERT INTO announcementsTbl(title, message, userId, msgDate, archive) VALUES ("${title}", "${description}", "${usersList}", '${postedDate}', 0)`;
				conn.query(postAnn, (err, result) => {
					if (err) {
						console.log(err, '======> error while sending');
					} else {
						console.log(result, '========> posted annoncement');
					}
				});

				res.redirect('/adminAnnouncements');
			}



			
			conn.release();
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
