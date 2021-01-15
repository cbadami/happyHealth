const db = require('../database');

exports.getUserHome = (req, res) => {
    let userId = req.session.userId;
    let username = req.session.username;
    console.log(`inside get user home ${username}`);

    var stepQuery = `Select stepCount from happyhealth.usermetricstbl where UserId = ${userId};`;
    var sleepQuery = `Select sleepHours from happyhealth.usermetricstbl where UserId = ${userId};`;
    var waterQuery = `Select water from happyhealth.usermetricstbl where UserId = ${userId};`;

    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
            stepCount = -1;
        } else {
            stepCount = result[0]['stepCount'];
        }
        console.log(`iniside db ${stepCount}`);
        db.query(sleepQuery, function (err, result) {
            if (err) {
                console.log(err);
                sleepHours = -1;
            } else {
                sleepHours = result[0]['sleepHours'];
            }
            db.query(waterQuery, function (err, result) {
                if (err) {
                    console.log(err);
                    waterCount = -1;
                } else {
                    waterCount = result[0]['water'];
                }
                res.render('userHome', { username, stepCount, sleepHours, waterCount });
            });
        });

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


