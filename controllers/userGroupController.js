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

            const resss = { groupId, groupName, creator, createdDate }
            console.log(result, "-----edit group----------");


            res.render('adminViews/editGroup', { layout: 'layouts/adminLayout', title: 'Edit Group', resss, moment });
        }
    });
};

exports.addUsers = (req, res) => {
    console.log("************** Adding users   *****************")
}

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

exports.getGroupMembers = (req, res) => {
    let groupId = req.params.groupId;

    // let q = `SELECT t1.userId, t1.userName ,  t2.groupId, t2.joinedDate,  t3.groupName FROM happyhealth.usertbl as t1
    // LEFT JOIN happyhealth.groupmembertbl as t2 ON t1.userId = t2.userId    LEFT JOIN happyhealth.grouptbl as t3 
    // ON t2.groupId = t3.groupId where t3.groupId=${groupId}`

    const groupName = `select * from happyhealth.grouptbl where groupId =${groupId}`

    const q = `SELECT userId, userName FROM happyhealth.usertbl where userId IN 
    (SELECT userId FROM happyhealth.groupmembertbl where groupId=${groupId}) ;
     SELECT userId, userName FROM happyhealth.usertbl where userId NOT IN 
    (SELECT userId FROM happyhealth.groupmembertbl where groupId=${groupId}) ; select * from happyhealth.grouptbl where groupId =${groupId} ;`

    db.query(q, (err, result) => {
        if (err) throw err;
        else {
            const joinedUsers = result[0];
            const notJoinedUsers = result[1];
            const groupDetails = result[2];

            console.log(joinedUsers, "Joinedddddddddddd USERSSSSSSSSSSSSSSsss" )

            res.render('adminViews/groupMembers', { layout: 'layouts/adminLayout', title: 'Group Members', joinedUsers, notJoinedUsers , groupDetails })

        }
    })


    // db.query(q, (err, result) => {
    //     if (err) throw err;
    //     else {
    //         console.log('******  joined users *****')
    //         console.log(result)

    //         if (result.length > 0) {
    //             res.render('adminViews/groupMembers', { layout: 'layouts/adminLayout', title: 'Group Members', result });
    //         } else {
    //             db.query(groupName, (err, result) => {
    //                 if (err) throw err;
    //                 else {
    //                     // console.log('******  No users in this group *****')
    //                     // console.log(result);
    //                     res.render('adminViews/groupMembers', { layout: 'layouts/adminLayout', title: 'Group Members', result, msg: 'No Users in this group' })
    //                 }
    //             })
    //         }

    //     }
    // });
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



exports.addUserFromAdminSide = (req,res)=>{

    const groupId = req.params.groupId;
    const userId = req.body.userId;
    const joinedDate = moment(Date.now()).format('MM/DD/YYYY').toString();


    const qu = `insert into happyhealth.groupmembertbl values (${userId}, '${joinedDate}', ${groupId} ) ;`

    db.query( qu, (err,result) =>{
        if(err) throw err;
        else{
            console.log(result);
        }
    })

    res.redirect(`/getGroupMembers/${groupId}`)

    
}