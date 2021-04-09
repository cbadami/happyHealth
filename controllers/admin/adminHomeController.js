
const pooldb = require('../../pooldb');


exports.getAdminHome = (req, res) => {
    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {
            const userId = req.session.userId;
            res.render('adminViews/adminHome', {
                layout: 'layouts/adminLayout',
                title: 'admin Home'
            });

            conn.release();
        }
    });


};

