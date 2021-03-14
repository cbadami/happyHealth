const db = require('../database');
const bcrypt = require('bcryptjs');

exports.getUserLogin = (req, res) => {
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
            console.log(result);
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

exports.getUserLogout = (req,res,next) =>{
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