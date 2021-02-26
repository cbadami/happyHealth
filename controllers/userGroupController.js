const db = require('../database');
const moment = require('moment');
const { compose } = require('async');


exports.getGroup = (req, res) => {
    const allGroupsQuery = `SELECT * FROM happyhealth.groupTbl`;
    db.query(allGroupsQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result, "------------db group result");
            res.render('adminViews/groupManagement', {
                layout: 'layouts/adminLayout',
                title: 'Group Management',
                result
            });
            console.log("***************getGroup executed successfully******************");
        }
    });
};



exports.editGroup = (req, res) => {
    console.log('**************Inside editGroup controller*********************');
    var groupId = req.params.groupId;
    var editQuery = `SELECT * FROM happyhealth.groupTbl WHERE GroupId = '${groupId}'`;
    db.query(editQuery, function (err, result) {
        if (err) {
            throw err;
        } else {

            let groupId = result[0].groupId;
            let groupName = result[0].groupName;
            let creator = result[0].creator;
            let createdDate = moment(result[0].createdDate).format('MM/DD/YYYY').toString();

            const resss = { groupId, groupName, creator, createdDate };
            console.log(result, "-----edit group----------");


            res.render('adminViews/editGroup', { layout: 'layouts/adminLayout', title: 'Edit Group', resss, moment });
        }
    });
};

exports.addUsers = (req, res) => {
    console.log("************** Adding users   *****************");
};

exports.updateGroup = (req, res) => {
    console.log('------updateGroup controller');
    var groupId = req.params.groupId;
    var groupName = req.body.groupName;
    var creator = req.body.creator;
    var createdDate = req.body.createdDate;

    console.log(groupId, groupName, creator, createdDate);

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

    var deleteQuery = `Delete FROM happyhealth.groupTbl WHERE groupId = ${groupId};`;

    db.query(deleteQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("---delete group sucessfully executed");
            res.redirect('/groupManagement');
        }
    });
};

exports.getGroupMembers = async (req, res) => {
    let groupId = req.params.groupId;
    let joinedUsers = notJoinedUsers = groupDetails = "";
    const usersQuery = `SELECT userId, userName FROM happyhealth.usertbl where userId IN (SELECT userId FROM happyhealth.groupmembertbl where groupId=${groupId});`;
    await db.query(usersQuery, (err, result) => {
        if (err) throw err;
        else {
            console.log(result, "----------------userQuery result");
            joinedUsers = result;
        }
    });
    const notUsersQuery = `SELECT userId, userName FROM happyhealth.usertbl where userId NOT IN (SELECT userId FROM happyhealth.groupmembertbl where groupId=${groupId});`;
    await db.query(notUsersQuery, (err, result) => {
        if (err) throw err;
        else {
            console.log(result, "------------notUsersQuery result");
            notJoinedUsers = result;
        }
    });

    const groupQuery = `select * from happyhealth.grouptbl where groupId =${groupId}`;
    await db.query(groupQuery, (err, result) => {
        if (err) throw err;
        else {
            console.log(result, "------------groupQuery result");
            groupDetails = result;
            res.render('adminViews/groupMembers', { layout: 'layouts/adminLayout', title: 'Group Members', joinedUsers, notJoinedUsers, groupDetails });
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
            let addQuery = `INSERT INTO happyhealth.groupmemberTbl values(${userId},'${username}','${Date.now()}',${groupId});`;
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



exports.addUserAdmin = (req, res) => {

    console.log(req.body,"-------add user group member controller");
    let groupId = req.params.groupId;
    let userId = req.body.userId;
    console.log(groupId, userId, "----------groupmember");
    const date = new Date();
    const dateStr = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    console.log(dateStr);
    let addQuery = `INSERT INTO happyhealth.groupmemberTbl values(${userId},'${dateStr}',${groupId});`;
    db.query(addQuery, function (err, result) {
        if (err) {
            console.log(err, "--------error");
            return;
        } else {
            console.log(result, "--------result");
            res.redirect(`/getGroupMembers/${groupId}`);
        }
    });

};



exports.removeUserAdmin = (req, res) => {

    console.log(req.body,"-------add user group member controller");
    let groupId = req.params.groupId;
    let userId = req.params.userId;
    console.log(groupId, userId, "----------groupmember");
    let deleteQuery = `DELETE FROM happyhealth.groupmemberTbl WHERE userId = ${userId} AND groupId =${groupId};`;
    db.query(deleteQuery, function (err, result) {
        if (err) {
            console.log(err, "--------error");
            return;
        } else {
            console.log(result, "--------result");
            res.redirect(`/getGroupMembers/${groupId}`);
        }
    });

};