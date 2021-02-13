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
            res.render('adminViews/editGroup', { layout: 'layouts/adminLayout', title: 'Edit Group', result, moment });
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

exports.getGroupMembers =  (req, res) => {

    console.log("*************   Inside getGroupMembers     **************")

    let groupId = req.params.groupId;

     let q = `SELECT t1.userId, t1.userName ,  t2.groupId, t2.joinedDate,  t3.groupName FROM happyhealth.usertbl as t1
    LEFT JOIN happyhealth.groupmembertbl as t2 ON t1.userId = t2.userId    LEFT JOIN happyhealth.grouptbl as t3 
    ON t2.groupId = t3.groupId where t3.groupId=${groupId} ;
     select groupName from happyhealth.grouptbl where groupId =${groupId} ;
     select * from happyhealth.usertbl `

    // const groupName = `select groupName from happyhealth.grouptbl where groupId =${groupId}`

    // const users = `select * from userstbl`;

    db.query(q, [2, 1], function (err, result) {

        if (err) throw err;
        else {
            let groupData = result[0];
            let groupName = result[1];
            let userData = result[2];

            // console.log(groupData)
            // console.log(groupName)
           // console.log(userData)

            if (result[0].length > 0) {
                res.render('adminViews/groupMembers', { layout: 'layouts/adminLayout', title: 'Group Members', groupData, userData });
            } else {
                db.query(groupName, (err, result) => {
                    if (err) throw err;
                    else {
                        // console.log('******  No users in this group *****')
                        // console.log(result);
                        res.render('adminViews/groupMembers', { layout: 'layouts/adminLayout', title: 'Group Members', groupName, userData, msg: 'No Users in this group' })
                    }
                })
            }
        }
    });
};

exports.addUserGroup = (req, res) => {
    let groupId = req.params.groupId;
    let userId = req.body.userId;
    let today = new Date().toLocaleDateString().toString()

    const insertQuery = `insert into happyhealth.groupmembertbl(userId, joinedDate, groupId) values( ${userId}, '${today}', ${groupId});`

    db.query(insertQuery,(err,result)=>{
        if(err) throw err;
        else{
            console.log(result);
            res.redirect(`/getGroupMembers/${groupId}`)
        }
    })

    // console.log("-------add user group member controller");
    // let groupId = req.params.groupId;
    // let username = req.params.username;
    // let userQuery = `SELECT * FROM happyhealth.userTbl WHERE Username = '${username}'`;
    // db.query(userQuery, function (err, result) {
    //     if (err) {
    //         throw err;
    //         return;
    //     } else {
    //         console.log(result);
    //         let userId = result[0].UserId;
    //         let addQuery = `INSERT INTO happyhealth.groupmemberTbl values(${userId},'${username}','11/24/2020',${groupId});`;
    //         db.query(addQuery, function (err, result) {
    //             if (err) {
    //                 throw err;
    //                 return;
    //             } else {
    //                 console.log(result, "----add user group successfully executed");
    //                 res.redirect(`/getGroupMembers/${groupId}`);
    //             }
    //         });
    //     }
    // });

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