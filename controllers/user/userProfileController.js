const db = require('../../database');
const pooldb = require('../../pooldb');
const moment = require('moment');

exports.getUserInfo = (req, res) => {
	currentDate = moment().tz('America/Chicago').format('L');

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
					console.log(result[0]);
					let { userId } = result[0];
					let userGoals = `SELECT * FROM happyhealth.usermetricstbl where userId = ${userId} and date = "04/13/2021";`;
					conn.query(userGoals, function (err, result2) {
						if (err) {
							console.log(err, '========> Errrrrr');
						} else {
							console.log(result2[0], '========> resssssssssss');
							
							let goal = result2[0];
					res.render('userViews/userInfo', {
						layout: 'layouts/userLayout',
						title: 'User Profile',
						result,
						goal
					});
					console.log('****user Info executed successfully****');
						}
					});

				}
			});
			conn.release();
		}
	});
};

exports.getUserProfile = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const homeQuery = `Select * from happyhealth.usertbl where UserId = ${userId};`;
			conn.query(homeQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db user table result');
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
						state,
					} = result[0];
					let [firstName, lastName] = fullName.split(',');
					console.log(
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
					);
					res.render('userViews/userProfile', {
						layout: 'layouts/userLayout',
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
						state,
					});
				}
			});
			conn.release();
		}
	});
};

exports.postUserProfile = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('****post user profile *********');
			let userId = req.session.userId;
			console.log(req.body, '---------req.body');
			let {
				firstName,
				lastName,
				gender,
				dateOfBirth,
				age,
				email,
				currentWeight,
				desiredWeight,
				height,
				country,
				state,
			} = req.body;
			let fullName = firstName + ',' + lastName;
			console.log(
				fullName,
				gender,
				dateOfBirth,
				age,
				email,
				currentWeight,
				desiredWeight,
				height,
				country,
				state
			);
			height = +height;
			console.log(height, '--------int height');
			const [year, month, date] = dateOfBirth.split('-');
			dateOfBirth = month + '/' + date + '/' + year;
			let errors = [];
			if (
				!fullName ||
				!gender ||
				!dateOfBirth ||
				!age ||
				!email ||
				!currentWeight ||
				!desiredWeight ||
				!height ||
				!country ||
				!state
			) {
				errors.push('Please enter all fields');
				res.render('userViews/userProfile', {
					layout: 'layouts/userLayout',
					title: 'User Profile',
					fullName,
					email,
					fullName,
					gender,
					dateOfBirth,
					age,
					currentWeight,
					desiredWeight,
					height,
					country,
					state,
					errors,
				});
			}
			const profileQuery = `UPDATE happyhealth.usertbl
			SET email = '${email}', fullName = '${fullName}',gender='${gender}',dateOfBirth='${dateOfBirth}',age='${age}',
			currentWeight='${currentWeight}',desiredWeight='${desiredWeight}',height='${height}',country='${country}',state='${state}'
			WHERE userId = '${userId}';`;
			conn.query(profileQuery, function (err, result) {
				if (err) {
					console.log(err, '------profile update error');
				} else {
					res.redirect('/userInfo');
				}
			});
			conn.release();
		}
	});
};
