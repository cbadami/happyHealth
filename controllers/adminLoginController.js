
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

        var queryString = `SELECT userName FROM happyhealth.usertbl WHERE Username = '${username}' and Password = '${password}' and Admin = 'Yes'`;

        db.query(queryString, function (err, result) {
            console.log(result);
            if (result.length > 0) {
                // success_msg = 'Login successful';
                // console.log(success_msg);
                out = result[0]['userName'];
                // res.render('userHome', { out });
                req.session.username = out;
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
    let username = req.session.username;
    console.log(`inside get admin ${username}`);
    res.render('adminHome', { username });
};

exports.getUserManagement = (req, res) => {
    let username = req.session.username;
    console.log(`inside get user management ${username}`);
    var allUsersQuery = `SELECT * FROM happyhealth.userTbl`;

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

};

exports.editUser = (req, res) => {
    var userId = req.params.userId;
    var body = req.body;
    // console.log(`inside edit body: ${JSON.stringify(body)}`)
    var editQuery = `SELECT * FROM happyhealth.user WHERE UserId = ${userId}`;

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

    var updateQuery = `UPDATE happyhealth.user SET Password = '${password}', Email = '${email}', Username = '${userName}' WHERE UserId = ${userId};`;

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
    var deleteQuery = `Delete FROM happyhealth.USER WHERE UserId = '${userId}';`;

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

 //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


 var query = `select usertbl.userId, usertbl.userName, usermetricstbl.sleepHours, usermetricstbl.sleepGoal from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);

            res.render('adminAnalyticsSleep', { obj : result }   );
        }
    });
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