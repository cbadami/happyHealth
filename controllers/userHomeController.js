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
    let userId = req.session.userId;
    const homeQuery = `Select * from happyhealth.usertbl where UserId = ${userId};`;
    db.query(homeQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            const { userName, admin, email, fullName, gender, dateOfBirth, age, currentWeight, desiredWeight, height, averageActivityLevel, country, state } = result[0];
            console.log(userName, admin, email, fullName, gender, dateOfBirth, age, currentWeight, desiredWeight, height, averageActivityLevel, country, state )
            res.render('userViews/userProfile', {
                layout: 'layouts/userLayout', title: 'User Profile',
                userName, admin, email, fullName, gender, dateOfBirth,age,currentWeight,desiredWeight,height,averageActivityLevel,country,state
            });
        }
    });

};

exports.postUserProfile = (req, res) => {

    console.log("****post user profile *********")
    let userId = req.session.userId;
    console.log(req.body,"---------req.body");
    const { fullName, Gender, dateOfBirth, age, email, currentWeight, desiredWeight, height, myList, country, state } = req.body;
    console.log(fullName, Gender, dateOfBirth, age, email, currentWeight, desiredWeight, height, myList, country, state )
    const [year, month, date] = dateOfBirth.split("-")
    const dateFormat = month+'/'+date+'/'+year
    let errors = [];
    if (!fullName || !Gender || !dateFormat || !age || !email || !currentWeight || !desiredWeight || !height || !myList || !country || !state) {
        const averageActivityLevel = myList
        errors.push("Please enter all fields")
        res.render('userViews/userProfile', {
            layout: 'layouts/userLayout', title: 'User Profile',
            fullName, email, fullName, gender, dateFormat,age,currentWeight,desiredWeight,height,averageActivityLevel,country,state, errors
        });
    }
    const profileQuery = `UPDATE happyhealth.usertbl
        SET email = '${email}', fullName = '${fullName}',averageActivityLevel='${myList}',gender='${Gender}',dateOfBirth='${dateFormat}',age='${age}',
        currentWeight='${currentWeight}',desiredWeight='${desiredWeight}',height='${height}',country='${country}',state='${state}'
        WHERE userId = '${userId}';`;
    db.query(profileQuery, function (err, result) {
        if (err) {
            console.log(err,"------profile update error");
        } else { 
            res.redirect('/userHome');
        }
    });

};



exports.getUserStep = (req, res) => {
    let userId = req.session.userId;
const stetpQuery = `Select stepCount, stepDistance, stepGoal from happyhealth.usermetricstbl where UserId = ${userId};`;
db.query(stetpQuery, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result, '--------db user table result');
        //console.log("result "+result[0]);
        const { stepCount, stepDistance,stepGoal } = result[0];
        //console.log("ddd   "+stepCount)
        res.render('userViews/userStep', { layout: 'layouts/userLayout', title: 'User Step',
        stepCount, stepDistance, stepGoal
        });
    }
});

};

exports.postUserStep = (req, res) => {
    const userId = req.session.userId;
    const { stepCount, stepDistance, stepGoal } = req.body;
    let errors = [];
    if (!stepCount || !stepDistance || !stepGoal) {
        console.log(`inside if statement ${stepCount}, ${stepDistance}`);
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userStep', { layout: 'layouts/userLayout', title: 'User Step', errors });
        return
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl SET stepCount = ${stepCount}, stepDistance = ${stepDistance}, stepGoal = ${stepGoal} WHERE userId = ${userId};`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};


exports.getUserSleep = (req, res) => {
    let userId = req.session.userId;
    const sleepHours = `Select sleepHours,sleepGoal from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(sleepHours, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            //console.log("result "+result[0]);
            const { sleepHours,sleepGoal } = result[0];
            //console.log("ddd   "+sleepHours)
            res.render('userViews/userSleep', { layout: 'layouts/userLayout', title: 'User Sleep',
            sleepHours,sleepGoal
            });
        }
    });
    
    };
    
