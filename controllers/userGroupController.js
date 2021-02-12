const db = require('../database');
var moment = require('moment');


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
            console.log(result, "-----edit group----------");
            res.render('adminViews/editGroup', { layout: 'layouts/adminLayout', title: 'Edit Group', result , moment});
        }
    });
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
    let groupId = req.params.groupId;

    let q = `SELECT t1.userId, t1.userName ,  t2.groupId, t2.joinedDate,  t3.groupName FROM happyhealth.usertbl as t1
    LEFT JOIN happyhealth.groupmembertbl as t2 ON t1.userId = t2.userId    LEFT JOIN happyhealth.grouptbl as t3 
    ON t2.groupId = t3.groupId where t3.groupId=${groupId}`

    const groupName = `select groupName from happyhealth.grouptbl where groupId =${groupId}`


    db.query(q, (err, result) => {
        if (err) throw err;
        else {
            // console.log('******  joined users *****')
            // console.log(result)
        }
        if (result.length > 0) {
            res.render('adminViews/groupMembers', { layout: 'layouts/adminLayout', title: 'Group Members', result });
        } else {

            db.query(groupName, (err, result) => {
                if (err) throw err;
                else {
                    // console.log('******  No users in this group *****')
                    // console.log(result);
                    res.render('adminViews/groupMembers', { layout: 'layouts/adminLayout', title: 'Group Members', result, msg: 'No Users in this group' })
                }
            })
        }
    });

    db

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