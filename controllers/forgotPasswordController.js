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
      res.redirect('/forgotPassword', {
        errors,
        email
      });
    }
    else {
  
      var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE Email = '${email}' Limit 1 `;
      db.query(queryString, function (err, result) {
        console.log(result)
        if (result.length > 0) {
          console.log(`under forgot password page ${result[0]['UserName']}`);
          var UserName = result[0]['UserName'];
          console.log(`post forgot page Hello user ${email}`);
          // errors.push({ msg: `Email id: ${email}` })
          res.redirect('/validationPage', { email });
        } else {
          errors.push({ msg: 'Email id not registered' });
          res.redirect('/forgotPassword', {
            errors,
            email,
          });
        }
  
      });
  
    }
  
  }