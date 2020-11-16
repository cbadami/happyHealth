const { reset } = require('nodemon');
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

exports.getAdminHome = (req, res) => {
    let username = req.session.username;
    console.log(`inside get admin ${username}`);
    res.render('adminHome', { username });
}

exports.getUserManagement = (req, res) => {
    let username = req.session.username;
    console.log(`inside get user management ${username}`);
    var allUsersQuery = `SELECT * FROM happyhealth_MySQL.USER`;

    db.query(allUsersQuery, function (err, result) {
        // console.log(result);
        if (err) {
            throw err;
        } else {
            console.log(`result: ${JSON.stringify(result)}`)
            // console.log(`length of result: ${result.length}`)
            res.render('userManagement', { result });
        }

    });

}

exports.deleteUser =(req,res) => {
    var username = req.params.userName;
    console.log(username)
    var deleteQuery = `Delete FROM happyhealth_MySQL.USER WHERE UserName = '${username}';`;

    db.query(deleteQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/userManagement')
        }

    });
}


exports.getAdminAnalytics = (req,res) => {
    res.render('adminAnalytics');
}