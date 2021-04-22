const db = require('../../database');
const pooldb = require('../../pooldb');

exports.getUserManagement = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.session.userId;
			console.log(`User ID: ${userId}`, '--------getUserManagement controller');
			const allUsersQuery = `SELECT * FROM happyhealth.usertbl WHERE userId <> ${userId}`;
			conn.query(allUsersQuery, function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log(`${JSON.stringify(result)}`, '------------db users result');
					res.render('adminViews/userManagement', {
						layout: 'layouts/adminLayout',
						title: 'User Management',
						result,
					});
					console.log('****getUserManagement executed successfully****');
				}
			});

			conn.release();
		}
	});
};

exports.getUserInfo = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.params.userId;

			console.log(`**********  ${userId}   ***********`);

			const query = `SELECT * FROM happyhealth.usertbl where userId = ${userId};`;

			conn.query(query, function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log(result);
					res.render('adminViews/adminUserInfo', {
						layout: 'layouts/adminLayout',
						title: 'User Profile',
						result,
					});
					console.log('****getAdminUserName executed successfully****');
				}
			});

			conn.release();
		}
	});
};

exports.editUser = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('Get Edit data executed');
			const userId = req.params.userId;
			const body = req.body;
			var editQuery = `SELECT * FROM happyhealth.usertbl WHERE UserId = ${userId}`;
			conn.query(editQuery, function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log(result);
					res.render('editProfile', {
						result,
					});
					console.log('****editUser executed successfully****');
				}
			});

			conn.release();
		}
	});
};

exports.updateUser = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log(req.body);

			const userId = req.params.userId;
			const userName = req.body.userName;
			const email = req.body.email;
			const password = req.body.password;

			const updateQuery = `UPDATE happyhealth.usertbl SET Password = '${password}', Email = '${email}', Username = '${userName}' WHERE UserId = ${userId};`;

			conn.query(updateQuery, function (err, result) {
				if (err) {
					throw err;
					return;
				}
				res.redirect('../userManagement');
				console.log('****updateUser executed successfully****');
			});

			conn.release();
		}
	});
};

exports.deleteUser = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('****delete executed started****');
			const userId = req.params.userId;
			console.log(userId);
			const deleteQuery = `Delete FROM happyhealth.USERtbl WHERE UserId = ${userId}; `;
			// const deleteQuery1 = `Delete FROM happyhealth.groupmembertbl WHERE UserId = '${userId}';`;
			// const deleteQuery2 = `Delete FROM happyhealth.usermetricstbl WHERE UserId = '${userId}';`;
			conn.query(deleteQuery, function (err) {
				if (err) {
					throw err;
				}
				res.redirect('/userManagement');
				console.log('****delete2 executed started****');
			});
			// conn.query(deleteQuery, function (err) {
			// 	if (err) {
			// 		throw err;
			// 	} else {
			// 		res.redirect('/userManagement');
			// 	}
			// 	console.log('****delete executed started****');
			// });
			conn.release();
		}
	});
};
