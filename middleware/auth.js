module.exports.isAuth = (req, res, next) => {
    console.log(JSON.stringify(req.path), "---------------User Auth path");
    console.log(JSON.stringify(req.session), "------------------User session");
    if (!req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    res.locals.userName = req.session.userName
	res.locals.annCount = req.session.annCount

	// console.log(JSON.stringify(req.session), "------------------User session");

    next();
};

module.exports.isAdmin = (req, res, next) => {
    console.log(JSON.stringify(req.path),"----------Admin auth path");
    console.log(JSON.stringify(req.session), "--------Admin sesssion");
    if (!req.session.isAdmin) {
        if(req.session.isLoggedIn){
            res.redirect('/error')
        }else{
            res.redirect('/logout');
            return;
        }

    }
    next();
};