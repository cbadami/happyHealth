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
            // console.log(`result: ${JSON.stringify(result)}`)
            // console.log(`length of result: ${result.length}`)
            res.render('userManagement', { result });
        }

    });

}

exports.editUser = (req,res) => {
    var username = req.params.userName;
    var body = req.body;
    console.log(`inside edit username: ${username}`)
    console.log(`inside edit body: ${JSON.stringify(body)}`)
    var editQuery = `SELECT * FROM happyhealth_MySQL.USER WHERE UserName = '${username}'`;

    // db.query(editQuery, function (err, result) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         res.redirect('/userManagement')
    //     }

    // });
    res.render('editProfile')
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

exports.getGroupManagement = (req, res) => {
    let username = req.session.username;
    console.log(`inside get user management ${username}`);
    var allGroupsQuery = `SELECT * FROM happyhealth_MySQL.group`;

    db.query(allGroupsQuery, function (err, result) {
        // console.log(result);
        if (err) {
            throw err;
        } else {
            // console.log(`result: ${JSON.stringify(result)}`)
            // console.log(`length of result: ${result.length}`)
            res.render('groupManagement', { result });
        }

    });

}

exports.deleteGroup =(req,res) => {
    var groupName = req.params.groupName;
    console.log(groupName)
    var deleteQuery = `Delete FROM happyhealth_MySQL.group WHERE Group_Name = '${groupName}';`;

    db.query(deleteQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/groupManagement')
        }

    });
} 


exports.getAdminAnalytics = (req,res) => {
    res.render('adminAnalytics');
}

exports.getAdminAnalyticsStep = (req,res) => {
    res.render('adminAnalyticsStep');
}

exports.getAdminAnalyticsSleep = (req,res) => {
    res.render('adminAnalyticsSleep');
}

exports.getAdminAnalyticsWater = (req,res) => {
    res.render('adminAnalyticsWater');
}

exports.getAdminAnalyticsMediation = (req,res) => {
    res.render('adminAnalyticsMeditation');
}