
exports.getResetPassword = (req, res) => {
    const userName = req.params.userName;
    console.log(`under get reset password ${userName}`);
    res.render('resetPassword', { userName });

}

exports.postResetPassword = (req,res) =>{
    const userName = req.params.userName;
    const {password, password2 } = req.body;
    let errors = [];
    let success_msg;
    if (!password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }
    else{
        
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
            errors,
            userName,
            password,
            password2
        });
    }
    else{
        success_msg = 'Password changed sucessfully';
        res.render('userLogin', {
            success_msg
        });
    }

}