const db = require('../database');

exports.getForgotPassword = (req, res) =>{
    res.render('forgotPassword')
}

exports.postForgotPassword = (req, res) => {
    const { email } = req.body;
    let errors = [];
    if (!email) {
      errors.push({ msg: 'Please enter email id' });
    }
    if (errors.length > 0) {
      res.render('forgotPassword', {
        errors,
        email,
      });
    }
    else {
  
      var queryString = `SELECT UserName,Email FROM happyhealth.user WHERE Email = '${email}' Limit 1 `;
      db.query(queryString, function (err, result) {
        console.log(`forgot password ${result}`)
        if (result.length > 0) {
          console.log(`under forgot password page ${result[0]['UserName']}`);
          var userName = result[0]['UserName'];
          var userEmail = result[0]['Email'];
          console.log(`post forgot page Hello user ${userName}`);
          req.session.userName = userName
          req.session.userEmail = userEmail
          res.redirect('validationPage')
        } else {
          errors.push({ msg: 'Email id not registered' });
          res.render('forgotPassword', {
            errors,
            email,
          });
        }
  
      });
  
    }
  
  }