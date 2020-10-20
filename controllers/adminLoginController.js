exports.getAdminLogin = (req, res) => {
    res.render('adminLogin')
}

exports.postAdminLogin = (req, res) => {

    const { username, password } = req.body;
    let errors = [];
    if (!username || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }


    if (errors.length > 0) {
        res.render('adminLogin', {
            errors,
            username,
            password
        });
    }
    else {

        out = "Welcome Admin!";
        res.render('adminHome', { out });
    }

}