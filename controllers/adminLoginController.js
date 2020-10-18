exports.getAdminLogin = (req, res) => {
    res.render('adminLogin')
}

exports.postAdminLogin = (req, res) => {

    const { email, password } = req.body;
    let errors = [];
    if (!email) {
        errors.push({ msg: 'Please enter all fields' });
    }
    else if (!password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.render('adminLogin', {
            errors,
            email,
            password
        });
    }
    else {

        out = "Welcome Admin!";
        res.render('adminHome', { out });
    }

}