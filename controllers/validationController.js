const nodemailer = require('nodemailer');

var generateCode;




exports.getValidation = (req, res) => {
  // const errors = req.errors;
  const userName = req.session.userName;
  console.log(`under get validation page ${userName}`);

  generateCode = Math.floor(((Math.random()+1) * 100000));
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
    to: 'harishthadkaus@gmail.com',
    subject: 'Happy Health forgot Password!',
    // text: 'Node.js testing mail for GeeksforGeeks'
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
  const code = req.body.code;
  console.log(`under post validation page ${userName}`);
  console.log(`under post validation page code: ${code}`);
  let errors = [];
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