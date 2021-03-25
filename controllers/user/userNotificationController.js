const db = require('../../database');

const moment = require('moment');


exports.getNotifications = (req, res) => {
    console.log("inside anouncements")
    const userId = req.session.userId;
    console.log(userId)

    const nnQuery = `SELECT * FROM happyhealth.announcementstbl where  userId like '%${userId}%' order by messageId desc ;`

    db.query(nnQuery, function (err, result) {
        if (err) {
            console.log(err, "======> error while getting announcments");
        } else {
            console.log(result, '-------displaying user notifictions-----');

            res.render('userViews/notifications', {
                layout: 'layouts/userLayout',
                title: 'Announcements',
                result
            });
        }
    });
};

exports.dismissAnnouncement = (req, res) => {
    let userId = req.session.userId;
    let msgId = req.params.messageId
    console.log(msgId, "=======> dismiss user notification");


    let diss = `SELECT userId FROM happyhealth.announcementstbl where messageId = ${msgId} and userId like '%${userId}%';`
    db.query(diss, (err, resul) => {
        if (err) {
            console.log(err, "=======> error")
        } else {
            let users = resul[0].userId.split(',');
            console.log(users, "======> before splitting")

            var userIndex = users.indexOf(`${userId}`);
            console.log(userIndex, "=========> user index")
            users.splice(userIndex, 1);
            let afterRemovingUser = users.toString();
            console.log(afterRemovingUser, "========> after removing user")

            const  annTable = `update happyhealth.announcementstbl set userId = "${afterRemovingUser}"  where messageId = ${msgId}`
            db.query(annTable, (err,result)=>{
                if(err){
                    console.log(err, "error while updating new list")
                }else{
                    console.log(result, "=====> removed user from list")
                    res.redirect('/notifications')
                }
            })
            // res.redirect('notifications')
        }
    })
    // res.redirect('/notifications')
}


// exports.postNotifications = (req, res) => {
//     let userId = req.session.userId;
//     console.log("-------post user Notification controller");
//     let errors = [];
//     if (errors) {
//         errors.push('Please enter all fields');
//         console.log(errors, "----------------errros");
//         res.render('userViews/notifications', {
//             layout: 'layouts/userLayout',
//             title: 'Announcements'
//         });
//     }
// };

// exports.getNotifications = (req, res) => {
//     res.render('userViews/notifications', {
//         layout: 'layouts/userLayout',
//         title: 'User Management'

//     });
// };

// exports.deleteMsg = (req, res) => {
//     let messageId = req.params.messageId;
//     console.log(messageId, "deleting msg")
//     const deleteQuery = `Delete * FROM happyhealth.announcementsTbl WHERE messageId = '${messageId}'; `;
//     const deleteQuery2 = `Delete * FROM happyhealth.announcementsTbl WHERE messageId = '${messageId}';`;
//     db.query(deleteQuery2, function (err) {
//         if (err) {
//             throw err;
//         }
//         console.log("****notifications delete2 executed started****");
//     });
//     db.query(deleteQuery, function (err) {
//         if (err) {
//             throw err;
//         } else {
//             res.redirect('userViews/notifications');
//         }
//         console.log("****delete executed started****");
//     });

//     // var ppQuery = `Delete * FROM happyhealth.announcementsTbl;`;
//     // db.query(ppQuery, function (err, result) {
//     //     if (err) {
//     //         console.log(err);
//     //     } else {
//     //         res.redirect('userViews/notifications', {
//     //             layout: 'layouts/userLayout',
//     //             title: 'Announcements'
//     //         });
//     //     }
//     // });
// }




