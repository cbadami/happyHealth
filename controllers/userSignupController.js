const db = require('../database');
const pooldb = require('../pooldb')
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log(`inside get method of user signup`);
			res.render('userViews/userSignup', {
				layout: 'layouts/mainLayout',
				title: 'User Signup',
			});
			conn.release();
		}
	});
};

exports.postSignup = (req, res) => {
	pooldb.getConnection(async (err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const { username, email, password, password2 } = req.body;
			let errors = [];
			let success_msg;
			if (!username || !email || !password || !password2) {
				errors.push({
					msg: 'Please enter all fields',
				});
			} else {
				if (username.length > 12) {
					errors.push({
						msg: 'Username must be between 6 and 12 characters',
					});
				} else if (username.length < 6) {
					errors.push({
						msg: 'Username must be between 6 and 12 characters',
					});
				}

				if (password.length > 15) {
					errors.push({
						msg: 'Password must be below 15 characters',
					});
				} else if (password.length < 8) {
					errors.push({
						msg: 'Password must be at least 8 characters',
					});
				}

				if (email.length > 50) {
					errors.push({
						msg: 'Email id must be below 50 characters',
					});
				}

				if (password != password2) {
					errors.push({
						msg: 'Passwords not matched',
					});
				}
			}

			console.log(`before errors ${errors} length: ${errors.length}`);
			if (errors.length > 0) {
				res.render('userViews/userSignup', {
					layout: 'layouts/mainLayout',
					title: 'User Signup',
					errors,
					username,
					email,
					password,
					password2,
				});
				return;
			}
			console.log(`after errors fixed: ${errors} length ${errors.length}`);

			const hashPassword = await bcrypt.hash(password, 12);

			console.log(hashPassword, '--------hashpassword');
			const insertQuery = `INSERT INTO  happyhealth.usertbl(userName,password,email,admin) values(
				'${username}','${hashPassword}','${email}','No');`;

			conn.query(insertQuery, function (err, result) {
				if (err) {
					console.log(`${err}`);
					let str = err.message;
					if (str.includes('userName')) {
						errors.push({
							msg: 'Username already taken',
						});
						res.render('userViews/userSignup', {
							layout: 'layouts/mainLayout',
							title: 'User Signup',
							errors,
							username,
							email,
							password,
							password2,
						});
						return;
					} else if (str.includes('email')) {
						errors.push({
							msg: 'Email id already registered',
						});
						res.render('userViews/userSignup', {
							layout: 'layouts/mainLayout',
							title: 'User Signup',
							errors,
							username,
							email,
							password,
							password2,
						});
						return;
					}
				} else {
					console.log('******User registered Sucessfully********');
					success_msg = 'Register sucessful';
					req.session.success_msg = success_msg;
					res.redirect('/');
				}
			});
			conn.release();
		}
	});
};
