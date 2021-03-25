const db = require('../../database');
const moment = require('moment');

exports.getNotifications = (req, res) => {
    console.log("inside anouncements")
    const userId = req.session.userId;
    console.log(userId)

    const nnQuery = `select * from announcementsTbl where (userId = 0) or (userId = ${userId}) order by messageId desc ;`
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



exports.postNotifications = (req,res)=>{
    console.log(req.body, "posted notification")

    let title =req.body.title;
    let description = req.body.description;
	let postedDate = moment(new Date()).format('L');

    console.log(title, description, postedDate, "==========> user announcemnet data")

    let postAnn = `INSERT INTO announcementsTbl(title, message, userId, msgDate, archive) VALUES ("${title}", "${description}", 0, '${postedDate}', 0)`

    db.query(postAnn,(err,result)=>{
        if(err){
            console.log(err, "=======> error while posting user announcement")
        }else{
            console.log(result, "==========> Posted user announcement")
        }
    })

    res.redirect('userViews/notifications')
}

// exports.getNotifications = (req, res) => {
//     res.render('userViews/notifications', {
//         layout: 'layouts/userLayout',
//         title: 'User Management'

//     });
// };

exports.deleteNotifications = (req,res)=>{
    let aid = req.params.aid;
    console.log(aid, "+============> deleting annoucnement")

    let deleteAnnoun = `UPDATE happyhealth.announcementstbl set archive = 1 where messageId=${aid};`

    db.query(deleteAnnoun, (err,result)=>{
        if(err){
            console.log(err, "===> error while deleting announcemtn")
        }else{
            console.log(result, "==========> deleted successfully")
        }

        res.redirect('userViews/notifications')

    });
}

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
// }