exports.postUserSleep = (req, res) => {
    let userId = req.session.userId;
    const { sleepHours, sleepGoal } = req.body;

    console.log(`inside post user sleep: ${sleepHours}  ${sleepGoal}`);
    let errors = [];
    if (!sleepHours || !sleepGoal) {
        console.log(`inside if statement ${sleepHours}`);
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userSleep', { layout: 'layouts/userLayout', title: 'User Sleep', errors });
        return;
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET sleepHours = ${sleepHours}, sleepGoal = ${sleepGoal} WHERE userId = ${userId};`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};


exports.getUserHydration = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select water from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            //console.log("result "+result[0]);
            const { water } = result[0];
            //console.log("ddd   "+water)
            res.render('userViews/userHydration', { layout: 'layouts/userLayout', title: 'User Hydration',
            water
            });
        }
    });
    
    };


exports.postUserHydration = (req, res) => {
    let userId = req.session.userId;
    const { water, goal } = req.body;
    console.log(`inside post user hyration`);
    let errors = [];
    if (!water || !goal) {
        console.log(`inside if statement ${water}`);
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userHydration', { layout: 'layouts/userLayout', title: 'User Hydration', errors });
        return 
    }
    var hydrationQuery = `UPDATE happyhealth.usermetricstbl
        SET water = ${water}, waterGoal = ${goal} WHERE userId = ${userId} ;`;
    db.query(hydrationQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });
};

exports.getUserTrack = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select meTime,meTimeGoal from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            //console.log("result "+result[0]);
            const { meTime,meTimeGoal } = result[0];
            //console.log("ddd   "+meTime)
            res.render('userViews/userTrack', { layout: 'layouts/userLayout', title: 'User Track',
            meTime,meTimeGoal
            });
        }
    });
    
    };


exports.postUserTrack = (req, res) => {
    let userId = req.session.userId;
    const { meTime, meTimeGoal } = req.body;
    console.log(`inside post user track`);
    let errors = [];
    if (!meTime || !meTimeGoal) {
        console.log(`inside if statement ${meTime}`);
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userTrack', { layout: 'layouts/userLayout', title: 'User Track' });
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET meTime = ${meTime}, meTimeGoal = ${meTimeGoal} WHERE userId = ${userId};`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};

exports.getUserFruits = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select fruits,fruitgoal from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            //console.log("result "+result[0]);
            const { fruits,fruitgoal } = result[0];
            //console.log("ddd   "+fruits)
            res.render('userViews/userFruits', { layout: 'layouts/userLayout', title: 'User Fruits',
            fruits,fruitgoal
            });
        }
    });

};


exports.postUserFruits = (req, res) => {
    let userId = req.session.userId;
    const { fruits, fruitgoal } = req.body;
    console.log("-------post user Fruits controller");
    let errors = [];
    if (!fruits || !fruitgoal) {
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userFruits', { layout: 'layouts/userLayout', title: 'User Fruits' });
    }
    var fruitQuery = `UPDATE happyhealth.usermetricstbl
        SET fruits = ${fruits}, fruitGoal = ${fruitgoal} WHERE userId = ${userId};`;
    db.query(fruitQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};

exports.getUserVegetables = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select veggies from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            const { veggies } = result[0];
            //console.log("ddd   "+veggies)
            res.render('userViews/userVegetables', { layout: 'layouts/userLayout', title: 'User Vegetables',
            veggies
            });
        }
    });

};


exports.postUserVegetables = (req, res) => {
    let userId = req.session.userId;
    const { veggies, goal } = req.body;
    console.log("-------post user Vegetables controller");
    let errors = [];
    if (!veggies || !goal) {
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userVegetables', { layout: 'layouts/userLayout', title: 'User Vegetables' });
    }
    var vegQuery = `UPDATE happyhealth.usermetricstbl SET veggies = ${veggies}, veggieGoal = ${goal} WHERE userId = ${userId};`;
    db.query(vegQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};




exports.getUserChallenges = (req, res) => {
    res.render('userViews/userChallenges', {
        layout: "layouts/userLayout",
        title: "User Management"
    });
};


exports.getUserMoreChallenges = (req, res) => {
    res.render('userViews/user_more_challenges', {
        layout: "layouts/userLayout",
        title: "User Management"
    });
};

exports.getNotifications = (req, res) => {
    res.render('userViews/notifications',{
        layout: 'layouts/userLayout',
        title: 'User Management'

    });
};



exports.getUserGroups = (req,res) =>{
    const q = `SELECT * FROM happyhealth.grouptbl;`

    db.query(q, function (err,result) {
        if(err) throw err;
        else{
            console.log(result)
        }
        res.render('userViews/userGroups', { result, layout:'layouts/userLayout', title:'Groups '})

    })
}
