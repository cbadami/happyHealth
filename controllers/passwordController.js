const db = require('../database');
const bcrypt = require('bcryptjs')


exports.getForgotPassword = (req, res) => {
  res.render('forgotPassword', {
    layout: 'layouts/mainLayout', title: 'Forgot Password'
  });
};

exports.postForgotPassword = (req, res) => {
  const { email } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ msg: 'Please enter email id' });
  }
  if (errors.length > 0) {
    res.render('forgotPassword', {
      layout: 'layouts/mainLayout', title: 'Forgot Password',
      errors,
      email,
    });
  }
  else {

    const queryString = `SELECT * FROM happyhealth.usertbl WHERE email = '${email}' Limit 1 `;
    db.query(queryString, function (err, result) {
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
          layout: 'layouts/mainLayout', title: 'Forgot Password',
          errors,
          email,
        });
      }

    });

  }

};



exports.getResetPassword = (req, res) => {
  const userId = req.session.userId;
  console.log(`under get reset password ${userId}`);
  res.render('resetPassword', { layout: 'layouts/mainLayout', title: 'Reset Password' });

};

exports.postResetPassword = async (req, res) => {
	// console.log(req.body, "================> POSTTING RESET PASSWORD")
  const userId = req.session.userId;
  const { password, password2 } = req.body;
  let errors = [];
  let success_msg;
  if (!password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  else {

    if (password.length > 15) {
      errors.push({ msg: 'Password must be below 15 characters' });
    }
    else if (password.length < 8) {
      errors.push({ msg: 'Password must be at least 8 characters' });
    }
    if (password != password2) {
      errors.push({ msg: 'Passwords not matched' });
    }
  }

  if (errors.length > 0) {
    res.render('resetPassword', {
      layout: 'layouts/mainLayout', title: 'Reset Password',
      errors,
      password,
      password2
    });
  }
  else {

	const hashPassword = await bcrypt.hash(password, 12);
    console.log(hashPassword,"--------hashpassword");


    const updateQuery = `UPDATE happyhealth.usertbl
            SET 
                password = '${hashPassword}'
            WHERE
                userId = '${userId}';`;
    db.query(updateQuery, function (err, result) {
      if (err) console.log(`${err}`);
      console.log("1 record updated");
      success_msg1 = 'Password changed sucessfully';
      req.session.success_msg = success_msg1;
      res.redirect('/');
    });



  }

};

const nodemailer = require('nodemailer');
const {google } = require('googleapis')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const CLIENT_ID = '74869696546-q4phjod112tfp5f57i0u90kp0orkmqrn.apps.googleusercontent.com';
const CLEINT_SECRET = 'LL_KJ4R_0PMBWcZ6-Xc76zOE';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04djp7_22d3OwCgYIARAAGAQSNgF-L9Ir9Q-ovOi_v3SYvdm3-caACvTGNZ8SsAF8VyKzenL-PX7svIxZaz2K0C0s1r4aI8KhDw'; 

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


async function sendEmail( userEmail, generateCode ) {

	console.log(typeof userEmail, typeof generateCode )
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'happyhealthgdp@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'happyhealthgdp@gmail.com',
      to: userEmail,
      subject: 'OTP to reset your password',
      text: `OTP to reset your account: ${generateCode}`,
      html: `<p> Your OTP to reset your account: ${generateCode} </p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// const sendEmail = (userEmail, generateCode) => {

//   const mailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'happyhealthgdp@gmail.com',
//       pass: 'Health@890'
//     }
//   });
//   const email = "<h1>Happy Health</h1> <p>Your otp is " + generateCode + "  </p>";
//   const mailDetails = {
//     from: 'happyhealthgdp@gmail.com',
//     to: 'srkvodnala547@gmail.com',
//     subject: 'Happy Health forgot Password!',
//     html: email
//   };

//   mailTransporter.sendMail(mailDetails, function (err, data) {
//     if (err) {
//       console.log('Error Occurs ' + err);
//     } else {
//       console.log('Email sent successfully');
//     }
//   });
// };


exports.getValidation = (req, res) => {
  // const errors = req.errors;
  const userId = req.session.userId;
  const userEmail = req.session.userEmail;
  console.log(`under get validation page ${userEmail}`);
  generateCode = Math.floor(((Math.random() + 1) * 100000));
  console.log(`Generated code: ${generateCode}`);
  sendEmail(userEmail, generateCode);
  res.render('validationPage', { layout: 'layouts/mainLayout', title: 'Validation User' });
};



exports.postValidation = (req, res) => {

  const userId = req.session.userId;
  var userEmail = req.session.userEmail;
  const code = req.body.code;
  const resend = req.body.resend;

  console.log(`under post validation page ${userId}`);
  console.log(`under post validation page code: ${code}`);
  console.log(`under post validation page resend: ${resend}`);
  let errors = [];

  if (resend == "Resend") {
    generateCode = Math.floor(((Math.random() + 1) * 100000));
    console.log(`Generated code: ${generateCode}`);
    sendEmail(userEmail, generateCode);
    res.render('validationPage', { layout: 'layouts/mainLayout', title: 'Validation User' });
  } else {
    if (!code) {
      errors.push({ msg: 'Enter verification code' });
    }
    else if (code != generateCode) {
      errors.push({ msg: 'Invalid verification code' });
    }
    if (errors.length > 0) {
      res.render('validationPage', {
        layout: 'layouts/mainLayout', title: 'Validation User',
        errors
      });
    }
    else {
      res.redirect('/resetPassword');
    }
  }

};