const db = require('../database');


exports.getGroup = (req, res) => {

    console.log('------get group');

    var allGroupsQuery = `SELECT * FROM happyhealth.groupTbl`;

    db.query(allGroupsQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result, "-----get group");
            console.log("executed successfully");
            res.render('groupManagement', { result });
        }

    });

};

exports.editGroup = (req, res) => {

    console.log('------editGroup controller');

    var groupId = req.params.groupId;

    var editQuery = `SELECT * FROM happyhealth.groupTbl WHERE GroupId = '${groupId}'`;

    db.query(editQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result, "-----edit group");
            console.log("executed successfully");
            res.render('editGroup', { result });
        }

    });

};

exports.updateGroup = (req, res) => {

    console.log('------updateGroup controller');

    var groupId = req.params.groupId;
    var groupName = req.body.groupName;
    var creator = req.body.creator;
    var createdDate = req.body.createdDate;

    var updateQuery = `UPDATE happyhealth.groupTbl SET GroupName = '${groupName}', Creator = '${creator}', CreatedDate = '${createdDate}' WHERE GroupId = ${groupId}`;

    db.query(updateQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result, '------update group');
            console.log("executed successfully");
            res.redirect('../groupManagement');
        }

    });


};

exports.deleteGroup = (req, res) => {

    console.log("---delete Group");
    var groupId = req.params.groupId;

    var deleteQuery = `Delete FROM happyhealth.groupTbl WHERE GroupId = ${groupId};`;

    db.query(deleteQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("---delete group sucessfully executed");
            res.redirect('/groupManagement');
        }
    });
};

exports.getGroupMembers = (req, res) => {

    console.log("-------group memebers controller");
    let groupId = req.params.groupId;

    let userQuery = `SELECT * FROM happyhealth.userTbl`;
    let groupQuery = `SELECT * FROM happyhealth.groupmemberTbl WHERE GroupId = ${groupId}`;
    let groupNameQuery = `SELECT * FROM happyhealth.groupTbl WHERE GroupId = '${groupId}'`;

    db.query(groupNameQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            var groupName = result[0].GroupName;
            db.query(userQuery, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    let userResults = result;
                    console.log(userResults, '-----------userResults');
                    db.query(groupQuery, function (err, result) {
                        if (err) {
                            throw err;
                        } else {
                            console.log(result, "----result");
                            res.render("groupMembers", { groupId, groupName, userResults, result });
                        }
                    });

                }
            });
        }

    });



};

exports.addUserGroup = (req, res) => {

    console.log("-------add user group member controller");
    let groupId = req.params.groupId;
    let username = req.params.username;
    let userQuery = `SELECT * FROM happyhealth.userTbl WHERE Username = '${username}'`;
    db.query(userQuery, function (err, result) {
        if (err) {
            throw err;
            return;
        } else {
            console.log(result);
            let userId = result[0].UserId;
            let addQuery = `INSERT INTO happyhealth.groupmemberTbl values(${userId},'${username}','11/24/2020',${groupId});`;
            db.query(addQuery, function (err, result) {
                if (err) {
                    throw err;
                    return;
                } else {
                    console.log(result, "----add user group successfully executed");
                    res.redirect(`/getGroupMembers/${groupId}`);
                }
            });
        }
    });

};

exports.removeUserGroup = (req, res) => {
    console.log("--------remove user group members controller");
    let groupId = req.params.groupId;
    let userId = req.params.userId;
    let removeQuery = `Delete FROM happyhealth.groupmemberTbl WHERE UserId = '${userId}' AND groupId = ${groupId};`;
    db.query(removeQuery, function (err, result) {
        if (err) {
            throw err;
            return;
        } else {
            console.log(result, "----result");
            res.redirect(`/getGroupMembers/${groupId}`);
        }
    });
};