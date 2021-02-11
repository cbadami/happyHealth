const db = require('../database');


exports.getUserLogin = (req, res) => {
    let success_msg = req.session.success_msg;
    if (!success_msg) {
        res.render('userViews/userLogin', { layout: 'layouts/mainLayout', title: 'User Login' });
        req.session.success_msg = null;
        return;
    } else {
        res.render('userViews/userLogin', { layout: 'layouts/mainLayout', title: 'User Login' });
        req.session.success_msg = null;
        return;
    }
};


exports.postUserLogin = (req, res) => {

    const { username, password } = req.body;
    let errors = [];

    if (!username || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.render('userViews/userLogin', {
            layout: 'layouts/mainLayout', title: 'User Login',
            errors,
            username,
            password
        });
    }
    else {

        let queryString = `SELECT * FROM happyhealth.usertbl WHERE username = '${username}'`;

        db.query(queryString, function (err, result) {
            console.log(result);
            if (result.length > 0) {

                if (result[0]['password'] == password) {
                    req.session.userId = result[0]['userId'];
                    res.redirect('userHome');
                } else {
                    errors.push({ msg: 'Enter correct username or password' });
                    res.render('userViews/userLogin', {
                        layout: 'layouts/mainLayout', title: 'User Login',
                        errors,
                        username,
                        password
                    });
                    return;
                }


            } else {
                errors.push({ msg: 'Enter correct username or password' });
                res.render('userViews/userLogin', {
                    layout: 'layouts/mainLayout', title: 'User Login',
                    errors,
                    username,
                    password
                });
                return;
            }

        });

    }
};