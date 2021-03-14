module.exports.isAuth = (req, res, next) => {
    console.log(JSON.stringify(req.path), "--------session");
    console.log(req.session.isLoggedIn, "--------req isLogged In");
    if (!req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    next();
};

module.exports.isAdmin = (req, res, next) => {
    console.log(JSON.stringify(req.session), "--------req admin sesssion");
    if (!req.session.isAdmin) {
        res.redirect('/');
        return;
    }
    next();
};