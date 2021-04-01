
const db = require('../database');
 const bcrypt = require('bcryptjs');

exports.getUserLogin = (req, res) => {

	console.log("=======> INSIDE USER LOGIN")

    let success_msg = req.session.success_msg;
    if (!success_msg) {
        res.render('userViews/userLogin', {
            layout: 'layouts/mainLayout',
            title: 'User Login'
        });
        req.session.success_msg = null;
        return;
    } else {
        res.render('userViews/userLogin', {
            layout: 'layouts/mainLayout',
            title: 'User Login'
        });
        req.session.success_msg = null;
        return;
    }
};


exports.postUserLogin = async (req, res) => {

    const {
        username,
        password
    } = req.body;

	console.log(username, password, "==========> POSTING USER LOGIN")
	
    let errors = [];

    if (!username || !password) {
        errors.push({
            msg: 'Please enter all fields'
        });
    }

    if (errors.length > 0) {
        res.render('userViews/userLogin', {
            layout: 'layouts/mainLayout',
            title: 'User Login',
            errors,
            username,
            password
        });
    } else {

        let queryString = `SELECT * FROM happyhealth.usertbl WHERE username = '${username}'`;

        db.query(queryString, async function (err, result) {

            if (err) {
                console.log(err, "-----while login");
            }
<<<<<<< HEAD
            console.log(result, "---------user login result");
=======
            console.log(result);
>>>>>>> parent of 3c485e9 (Merge branch 'master' into prod)
            if (result.length > 0) {
                const validPassword = await bcrypt.compare(password, result[0]['password']);
                if (validPassword) {
                    req.session.userId = result[0]['userId'];
                    req.session.isLoggedIn = true;
                    res.redirect('home');
                } else {
                    errors.push({
                        msg: 'Enter correct username or password'
                    });
                    res.render('userViews/userLogin', {
                        layout: 'layouts/mainLayout',
                        title: 'User Login',
                        errors,
                        username,
                        password
                    });
                    return;
                }


            } else {
                errors.push({
                    msg: 'Enter correct username or password'
                });
                res.render('userViews/userLogin', {
                    layout: 'layouts/mainLayout',
                    title: 'User Login',
                    errors,
                    username,
                    password
                });
                return;
            }

        });

    }
};


exports.getAdminLogin = (req, res) => {
    res.render('adminViews/adminLogin', {
        layout: 'layouts/mainLayout',
        title: 'admin Login'
    });
};

exports.postAdminLogin = async (req, res) => {

    const {
        username,
        password
    } = req.body;
    let errors = [];

    if (!username || !password) {
        errors.push({
            msg: 'Please enter all fields'
        });
    }

    if (errors.length > 0) {
        res.render('adminViews/adminLogin', {
            layout: 'layouts/mainLayout',
            title: 'admin Login',
            errors,
            username,
            password
        });
    } else {
        const queryString = `SELECT * FROM happyhealth.usertbl WHERE userName = '${username}' and Admin = 'Yes'`;

        db.query(queryString, async function (err, result) {
            if (result.length > 0) {

                const validPassword = await bcrypt.compare(password, result[0]['password']);

                if (validPassword) {
                    const userId = result[0]['userId'];
                    req.session.userId = userId;
                    req.session.isLoggedIn = true;
                    req.session.isAdmin = true;
                    res.redirect('adminHome');
                    console.log('*****Admin Login successfully*****');
                } else {
                    errors.push({
                        msg: 'Enter correct username or password'
                    });
                    res.render('adminViews/adminLogin', {
                        layout: 'layouts/mainLayout',
                        title: 'admin Login',
                        errors,
                        username,
                        password
                    });
                }

            } else {
                errors.push({
                    msg: 'Enter correct username or password'
                });
                res.render('adminViews/adminLogin', {
                    layout: 'layouts/mainLayout',
                    title: 'admin Login',
                    errors,
                    username,
                    password
                });
            }

        });

    }
};


exports.getLogout = (req,res,next) =>{
    console.log("*********logout controller********");
    if(req.session.isAdmin){
        req.session = null;
        res.redirect('/adminLogin')
        return
    }
    req.session = null;
    res.redirect('/');
    return
}

exports.getError = (req,res,next) =>{
    console.log("****************Error controller")
    console.log(req.path,"------path");
    res.status(404).send({
        status: 404,
<<<<<<< HEAD
        Error: 'Page Not Found',
        Route: route
    });
    res.end();
};
=======
        Error: 'Page Not Found'
      });
}
>>>>>>> parent of 3c485e9 (Merge branch 'master' into prod)
