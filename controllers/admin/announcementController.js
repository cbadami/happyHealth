const db = require('../../database');
const moment = require('moment');


exports.getAdminAnnouncements = (req, res) => {
    console.log("***** Admin Announcements started ******")
    const messageId = req.session.messageId;
    console.log(messageId)

    const aaQuery = `select * from announcementsTbl where archive=0 order by msgDate desc`;
    db.query(aaQuery, function (err, result) {
        if (err) {
            console.log(err, "*****error while getting admin announcments*****");
        } else {
            console.log(result, '****getAdminAnnouncements executed successfully****');

            res.render('adminViews/adminAnnouncements', {
                layout: 'layouts/adminLayout',
                title: 'Announcements',
                result
            });
        }
    });

};


exports.postAdminAnnouncements = (req, res) => {
    console.log("=========> posting announcement")
    let messageId = req.session.messageId;

    let usersQuery = `SELECT userId FROM happyhealth.usertbl;`
    db.query(usersQuery, (err, result) => {
        if (err) {
            console.log(err, "=======> error while searching users.")
        } else {
            console.log(result, "=====> found users.")
        }
    })

    // const {
    //     title,
    //     message,
    //     userId
    // } = req.body;
    // console.log("-------post Admin Announcements controller");
    // let errors = [];
    // if (!title || !message) {
    //     errors.push('Please enter all fields!');
    //     console.log(errors, "****error while posting admin announcments****");
    //     res.render('adminViews/adminAnnouncements', {
    //         layout: 'layouts/adminLayout',
    //         title: 'Announcements'
    //     });
    // }
    // var aaQuery = `UPDATE happyhealth.announcementsTbl SET title = '${title}', message = '${message}', userId = ${userId} WHERE messageId = ${messageId};`;
    // db.query(aaQuery, function (error, result) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         res.redirect('adminViews/adminAnnouncements');
    //     }
    // });

};

// exports.getAdminAnnouncements = (req, res) => {
//     res.render('adminViews/adminAnnouncements', {
//         layout: 'layouts/adminLayout',
//         title: 'Admin Announcements'
//     });
//     console.log('****getAdminAnnouncements executed successfully****');
// };

exports.getAdminNewAnnouncements = (req, res) => {

    console.log("***** Page to create new announcements******")

    res.render('adminViews/adminNewAnnouncements', {
        layout: 'layouts/adminLayout',
        title: 'Announcements',
    });

    // const aaQuery = `Insert (title, message, msgDate, userId) from happyhealth.announcementsTbl VALUES (${title}, ${message}, ${msgDate}, ${userId});`;
    // db.query(aaQuery, function (err, result) {
    //     if (err) {
    //         console.log(err, "*****error while getting admin announcments*****");
    //     } else {
    //         console.log(result, '****getAdminAnnouncements executed successfully****');

    //         res.render('adminViews/adminAnnouncements', {
    //             layout: 'layouts/adminLayout',
    //             title: 'Announcements',
    //             result
    //         });
    //     }
    // });

};

exports.postAnnouncement = (req, res) => {
    console.log(req.body, "posted announcement")

    let title = req.body.title;
    let description = req.body.description;
    let postedDate = moment(new Date()).format('L');

    let usersQuery = `SELECT GROUP_CONCAT(userId) as users FROM happyhealth.usertbl ;`
    db.query(usersQuery, (err, result) => {
        if (err) {
            console.log(err, "=======> error while searching users.")
        } else {
            console.log(result[0].users, "=====> found users.")
            let usersList = result[0].users;


            let postAnn = `INSERT INTO announcementsTbl(title, message, userId, msgDate, archive) VALUES ("${title}", "${description}", "${usersList}", '${postedDate}', 0)`
            db.query(postAnn, (err, result) => {
                if (err) {
                    console.log(err, "======> error while sending")
                } else {
                    console.log(result, "========> posted annoncement")
                }
            })
        }
    })
    res.redirect('/adminAnnouncements')
}




exports.deleteAnnouncement = (req, res) => {
    let aid = req.params.aid;
    console.log(aid, "+============> deleting annoucnement")

    let deleteAnnoun = `UPDATE happyhealth.announcementstbl set archive = 1 where messageId=${aid};`

    db.query(deleteAnnoun, (err, result) => {
        if (err) {
            console.log(err, "===> error while deleting announcemtn")
        } else {
            console.log(result, "==========> deleted successfully")
        }

        res.redirect('/adminAnnouncements')

    });
}