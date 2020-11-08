const db = require('../database');

exports.getUserHome = (req, res) => {
    let username = req.session.username;
    // console.log(`before session destroy ${success_msg}`)
    console.log(`inside get user home ${username}`);
    // req.session = null
    var stepQuery = `Select STEPCOUNT from happyhealth_MySQL.stepcount where username = '${username}';`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            var stepCount = result[0]['STEPCOUNT']
            res.render('newuserHome', { username, stepCount });
        }
    });


}


exports.getUserStep = (req, res) => {
    let errors;
    console.log(`inside  get user step`)
    res.render('userStep', { errors })
}

exports.postUserStep = (req, res) => {
    let username = req.session.username;
    console.log(username)
    const { date, num_steps, goal } = req.body;
    console.log(`inside post user step`)
    let errors;
    if (!date || !num_steps || !goal) {
        console.log(`inside if statement ${num_steps}`);
        errors = 'Please enter all fields';
        res.render('userStep', { errors });
    }
    var stepQuery = `UPDATE happyhealth_MySQL.stepcount
        SET StepCount = ${num_steps}, Goal = ${goal}, Date = '${date}'
        WHERE UserName = '${username}';`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/userHome')
        }
    });




}



exports.getUserChallenges = (req, res) => {
    res.render('user_challenges')
}


exports.getUserMoreChallenges = (req, res) => {
    res.render('user_more_challenges')
}

exports.getUserSleep = (req, res) => {
    res.render('userSleep')
}

exports.getUserHydration = (req, res) => {
    res.render('userHydration')
}

