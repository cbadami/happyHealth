const db = require('../database');

exports.getForgotPassword = (req, res) => {
  res.render('forgotPassword');
};

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

    const queryString = `SELECT * FROM happyhealth.usertbl WHERE email = '${email}' Limit 1 `;
    db.query(queryString, function (err, result) {
      console.log(`forgot password ${result}`);
      if (result.length > 0) {
        console.log(`under forgot password page ${result[0]['userId']}`);
        const userName = result[0]['userId'];
        const userEmail = result[0]['userEmail'];
        req.session.userId = userId;
        req.session.userEmail = userEmail;
        res.redirect('validationPage');
      } else {
        errors.push({ msg: 'Email id not registered' });
        res.render('forgotPassword', {
          errors,
          email,
        });
      }

    });

  }

};