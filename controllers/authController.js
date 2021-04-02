
const db = require('../database');
const bcrypt = require('bcryptjs');

exports.getUserLogin = (req, res) => {

    console.log("=======> INSIDE USER LOGIN");

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

    try {

        const {
            username,
            password
        } = req.body;

        console.log(username, "==========> POSTING USER LOGIN");

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

            console.log("*****User login DB Query Started**********\n");

            db.query(queryString, async function (err, result) {

                console.log("********Sucessfully Quered user login*******")

                if (err) {
                    console.log(err, "-----while login");
                }
                console.log(result, "---------user login result");

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

    } catch (err) {
        console.log(err, "------------User post login controller error.");
    }
};


exports.getAdminLogin = (req, res) => {
    res.render('adminViews/adminLogin', {
        layout: 'layouts/mainLayout',
        title: 'admin Login'
    });
};

exports.postAdminLogin = async (req, res) => {


    try {
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

            console.log("*****admin login db query started*******")

            db.query(queryString, async function (err, result) {

                console.log("********Sucessfully Quered admin login*******")
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

    } catch (err) {
        console.log(err, "----------------Admin post login controller error.");
    }
};


exports.getLogout = (req, res, next) => {
    console.log("*********logout controller********");
    if (req.session.isAdmin) {
        req.session = null;
        res.redirect('/adminLogin');
        return;
    }
    req.session = null;
    res.redirect('/');
    return;
};

exports.getError = (req, res, next) => {
    console.log("****************Error controller");
    console.log(req.path, "------path");
    let route = req.path;
    res.status(404).send({
        status: 404,
        Error: 'Page Not Found',
        Route: route
    });
    res.end();
};
