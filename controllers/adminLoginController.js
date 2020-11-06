const db = require('../database');


exports.getAdminLogin = (req, res) => {
    res.render('adminLogin');
}

exports.postAdminLogin = (req, res) => {

    const { username, password } = req.body;
    let errors = [];

    if (!username || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.render('adminLogin', {
            errors,
            username,
            password
        });
    }
    else {
        var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE UserName = '${username}' and Password = '${password}' and Admin = 'Yes'`;

        db.query(queryString, function (err, result) {
            console.log(result);
            if (result.length > 0) {
                // success_msg = 'Login successful';
                // console.log(success_msg);
                out = result[0]['UserName'];
                // res.render('userHome', { out });
                req.session.username = out
                res.redirect('/adminHome')
            } else {
                errors.push({ msg: 'Enter correct username or password' });
                res.render('adminLogin', {
                    errors,
                    username,
                    password
                });
            }

        });

    }
}

exports.getAdminHome = (req,res) => {
    let username = req.session.username;
    console.log(`inside get admin ${username}`);
    res.render('newAdminHome',{username});
}
