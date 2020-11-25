const db = require('../database');


exports.getUserLogin = (req, res) => {
    let success_msg = req.session.success_msg;
    if (!success_msg) {
        res.render('userLogin');
    } else {
        res.render('userLogin', { success_msg });
    }
};


exports.postUserLogin = (req, res) => {

    const { username, password } = req.body;
    let errors = [];

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

        let queryString = `SELECT * FROM happyhealth.user WHERE Username = '${username}' and Password = '${password}'`;

        db.query(queryString, function (err, result) {
            console.log(result);
            if (result.length > 0) {
                req.session.userId = result[0]['UserId'];
                req.session.username = result[0]['Username'];

                res.redirect('userHome');

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
};