const { concatSeries } = require('async');
const db = require('../database');


exports.getGroup = (req, res) => {
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

exports.editGroup = (req, res) => {

    console.log('------editGroup controller')

    var groupId = req.params.groupId;

    var editQuery = `SELECT * FROM happyhealth_MySQL.group WHERE Group_Id = '${groupId}'`;

    db.query(editQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result)
            var groupName = result[0].Group_Name
            var creator = result[0].Creator
            var createdDate = JSON.stringify(result[0].Created_Date).slice(1,11)
            res.render('editGroup', { groupId,groupName,creator,createdDate });
        }

    });

}

exports.updateGroup = (req, res) => {

    console.log(req.body)

    const userName = req.params.userName;
    const email = req.body.email;
    const password = req.body.password;

    console.log(`inside update user ${userName}`)
    console.log(`inside update user ${email}`)

    var updateQuery = `UPDATE happyhealth_MySQL.USER SET Password = '${password}', Email = '${email}' WHERE UserName = '${userName}';`

    db.query(updateQuery, function (err, result) {
        // console.log(result);
        if (err) {
            throw err;
            return
        }
        // console.log(`result: ${JSON.stringify(result)}`)
        // console.log(`length of result: ${result.length}`)
        res.redirect('../userManagement');

    });


}

exports.deleteGroup = (req, res) => {
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