const db = require('../database');

exports.getResetPassword = (req, res) => {
    const userId = req.session.userId;
    console.log(`under get reset password ${userId}`);
    res.render('resetPassword');

};

exports.postResetPassword = (req, res) => {
    const userId = req.session.userId;
    const { password, password2 } = req.body;
    let errors = [];
    let success_msg;
    if (!password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }
    else {

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
            password,
            password2
        });
    }
    else {

        const updateQuery = `UPDATE happyhealth.usertbl
            SET 
                password = '${password}'
            WHERE
                userId = '${userId}';`;
        db.query(updateQuery, function (err, result) {
            if (err) console.log(`${err}`);
            console.log("1 record updated");
            success_msg1 = 'Password changed sucessfully';
            req.session.success_msg = success_msg1;
            res.redirect('/');
        });
    }

};