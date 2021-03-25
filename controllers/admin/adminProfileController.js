
const db = require('../../database');

exports.getUserInfo = (req,res)=>{
    const userId = req.session.userId;
    

    console.log(`**********  ${userId}   ***********`)

    const query = `SELECT * FROM happyhealth.usertbl where userId = ${userId};`

    db.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.render('adminViews/adminInfo', {
                layout: 'layouts/adminLayout',
                title: 'User Profile',
                result
            });
            console.log('****getAdminUserName executed successfully****');
        }
    });
};

exports.getAdminUserName = (req, res) => {
    const userId = req.session.userId;

    console.log(`**********  ${userId}   ***********`)

    const query = `SELECT * FROM happyhealth.usertbl where userId = ${userId};`

    db.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.render('adminViews/adminUserName', {
                layout: 'layouts/adminLayout',
                title: 'User Profile',
                result
            });
            console.log('****getAdminUserName executed successfully****');
        }
    });
};