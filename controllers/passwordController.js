// const db = require('../database');
const pooldb = require('../pooldb');
const bcrypt = require('bcryptjs');

exports.getForgotPassword = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			res.render('forgotPassword', {
				layout: 'layouts/mainLayout',
				title: 'Forgot Password',
			});
			conn.release();
		}
	});
};

exports.postForgotPassword = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			conn.release();
		}
	});

	const { email } = req.body;
	let errors = [];
	if (!email) {
		errors.push({ msg: 'Please enter email id' });
	}
	if (errors.length > 0) {
		res.render('forgotPassword', {
			layout: 'layouts/mainLayout',
			title: 'Forgot Password',
			errors,
			email,
		});
	} else {
		const queryString = `SELECT * FROM happyhealth.usertbl WHERE email = '${email}' Limit 1 `;
		conn.query(queryString, function (err, result) {
			console.log(`forgot password ${JSON.stringify(result)}`);
			if (result.length > 0) {
				console.log(`under forgot password page ${JSON.stringify(result[0].email)}`);
				const userId = result[0]['userId'];
				const userEmail = result[0]['email'];
				req.session.userId = userId;
				req.session.userEmail = userEmail;
				console.log(`--------- forgot page executed sucessfully`);
				res.redirect('validationPage');
			} else {
				errors.push({ msg: 'Email id not registered' });
				res.render('forgotPassword', {
					layout: 'layouts/mainLayout',
					title: 'Forgot Password',
					errors,
					email,
				});
			}
		});
	}
};

exports.getResetPassword = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			conn.release();
		}
	});

	const userId = req.session.userId;
	console.log(`under get reset password ${userId}`);
	res.render('resetPassword', { layout: 'layouts/mainLayout', title: 'Reset Password' });
};

exports.postResetPassword = async (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			conn.release();
		}
	});

	// console.log(req.body, "================> POSTTING RESET PASSWORD")
	const userId = req.session.userId;
	const { password, password2 } = req.body;
	let errors = [];
	let success_msg;
	if (!password || !password2) {
		errors.push({ msg: 'Please enter all fields' });
	} else {
		if (password.length > 15) {
			errors.push({ msg: 'Password must be below 15 characters' });
		} else if (password.length < 8) {
			errors.push({ msg: 'Password must be at least 8 characters' });
		}
		if (password != password2) {
			errors.push({ msg: 'Passwords not matched' });
		}
	}

	if (errors.length > 0) {
		res.render('resetPassword', {
			layout: 'layouts/mainLayout',
			title: 'Reset Password',
			errors,
			password,
			password2,
		});
	} else {
		const hashPassword = await bcrypt.hash(password, 12);
		console.log(hashPassword, '--------hashpassword');

		const updateQuery = `UPDATE happyhealth.usertbl
            SET 
                password = '${hashPassword}'
            WHERE
                userId = '${userId}';`;
		conn.query(updateQuery, function (err, result) {
			if (err) console.log(`${err}`);
			console.log('1 record updated');
			success_msg1 = 'Password changed sucessfully';
			req.session.success_msg = success_msg1;
			res.redirect('/');
		});
	}
};

const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const { response } = require('express');

// const { google } = require('googleapis');

// async function sendEmail( userEmail, generateCode ) {
// 	console.log(userEmail, generateCode , "=========> USER MAIL and code")

//   try {
//     let accessToken = await oAuth2Client.getAccessToken();
// 	console.log(accessToken,"=====> access token")
//     const transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: 'happyhealthgdp@gmail.com',
// 		pass: 'happyhealthgdp123',
//         clientId: CLIENT_ID,
//         clientSecret: CLEINT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: 'happyhealthgdp@gmail.com',
//       to: userEmail,
//       subject: 'OTP to reset your password',
//       text: `OTP to reset your account: ${generateCode}`,
//       html: `<p> Your OTP to reset your account: ${generateCode} </p>`,
//     };

// 	transport.sendMail(mailOptions,(err,result)=>{
// 		if(err){
// 			console.log(err, "=====> mail not sent")
// 		}else{
// 			console.log(result, "=======> mail sent")
// 		}
// 	});

//     // const result = await transport.sendMail(mailOptions);
//     // return result;
//   } catch (error) {
// 	console.log(error, "========> ERROR OCCUREDD")
// }
// }

async function sendEmail(userEmail, generateCode) {
	console.log(API_KEY, '=============> API KEY ..........');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const message = {
		to: userEmail,
		from: 'fitnestgdp@gmail.com',
		subject: 'Happy Health reset account',
		text: `OTP to reset your account: ${generateCode} `,
		html: `<p> Your OTP to reset your account:  ${generateCode}</p>`,
	};

	sgMail
		.send(message)
		.then((respon) => {
			console.log(respon, '========> sent');
		})
		.catch((err) => {
			console.log(err, '=====> error while sending');
		});
}

exports.getValidation = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			// const errors = req.errors;
			const userId = req.session.userId;
			const userEmail = req.session.userEmail;
			console.log(`under get validation page ${userEmail}`);
			generateCode = Math.floor((Math.random() + 1) * 100000);
			console.log(`Generated code: ${generateCode}`);
			sendEmail(userEmail, generateCode);
			res.render('validationPage', { layout: 'layouts/mainLayout', title: 'Validation User' });
			conn.release();
		}
	});
};

exports.postValidation = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.session.userId;
			var userEmail = req.session.userEmail;
			const code = req.body.code;
			const resend = req.body.resend;

			console.log(`under post validation page ${userId}`);
			console.log(`under post validation page code: ${code}`);
			console.log(`under post validation page resend: ${resend}`);
			let errors = [];

			if (resend == 'Resend') {
				generateCode = Math.floor((Math.random() + 1) * 100000);
				console.log(`Generated code: ${generateCode}`);
				sendEmail(userEmail, generateCode);
				res.render('validationPage', { layout: 'layouts/mainLayout', title: 'Validation User' });
			} else {
				if (!code) {
					errors.push({ msg: 'Enter verification code' });
				} else if (code != generateCode) {
					errors.push({ msg: 'Invalid verification code' });
				}
				if (errors.length > 0) {
					res.render('validationPage', {
						layout: 'layouts/mainLayout',
						title: 'Validation User',
						errors,
					});
				} else {
					res.redirect('/resetPassword');
				}
			}
			conn.release();
		}
	});
};
