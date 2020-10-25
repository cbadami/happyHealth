exports.getValidation =  (req, res) => {
    // const errors = req.errors;
    const email = req.body;
    console.log(`under get validation page ${email}`);
    res.render('validationPage', { email });
  }



exports.postValidation = (req, res) => {

  const email = req.body.email;
  const code = req.body.code;
    console.log(`under post validation page ${email}`);
    console.log(`under post validation page code: ${code}`);
    res.render('resetPassword', { email });
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