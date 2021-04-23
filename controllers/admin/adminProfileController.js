// const db = require('../../database');
const pooldb = require('../../pooldb');

exports.getUserInfo = (req, res) => {

	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.session.userId;
			console.log(`**********  ${userId}   ***********`);
			const query = `SELECT * FROM happyhealth.usertbl where userId = ${userId};`;
			conn.query(query, function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log(result);
					res.render('adminViews/adminInfo', {
						layout: 'layouts/adminLayout',
						title: 'User Profile',
						result
					});
					console.log('****getAdminUserName executed successfully****');
				}
			});
			conn.release();
		}
	});
};




exports.getAdminUserName = (req, res) => {

	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.session.userId;
			console.log(`**********  ${userId}   ***********`);
			const query = `SELECT * FROM happyhealth.usertbl where userId = ${userId};`;
			conn.query(query, function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log(result, '--------db admin table result');
					const {
						userName,
						admin,
						email,
						fullName,
						gender,
						dateOfBirth,
						age,
						currentWeight,
						desiredWeight,
						height,
						country,
						state
					} = result[0];
					let [firstName, lastName] = fullName.split(' ');
					console.log(userName, admin, email, firstName, lastName, gender, dateOfBirth, age, currentWeight, desiredWeight, height, country, state);
					res.render('adminViews/adminProfile', {
						layout: 'layouts/adminLayout',
						title: 'User Profile',
						userName,
						admin,
						email,
						firstName,
						lastName,
						gender,
						dateOfBirth,
						age,
						currentWeight,
						desiredWeight,
						height,
						country,
						state
					});
				}
			});

			conn.release();
		}
	});
};