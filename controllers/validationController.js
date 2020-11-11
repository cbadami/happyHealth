const nodemailer = require('nodemailer');

const db = require('../database');

var generateCode;




exports.getValidation = (req, res) => {
  // const errors = req.errors;
  const userName = req.session.userName;
  var userEmail = req.session.userEmail
  console.log(`under get validation page ${userName}`);

  generateCode = Math.floor(((Math.random() + 1) * 100000));
  console.log(`Generate code: ${generateCode}`)
  var email = "<h1>Happy Health</h1> <p>Your otp is " + generateCode + "  </p>"


  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'happyhealthgdp@gmail.com',
      pass: 'Happyhealth123'
    }
  });

  let mailDetails = {
    from: 'happyhealthgdp@gmail.com',
    to: userEmail,
    subject: 'Happy Health forgot Password!',
    html: email
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs ' + err);
    } else {
      console.log('Email sent successfully');
    }
  });
  res.render('validationPage');

}



exports.postValidation = (req, res) => {

  const userName = req.session.userName;
  var userEmail = req.session.userEmail
  const code = req.body.code;
  const resend = req.body.resend;

  console.log(`under post validation page ${userName}`);
  console.log(`under post validation page code: ${code}`);
  console.log(`under post validation page resend: ${resend}`);
  let errors = [];

  if (resend == "Resend") {
    generateCode = Math.floor(((Math.random() + 1) * 100000));
    console.log(`Generate code: ${generateCode}`)
    var email = "<h1>Happy Health</h1> <p>Your otp is " + generateCode + "  </p>"


    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'happyhealthgdp@gmail.com',
        pass: 'Happyhealth123'
      }
    });

    let mailDetails = {
      from: 'happyhealthgdp@gmail.com',
      to: userEmail,
      subject: 'Happy Health forgot Password!',
      html: email
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs ' + err);
      } else {
        console.log('Email sent successfully');
      }
    });
    res.render('validationPage');
  } else {
    if (!code) {
      errors.push({ msg: 'Enter verification code' });
    }
    else if (code != generateCode) {
      errors.push({ msg: 'Invalid verification code' });
    }
    if (errors.length > 0) {
      res.render('validationPage', {
        errors
      });
    }
    else {
      res.redirect('/resetPassword')
    }
  }

}