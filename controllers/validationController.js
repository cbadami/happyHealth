exports.getValidation = (req, res) => {
  // const errors = req.errors;
  const userName = req.params.userName;
  console.log(`under get validation page ${userName}`);
  res.render('validationPage', { userName });
}



exports.postValidation = (req, res) => {

  const userName = req.params.userName;
  const code = req.body.code;
  console.log(`under post validation page ${userName}`);
  console.log(`under post validation page code: ${code}`);
  let errors = [];
  if (!code) {
    errors.push({ msg: 'Enter verification code' });
  }
  else if(code != '0000') {
    errors.push({ msg: 'Invalid verification code' });
  }
  if (errors.length > 0) {
    res.render('validationPage', {
      errors,
      userName,
    });
  }
  else{
    let resetUrl = `/resetPassword/${userName}`
    res.redirect(resetUrl)
  }
  // res.render('resetPassword', { userName });
  // const {email,code} = req.body;
  // console.log(`under post validation page ${email}`);
  // let errors = [];
  // if (code == '000000') {  
  //   errors.push({ msg: `Hello user ${email}` });
  //   res.render('resetPassword', {
  //     errors,
  //     email
  //   });

  // }
  // else {
  //   errors.push({ msg: 'Please enter correct verification code' });
  //   res.render('validationPage' ,{errors,
  //     email
  //   });
  // }

}