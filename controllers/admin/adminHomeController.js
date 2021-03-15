exports.getAdminHome = (req, res) => {
    const userId = req.session.userId;
    res.render('adminViews/adminHome', {
        layout: 'layouts/adminLayout',
        title: 'admin Home'
    });
};

