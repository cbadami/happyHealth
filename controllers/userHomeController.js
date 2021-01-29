const db = require('../database');

exports.getUserHome = (req, res) => {
    let userId = req.session.userId;
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

exports.getUserProfile = (req, res) => {
    res.render('userViews/userProfile', {
        layout: 'layouts/userLayout', title: 'User Profile'});
};


exports.getUserStep = (req, res) => {
    res.render('userViews/userStep', { layout: 'layouts/userLayout', title: 'User Step'});
};

exports.postUserStep = (req, res) => {
    const userId = req.session.userId;
    const { date, num_steps, goal } = req.body;
    let errors;
    if (!date || !num_steps || !goal) {
        console.log(`inside if statement ${num_steps}`);
        errors = 'Please enter all fields';
        res.render('userViews/userStep', { layout: 'layouts/userLayout', title: 'User Step', errors });
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


// exports.getUserSleep = (req, res) => {
//     let errors;
//     console.log(`inside  get user sleep`);
//     res.render('userSleep', { errors });
// };


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

exports.postUserProfile= (req, res) => {
    let userId = req.session.userId;
    console.log("profile details " +req.body)
    const { name, Gender, dob,age,email,currentWeight,desiredWeight,height,myList,country,state } = req.body;
    console.log(`details`+ name);
    let errors;
    if (!name || !Gender || !dob ||!age || !email || !currentWeight || !desiredWeight || !height || !myList ||!country || !state ) {
        console.log(`inside if statement ${currentWeight}`);
        errors = 'Please enter all fields';
        res.render('userSleep', { errors });
    }
    var stepQuery = `UPDATE happyhealth.usertbl
        SET email = '${email}', fullName = '${name}',averageActivityLevel='${myList}',gender='${Gender}',dateOfBirth='${dob}',age='${age}',currentWeight='${currentWeight}',desiredWeight='${desiredWeight}',height='${height}',country='${country}',state='${state}'
        WHERE userId = '${userId}';`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};



// exports.getUserHydration = (req, res) => {
//     let errors;
//     console.log(`inside  get user sleep`);
//     res.render('userViews/userHydration', { errors });
// };

exports.getUserHydration = (req, res) => {
    res.render('userViews/userHydration', { layout: 'layouts/userLayout', title: 'User Hydration'});
};

exports.getUserFruits = (req, res) => {
    res.render('userViews/userFruits', { layout: 'layouts/userLayout', title: 'User Fruits'});
    //res.render("userFruits");
};

exports.getUserSleep = (req, res) => {
    res.render('userViews/userSleep', { layout: 'layouts/userLayout', title: 'User Sleep'});
   
};

exports.getUserVegetables = (req, res) => {
    res.render('userViews/userVegetables', { layout: 'layouts/userLayout', title: 'User Vegetables'});
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
    res.render('userViews/user_challenges', {
        layout: "layouts/userLayout",
        title: "User Management"
    });
};


exports.getUserMoreChallenges = (req, res) => {
    res.render('userViews/user_more_challenges',{
    layout: "layouts/userLayout",
        title: "User Management"
});
};







// exports.getUserVegetables = (req, res) => {
//     res.render("userVegetables");
// };


