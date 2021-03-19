const db = require('../../database');

exports.getNotifications = (req, res) => {
    console.log("inside anouncements")
    const userId = req.session.userId;
    console.log(userId)

    const nnQuery = `Select messageId, title, message, userId from happyhealth.announcementsTbl ;`;
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


exports.postNotifications = (req, res) => {
    let userId = req.session.userId;
    const {
        messageId,
        title,
        message
    } = req.body;
    console.log("-------post user Notification controller");
    let errors = [];
    if (!messageId || !title || !message) {
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/notifications', {
            layout: 'layouts/userLayout',
            title: 'Announcements'
        });
    }
    var ppQuery = `Delete FROM happyhealth.announcementstbl WHERE messageId = '${messageId}';`;
    db.query(ppQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('userViews/notifications');
        }
    });

};

// exports.getNotifications = (req, res) => {
//     res.render('userViews/notifications', {
//         layout: 'layouts/userLayout',
//         title: 'User Management'

//     });
// };
