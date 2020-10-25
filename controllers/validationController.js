exports.getValidation =  (req, res) => {
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
    res.render('resetPassword', { userName });
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