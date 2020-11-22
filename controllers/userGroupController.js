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
            var createdDate = JSON.stringify(result[0].Created_Date).slice(1, 11)
            res.render('editGroup', { groupId, groupName, creator, createdDate });
        }

    });

}

exports.updateGroup = (req, res) => {

    console.log('------updateGroup controller')

    var groupId = req.params.groupId;
    var groupName = req.body.groupName
    var creator = req.body.creator
    var createdDate = req.body.createdDate

    var updateQuery = `UPDATE happyhealth_MySQL.group SET Group_Name = '${groupName}', Creator = '${creator}' WHERE Group_Id = ${groupId}`

    db.query(updateQuery, function (err, result) {
        // console.log(result);
        if (err) {
            throw err;
            return
        }
        // console.log(`result: ${JSON.stringify(result)}`)
        // console.log(`length of result: ${result.length}`)
        res.redirect('../groupManagement');

    });


}

exports.deleteGroup = (req, res) => {

    console.log("---delete Group")
    var groupId = req.params.groupId;

    var deleteQuery = `Delete FROM happyhealth_MySQL.group WHERE Group_Id = ${groupId};`;

    db.query(deleteQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("---delete group sucessfully executed")
            res.redirect('/groupManagement')
        }
    });
}

exports.getGroupMembers = (req, res) => {
    console.log("-------group memebers controller")
    let groupId = req.params.groupId;
    let groupName = req.body.groupName;


    let userQuery = `SELECT * FROM happyhealth_MySQL.USER`
    let groupQuery = `SELECT * FROM happyhealth_MySQL.group_member WHERE groupId = ${groupId}`
    var groupNameQuery = `SELECT * FROM happyhealth_MySQL.group WHERE Group_Id = '${groupId}'`;

    db.query(groupNameQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            var groupName = result[0].Group_Name
            db.query(userQuery, function (err, result) {
                if (err) {
                    throw err;
                    return
                } else {
                    let userResults = result;
                    db.query(groupQuery, function (err, result) {
                        if (err) {
                            throw err;
                            return
                        } else {
                            console.log(result, "----result")
                            res.render("groupMembers", { groupId, groupName, userResults, result })
                        }
                    });

                }
            });
        }

    });



}

exports.addUserGroup = (req, res) => {
    console.log("-------add user group member controller")
    let groupId = req.params.groupId;
    let userName = req.params.userName;
    let addQuery = `INSERT INTO happyhealth_MySQL.group_member values('${userName}',null,null,null,null,${groupId});`;
    db.query(addQuery, function (err, result) {
        if (err) {
            throw err;
            return
        } else {
            console.log(result, "----add user group sucessfully executed")
            res.redirect(`/getGroupMembers/${groupId}`);
        }
    });
}

exports.removeUserGroup = (req, res) => {
    console.log("--------remove user group members controller")
    let groupId = req.params.groupId;
    let userName = req.params.userName;
    let removeQuery = `Delete FROM happyhealth_MySQL.group_member WHERE UserName = '${userName}' AND groupId = ${groupId};`;
    db.query(removeQuery, function (err, result) {
        if (err) {
            throw err;
            return
        } else {
            console.log(result, "----result")
            res.redirect(`/getGroupMembers/${groupId}`);
        }
    });
}