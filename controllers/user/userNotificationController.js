const db = require('../../database');
const pooldb = require('../../pooldb');

const moment = require('moment');

// pooldb.getConnection((err1, conn) => {
// 	if (err1) {
// 		console.log(err1, '=====> error occured');
// 	} else {

// conn.release()
// 	}
// });

exports.getNotifications = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('inside anouncements');
			const userId = req.session.userId;
			console.log(userId);

			const nnQuery = `SELECT * FROM happyhealth.announcementstbl where  userId like '%${userId}%' order by msgDate desc ;`;

			conn.query(nnQuery, function (err, result) {
				if (err) {
					console.log(err, '======> error while getting announcments');
				} else {
					// console.log(result, '-------displaying user notifictions-----');

					res.render('userViews/notifications', {
						layout: 'layouts/userLayout',
						title: 'Announcements',
						result,
					});
				}
			});
			conn.release();
		}
	});
};

exports.dismissAnnouncement = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			let msgId = req.params.messageId;
			console.log(msgId, '=======> dismiss user notification');

			let diss = `SELECT userId FROM happyhealth.announcementstbl where messageId = ${msgId} and userId like '%${userId}%';`;
			conn.query(diss, (err, resul) => {
				if (err) {
					console.log(err, '=======> error');
				} else {
					let users = resul[0].userId.split(',');
					console.log(users, '======> before splitting');

					var userIndex = users.indexOf(`${userId}`);
					console.log(userIndex, '=========> user index');
					users.splice(userIndex, 1);
					let afterRemovingUser = users.toString();
					console.log(afterRemovingUser, '========> after removing user');

					const annTable = `update happyhealth.announcementstbl set userId = "${afterRemovingUser}"  where messageId = ${msgId}`;
					conn.query(annTable, (err, result) => {
						if (err) {
							console.log(err, 'error while updating new list');
						} else {
							console.log(result, '=====> removed user from list');

							const anCoun = `SELECT count(*) as count FROM happyhealth.announcementstbl where  userId like '%${userId}%' ;`;
							conn.query(anCoun, (err, countResult) => {
								if (err) throw err;
								else {
									console.log(countResult[0].count, '=====> unread notifs');
									req.session.annCount = countResult[0].count;
									console.log(req.session.annCount, "==========> session cunt")
									res.redirect('/notifications');
								}
							});
						}
					});
					// res.redirect('notifications')
				}
			});
			// res.redirect('/notifications')
			conn.release();
		}
	});
};

// exports.postNotifications = (req, res) => {
//     let userId = req.session.userId;
//     console.log("-------post user Notification controller");
//     let errors = [];
//     if (errors) {
//         errors.push('Please enter all fields');
//         console.log(errors, "----------------errros");
//         res.render('userViews/notifications', {
//             layout: 'layouts/userLayout',
//             title: 'Announcements'
//         });
//     }
// };

// exports.getNotifications = (req, res) => {
//     res.render('userViews/notifications', {
//         layout: 'layouts/userLayout',
//         title: 'User Management'

//     });
// };

// exports.deleteMsg = (req, res) => {
//     let messageId = req.params.messageId;
//     console.log(messageId, "deleting msg")
//     const deleteQuery = `Delete * FROM happyhealth.announcementsTbl WHERE messageId = '${messageId}'; `;
//     const deleteQuery2 = `Delete * FROM happyhealth.announcementsTbl WHERE messageId = '${messageId}';`;
//     conn.query(deleteQuery2, function (err) {
//         if (err) {
//             throw err;
//         }
//         console.log("****notifications delete2 executed started****");
//     });
//     conn.query(deleteQuery, function (err) {
//         if (err) {
//             throw err;
//         } else {
//             res.redirect('userViews/notifications');
//         }
//         console.log("****delete executed started****");
//     });

//     // var ppQuery = `Delete * FROM happyhealth.announcementsTbl;`;
//     // conn.query(ppQuery, function (err, result) {
//     //     if (err) {
//     //         console.log(err);
//     //     } else {
//     //         res.redirect('userViews/notifications', {
//     //             layout: 'layouts/userLayout',
//     //             title: 'Announcements'
//     //         });
//     //     }
//     // });
// }
