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

			const nnQuery = `SELECT * FROM happyhealth.announcementstbl where  userId like '%${userId}%' order by messageId desc ;`;

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

					console.log(resul,"==========> resul")
					console.log(resul[0].length, "===============> seen users")

					let users = resul[0].userId.split(',');
					let seenUsers = [];

					if(resul[0].seenUsers === undefined){
							console.log(resul[0].seenUsers, "===============> seen users")
					}else{
						console.log("=========> dude there are no seen users.")


					}

					// let seenUsers = resul[0].seenUsers.split(',')

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

exports.viewNotification = (req,res)=>{
	console.log("user is viewing ")

	

}