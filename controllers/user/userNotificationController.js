const db = require('../../database');


exports.getNotifications = (req, res) => {
    res.render('userViews/notifications', {
        layout: 'layouts/userLayout',
        title: 'User Management'

    });
};
