const db = require('../../database');


exports.getAdminAnnouncements = (req, res) => {
    res.render('adminViews/adminAnnouncements', {
        layout: 'layouts/adminLayout',
        title: 'Admin Announcements'
    });
    console.log('****getAdminAnnouncements executed successfully****');
};
