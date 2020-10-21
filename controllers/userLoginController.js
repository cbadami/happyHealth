const db = require('../database');


exports.getUserLogin = (req, res) => {
    res.render('userLogin')
}


exports.postUserLogin = (req, res) => {

    const { username, password } = req.body;
    let errors = [];
    let success_msg;
    if (!username || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.render('userLogin', {
            errors,
            username,
            password
        });
    }
    else {
        var queryString = `SELECT UserName FROM happyhealth_MySQL.USER WHERE UserName = '${username}' and Password = '${password}'`;

        db.query(queryString, function (err, result) {
            console.log(result);
            if (result.length > 0) {
                success_msg = 'Login successful';
                console.log(success_msg);
                out = "Welcome " + result[0]['UserName'] + "!";
                res.render('userHome', { success_msg, out });
            } else {
                errors.push({ msg: 'Enter correct username or password' });
                res.render('userLogin', {
                    errors,
                    username,
                    password
                });
            }

        });

    }
}