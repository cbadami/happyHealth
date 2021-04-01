module.exports.isAuth = (req, res, next) => {
    console.log(JSON.stringify(req.path), "--------User Auth path");
    console.log(JSON.stringify(req.session), "--------User session");
    if (!req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    next();
};

module.exports.isAdmin = (req, res, next) => {
    console.log(JSON.stringify(req.path),"----------Admin auth path");
    console.log(JSON.stringify(req.session), "--------Admin sesssion");
    if (!req.session.isAdmin) {
        if(req.session.isLoggedIn){
            let route = req.path;
            res.setHeader('Content-Type', 'application/json');
            res.status(404).send({
                status: 404,
                Error: 'Page Not Found',
                Route: route
            });
            res.end();
            return;
        }else{
            res.redirect('/logout');
            return;
        }

    }
    next();
};