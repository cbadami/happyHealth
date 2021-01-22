const db = require('../database');

exports.getAdminLogin = (req, res) => {
    res.render('adminLogin');
};

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
        const queryString = `SELECT * FROM happyhealth.usertbl WHERE userName = '${username}' and Password = '${password}' and Admin = 'Yes'`;

        db.query(queryString, function (err, result) {
            if (result.length > 0) {
                const userId = result[0]['userId'];
                req.session.userId = userId;
                res.redirect('/adminHome');
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
};

exports.getAdminHome = (req, res) => {
    const userId = req.session.userId;
    res.render('adminHome');
};

exports.getUserManagement = (req, res) => {
    const userId = req.session.userId;
    console.log(`User ID: ${userId}`, '--------getUserManagement controller');
    const allUsersQuery = `SELECT * FROM happyhealth.usertbl WHERE userId <> ${userId}`;
    db.query(allUsersQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(`${JSON.stringify(result)}`, '------------db users result');
            res.render('userManagement', { result });
            console.log('***********getUserManagement executed successfully*********');
        }
    });
};

exports.editUser = (req, res) => {
    const userId = req.params.userId;
    const body = req.body;
    // console.log(`inside edit body: ${JSON.stringify(body)}`)
    var editQuery = `SELECT * FROM happyhealth.usertbl WHERE UserId = ${userId}`;

    db.query(editQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            // var userName = result[0].UserName
            // var email = result[0].Email
            // var password = result[0].Password
            // console.log(`email ${email}`)
            res.render('editProfile', { result });
        }

    });

};

exports.updateUser = (req, res) => {

    console.log(req.body);

    const userId = req.params.userId;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    console.log(`inside update user ${userName}`);
    console.log(`inside update user ${email}`);

    var updateQuery = `UPDATE happyhealth.usertbl SET Password = '${password}', Email = '${email}', Username = '${userName}' WHERE UserId = ${userId};`;

    db.query(updateQuery, function (err, result) {
        // console.log(result);
        if (err) {
            throw err;
            return;
        }
        // console.log(`result: ${JSON.stringify(result)}`)
        // console.log(`length of result: ${result.length}`)
        res.redirect('../userManagement');

    });


};

exports.deleteUser = (req, res) => {

    var userId = req.params.userId;
    var deleteQuery = `Delete FROM happyhealth.USERtbl WHERE UserId = '${userId}';`;

    db.query(deleteQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/userManagement');
        }

    });
};




exports.getAdminAnalytics = (req, res) => {
    res.render('adminAnalytics');
};

exports.getAdminAnalyticsStep = (req, res) => {
    res.render('adminAnalyticsStep');
};

exports.getAdminAnalyticsSleep = (req, res) => {
    res.render('adminAnalyticsSleep');
};

exports.getAdminAnalyticsWater = (req, res) => {
    res.render('adminAnalyticsWater');
};

exports.getAdminAnalyticsMediation = (req, res) => {
    res.render('adminAnalyticsMeditation');
};

exports.getAdminAnalyticsFruits = (req, res) => {
    res.render('adminAnalyticsFruits');
};

exports.getAdminAnalyticsVegetables = (req, res) => {
    res.render('adminAnalyticsVegetables');
};