const db = require('../database');

exports.getUserHome = (req, res) => {
    let userId = req.session.userId;
    console.log(`inside get user home ${username}`);

    const homeQuery = `Select * from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(homeQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db userMetrics table result');
            const { stepCount, sleepHours, water, meTime, fruits, veggies } = result[0];
            res.render('userViews/userHome', {
                layout: 'layouts/userLayout', title: 'User Home',
                stepCount, sleepHours, water, meTime, fruits, veggies
            });
        }
    });


};


exports.getUserStep = (req, res) => {
    let errors;
    console.log(`inside  get user step`);
    res.render('userStep', { errors });
};

exports.postUserStep = (req, res) => {
    let userId = req.session.userId;
    const { date, num_steps, goal } = req.body;
    console.log(`inside post user step`);
    let errors;
    if (!date || !num_steps || !goal) {
        console.log(`inside if statement ${num_steps}`);
        errors = 'Please enter all fields';
        res.render('userStep', { errors });
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET stepCount = ${num_steps}, stepGoal = ${goal}, date = '${date}'
        WHERE userId = '${userId}';`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};


exports.getUserSleep = (req, res) => {
    let errors;
    console.log(`inside  get user sleep`);
    res.render('userSleep', { errors });
};


exports.postUserSleep = (req, res) => {
    let userId = req.session.userId;
    const { date, num_hours, goal } = req.body;
    console.log(`inside post user sleep`);
    let errors;
    if (!date || !num_hours || !goal) {
        console.log(`inside if statement ${num_hours}`);
        errors = 'Please enter all fields';
        res.render('userSleep', { errors });
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET sleepHours = ${num_hours}, sleepGoal = ${goal}, date = '${date}'
        WHERE userId = '${userId}';`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};



exports.getUserHydration = (req, res) => {
    let errors;
    console.log(`inside  get user sleep`);
    res.render('userHydration', { errors });
};

exports.postUserHydration = (req, res) => {
    let userId = req.session.userId;
    const { date, num_glasses, goal } = req.body;
    console.log(`inside post user hyration`);
    let errors;
    if (!date || !num_glasses || !goal) {
        console.log(`inside if statement ${num_glasses}`);
        errors = 'Please enter all fields';
        res.render('userHydration', { errors });
    }
    var hydrationQuery = `UPDATE happyhealth.usermetricstbl
        SET water = ${num_glasses}, waterGoal = ${goal}, date = '${date}'
        WHERE userId = '${userId}';`;
    db.query(hydrationQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });
};

exports.getUserChallenges = (req, res) => {
    res.render('user_challenges');
};


exports.getUserMoreChallenges = (req, res) => {
    res.render('user_more_challenges');
};

exports.getUserProfile = (req, res) => {
    res.render('userProfile');
};


exports.getUserFruits = (req, res) => {
    res.render("userFruits");
};


exports.getUserVegetables = (req, res) => {
    res.render("userVegetables");
};


