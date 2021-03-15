const db = require('../../database');

exports.getUserInfo = (req, res) => {

    const userId = req.session.userId;

    console.log(`**********  ${userId}   ***********`)

    const query = `SELECT * FROM happyhealth.usertbl where userId = ${userId};`

    db.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.render('userViews/userInfo', {
                layout: 'layouts/userLayout',
                title: 'User Profile',
                result
            });
            console.log('****user Info executed successfully****');
        }
    });
};

exports.getUserProfile = (req, res) => {
    let userId = req.session.userId;
    const homeQuery = `Select * from happyhealth.usertbl where UserId = ${userId};`;
    db.query(homeQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            const {
                userName,
                admin,
                email,
                fullName,
                gender,
                dateOfBirth,
                age,
                currentWeight,
                desiredWeight,
                height,
                country,
                state
            } = result[0];
            let [firstName, lastName] = fullName.split(' ')
            console.log(userName, admin, email, firstName,lastName, gender, dateOfBirth, age, currentWeight, desiredWeight, height, country, state)
            res.render('userViews/userProfile', {
                layout: 'layouts/userLayout',
                title: 'User Profile',
                userName,
                admin,
                email,
                firstName,
                lastName,
                gender,
                dateOfBirth,
                age,
                currentWeight,
                desiredWeight,
                height,
                country,
                state
            });
        }
    });

};



exports.postUserProfile = (req, res) => {

    console.log("****post user profile *********")
    let userId = req.session.userId;
    console.log(req.body, "---------req.body");
    let {
        firstName,lastName,gender,dateOfBirth, age,
        email,        currentWeight,        desiredWeight,
        height,        country,        state
    } = req.body;
    let fullName = firstName + ' ' + lastName
    console.log(fullName, gender, dateOfBirth, age, email, currentWeight, desiredWeight, height, country, state);
    height = +height
    console.log(height,"--------int height");
    const [year, month, date] = dateOfBirth.split("-")
    dateOfBirth = month + '/' + date + '/' + year
    let errors = [];
    if (!fullName || !gender || !dateOfBirth || !age || !email || !currentWeight || !desiredWeight || !height || !country || !state) {
        errors.push("Please enter all fields")
        res.render('userViews/userProfile', {
            layout: 'layouts/userLayout',
            title: 'User Profile',
            fullName,
            email,
            fullName,
            gender,
            dateOfBirth,
            age,
            currentWeight,
            desiredWeight,
            height,
            country,
            state,
            errors
        });
    }
    const profileQuery = `UPDATE happyhealth.usertbl
        SET email = '${email}', fullName = '${fullName}',gender='${gender}',dateOfBirth='${dateOfBirth}',age='${age}',
        currentWeight='${currentWeight}',desiredWeight='${desiredWeight}',height='${height}',country='${country}',state='${state}'
        WHERE userId = '${userId}';`;
    db.query(profileQuery, function (err, result) {
        if (err) {
            console.log(err, "------profile update error");
        } else {
            res.redirect('/userInfo');
        }
    });

};
