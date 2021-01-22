const db = require('../database');


exports.getSignup = (req, res) => {
    console.log(`inside get method of user signup`);
    res.render('userViews/userSignup',{layout: 'layouts/mainLayout', title: 'User Signup'});
};

exports.postSignup = (req, res) => {
    let userId = Math.floor(((Math.random() + 1) * 100000));
    const { username, email, password, password2 } = req.body;
    let errors = [];
    let success_msg;
    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }
    else {
        if (username.length > 12) {
            errors.push({ msg: 'Username must be below 12 characters' });
        }
        else if (username.length < 6) {
            errors.push({ msg: 'Username must be atleast 6 characters' });
        }

        if (password.length > 15) {
            errors.push({ msg: 'Password must be below 15 characters' });
        }
        else if (password.length < 8) {
            errors.push({ msg: 'Password must be at least 8 characters' });
        }

        if (email.length > 30) {
            errors.push({ msg: 'Email id must be below 30 characters' });
        }

        if (password != password2) {
            errors.push({ msg: 'Passwords not matched' });
        }
    }

    console.log(`before errors ${errors} length: ${errors.length}`);
    if (errors.length > 0) {
        res.render('userViews/userSignup',{layout: 'layouts/mainLayout', title: 'User Signup',
            errors,
            username,
            email,
            password,
            password2
        });
    }
    else {
        console.log(`errors in last query: ${errors[0]} length ${errors.length}`);
        var queryString = `INSERT INTO  happyhealth.user values(${userId},
        '${username}','${password}','Yes','${email}');`;
        db.query(queryString, function (err, result) {
            if (err) {
                console.log(`${err}`);
                let str = err.message;
                if (str.includes("UserName")) {
                    errors.push({ msg: 'Username already taken' });
                    res.render('userViews/userSignup',{layout: 'layouts/mainLayout', title: 'User Signup',
                        errors,
                        name: username,
                        email,
                        password,
                        password2
                    });
                } else if (str.includes("Email")) {
                    errors.push({ msg: 'Email id already registered' });
                    res.render('userViews/userSignup',{layout: 'layouts/mainLayout', title: 'User Signup',
                        errors,
                        name: username,
                        email,
                        password,
                        password2
                    });
                }
            } else {
                console.log("1 record inserted");
                success_msg = 'Register sucessful';
                req.session.success_msg = success_msg;
                res.redirect('/');
            }
        });

    }

};