const db = require('../../database');

exports.getNotifications = (req, res) => {
    let messageId = req.session.messageId;
    const nnQuery = `Select messageId, title, message, userId from happyhealth.announcementsTbl where messageId = ${messageId};`;
    db.query(nnQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '-------displaying user notifictions-----');
            const {
                title,
                message,
                userId
            } = result[0];
            res.render('userViews/notifications', {
                layout: 'layouts/userLayout',
                title: 'Announcements',
                messageId,
                title,
                message,
                userId
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
