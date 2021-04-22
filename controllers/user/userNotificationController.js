const pooldb = require('../../pooldb');

exports.getNotifications = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('inside anouncements');
			const userId = req.session.userId;
			console.log(userId);

			const nnQuery = `SELECT * FROM happyhealth.announcementstbl where  userId like '%${userId}%'  or seenUsers like '%${userId}%' order by messageId desc ;`;

			conn.query(nnQuery, function (err, result) {
				if (err) {
					console.log(err, '======> error while getting announcments');
				} else {
					console.log(result, '-------displaying user notifictions-----');

					let ns = result;

					let newN = [];
					let oldN = [];
					ns.map((n) => {
						if(n.seenUsers != null ){
							if (n.seenUsers.search(userId) != -1) {
								oldN.push(n);
							} else {
								newN.push(n);
							}
						}else{
							if (n.userId.search(userId) != -1) {
								newN.push(n);
							} else {
								oldN.push(n);
							}
						}
					});

					console.log(newN.length, "+=========> new ann lenght")


					// const anCoun = `SELECT count(*) as count FROM happyhealth.announcementstbl where  userId like '%${userId}%' ;`;
					// conn.query(anCoun, (err, countResult) => {
					// 	if (err) throw err;
					// 	else {
					// 		console.log(countResult[0].count, '=====> unread notifs');
					// 		req.session.annCount = countResult[0].count;
					// 		console.log(req.session.annCount, '==========> session cunt');
					// 		res.redirect('/notifications');
					// 	}
					// });

					res.render('userViews/notifications', {
						layout: 'layouts/userLayout',
						title: 'Announcements',
						newN,
						oldN
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

			let diss = `SELECT * FROM happyhealth.announcementstbl where messageId = ${msgId} and userId like '%${userId}%' or seenUsers like '%${userId}%';`;
			conn.query(diss, (err, resul) => {
				if (err) {
					console.log(err, '=======> error');
				} else {
					console.log(resul, '==========> resul');

					var users, seenUsers

					if(resul[0].userId != null) {
						users = JSON.parse('[' + resul[0].userId + ']');
					}

					if(resul[0].seenUsers != null){
						seenUsers = JSON.parse('[' + resul[0].seenUsers + ']');
					}

					console.log("UNSEEN: "+users, "SEEN: "+seenUsers, '======> before splitting');

					var userIndex = users.indexOf(userId);
					var seenIndex = seenUsers.indexOf(userId);
					console.log(userIndex, '=========> user index');
					console.log(seenIndex, '=========> user index');

					if(userIndex != -1){
						users.splice(userIndex, 1);
					}

					if(seenIndex != -1){
						seenUsers.splice(seenIndex, 1);
					}

					console.log("UNSEEN: "+users, "SEEN: "+seenUsers, '======> SPLI');


					users = users.toString();
					seenUsers = seenUsers.toString();

					console.log("UNSEEN: "+users, "SEEN: "+seenUsers, '======> AFTER SPLICING ');

					const annTable = `update happyhealth.announcementstbl set userId = "${users}", seenUsers ="${seenUsers}"  where messageId = ${msgId}`;
					conn.query(annTable, (err, result) => {
						if (err) {
							console.log(err, 'error while updating new list');
						} else {
							console.log(result, '=====> removed user from list');


							function getUnreadAnn()
							{
								return new Promise(function(resolve, reject) {
									query_str = `SELECT count(*) as annCount FROM happyhealth.announcementstbl where  userId like '%${req.session.userId}%' ;`
									conn.query(query_str, function (err, rows, fields) {
										if (err) {
											return reject(err);
										}
										resolve(rows);
									});
								});
							}
				
							getUnreadAnn().then(function(rows) {
								console.log(rows[0].annCount, "=====================> resolved data........")
								req.session.annCount = rows[0].annCount;
								res.locals.annCount =req.session.annCount;
							}).catch((err) => setImmediate(() => { throw err; })); 

						}
					});
					// res.redirect('notifications')
				}
			});
			res.redirect('/notifications')
			conn.release();
		}
	});
};

exports.viewNotification = (req, res) => {
	console.log('user is viewing ');
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			let msgId = req.params.messageId;
			console.log(msgId, '=======> dismiss user notification');

			let diss = `SELECT * FROM happyhealth.announcementstbl where messageId = ${msgId} and userId like '%${userId}%' or seenUsers like '%${userId}%';`;
			conn.query(diss, (err, resul) => {
				if (err) {
					console.log(err, '=======> error');
				} else {
					console.log(resul, '==========> resul');



					let users = JSON.parse('[' + resul[0].userId + ']');
					let seenUsers = [];
					console.log(users, '======> before splitting');

					var userIndex = users.indexOf(userId);
					console.log(userIndex, '=========> user index');

					if (userIndex != -1) {
						users.splice(userIndex, 1);
					}
					console.log(users, 'After splicing************8')

					if (resul[0].seenUsers != null) {
						console.log(resul[0].seenUsers, '===============> seen users');
						seenUsers = JSON.parse('[' + resul[0].seenUsers + ']');
						seenUsers.push(userId);
						seenUsers = seenUsers.filter(function (item, pos) {
							return seenUsers.indexOf(item) == pos;
						});
						console.log(users, seenUsers, '===============>SEEEEE IF');
					} else {
						console.log(resul[0].seenUsers, '=========> dude there are no seen users.');
						seenUsers.push(userId);
						seenUsers = seenUsers.filter(function (item, pos) {
							return seenUsers.indexOf(item) == pos;
						});
						console.log(users, seenUsers, '===============>SEEEEEEEEEEEE  ELSE');
					}

					users = users.toString();
					seenUsers = seenUsers.toString();

					console.log(
						'UNSEEN: ' + users,
						' SEEN: ' + seenUsers,
						'========> after moving from one array to another.'
					);

					const annTable = `update happyhealth.announcementstbl set userId = "${users}" , seenUsers ="${seenUsers}"  where messageId = ${msgId}`;
					conn.query(annTable, (err, result) => {
						if (err) {
							console.log(err, 'error while updating new list');
						} else {
							console.log(result, '=====> removed user from list');

							function getUnreadAnn()
							{
								return new Promise(function(resolve, reject) {
									query_str = `SELECT count(*) as annCount FROM happyhealth.announcementstbl where  userId like '%${req.session.userId}%' ;`
									conn.query(query_str, function (err, rows, fields) {
										if (err) {
											return reject(err);
										}
										resolve(rows);
									});
								});
							}
				
							getUnreadAnn().then(function(rows) {
								console.log(rows[0].annCount, "=====================> resolved data........")
								req.session.annCount = rows[0].annCount;
								res.locals.annCount =req.session.annCount;
								console.log("DEcreasing the anncount")
							}).catch((err) => setImmediate(() => { throw err; })); 


						}
					});

					

				}
			});
			conn.release();
		}
	});
};
