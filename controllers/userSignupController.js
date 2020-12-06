const db = require('../database');


exports.getSignup = (req, res) => {
    console.log(`inside get method of user signup`);
    res.render('userSignup');
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
        // else {
        //     var userQuery = `SELECT UserName FROM happyhealth_MySQL.USER WHERE UserName = '${name}'`;
        //     db.query(userQuery, function (err, result) {
        //         console.log(result);
        //         if (result.length > 0) {
        //             console.log('inside username result');
        //             errors.push({ msg: 'Username already taken' });
        //             console.log(`inside errors ${errors} length: ${errors.length}`);
        //             // res.render('userSignup', {
        //             //     errors,
        //             //     name,
        //             //     email,
        //             //     password,
        //             //     password2
        //             // });
        //         }
        //     });
        //     console.log(`after query errors ${errors} length ${errors.length}`)
        // }

        if (password.length > 15) {
            errors.push({ msg: 'Password must be below 15 characters' });
        }
        else if (password.length < 8) {
            errors.push({ msg: 'Password must be at least 8 characters' });
        }

        if (email.length > 30) {
            errors.push({ msg: 'Email id must be below 30 characters' });
        }
        // else {
        //     var emailQuery = `SELECT UserName FROM happyhealth_MySQL.USER WHERE email = '${email}'`;
        //     db.query(emailQuery, function (err, result) {
        //         if (result.length > 0) {
        //             console.log('inside email id query check');
        //             errors.push({ msg: 'Email id already registered' });
        //             res.render('userSignup', {
        //                 errors,
        //                 name,
        //                 email,
        //                 password,
        //                 password2
        //             });
        //         }

        //     });
        // }

        if (password != password2) {
            errors.push({ msg: 'Passwords not matched' });
        }
    }

    console.log(`before errors ${errors} length: ${errors.length}`);
    if (errors.length > 0) {
        res.render('userSignup', {
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
                    res.render('userSignup', {
                        errors,
                        name: username,
                        email,
                        password,
                        password2
                    });
                } else if (str.includes("Email")) {
                    errors.push({ msg: 'Email id already registered' });
                    res.render('userSignup', {
                        errors,
                        name: username,
                        email,
                        password,
                        password2
                    });
                }
            } else {
                // var stepQuery = `INSERT INTO  happyhealth_MySQL.USER values(
                //     '${name}','${password}','No','No','No','Yes','${email}');`;
                console.log("1 record inserted");
                success_msg = 'Register sucessful';
                req.session.success_msg = success_msg;
                res.redirect('/');
            }
        });

    }

};