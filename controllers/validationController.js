const nodemailer = require('nodemailer'); 

var code = Math.floor((Math.random() * 100000) + 1)
var email = "<h1>Happy Health</h1> <p>Your otp is "+ code+"  </p>"
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'happyhealthgdp@gmail.com', 
        pass: 'Happyhealth123'
    } 
}); 



exports.getValidation = (req, res) => {
  // const errors = req.errors;
  const userName = req.session.userName;
  console.log(`under get validation page ${userName}`);
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
  else if(code != '1111') {
    errors.push({ msg: 'Invalid verification code' });
  }
  if (errors.length > 0) {
    res.render('validationPage', {
      errors
    });
  }
  else{
    res.redirect('/resetPassword')
  }

}