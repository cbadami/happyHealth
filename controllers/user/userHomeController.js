const db = require('../../database');
const moment = require('moment');

exports.getUserHome = (req, res) => {
    let userId = req.session.userId;
    const homeQuery = `Select * from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(homeQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db userMetrics table result');
            const { stepCount, sleepHours,   water,  meTime, fruits, veggies, physicalActivityMinutes} = result[0];
            res.render('userViews/userHome', {
                layout: 'layouts/userLayout',
                title: 'User Home',
                stepCount,
                sleepHours,
                water,
                meTime,
                fruits,
                veggies,
				physicalActivityMinutes
            });
        }
    });

};

exports.getUserStep = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select stepCount, stepGoal from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            //console.log("result "+result[0]);
            const {
                stepCount,
                stepGoal
            } = result[0];
            //console.log("ddd   "+stepCount)
            res.render('userViews/userStep', {
                layout: 'layouts/userLayout',
                title: 'User Step',
                stepCount,
                stepGoal
            });
        }
    });

};

exports.postUserStep = (req, res) => {
    const userId = req.session.userId;
    const {
        stepCount,
        stepGoal
    } = req.body;
    let errors = [];


    if (!stepCount ||  !stepGoal) {
        console.log(`inside if statement ${stepCount}, `);
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userStep', {
            layout: 'layouts/userLayout',
            title: 'User Step',
            errors
        });
        return
    }
    
    var stepQuery = `UPDATE happyhealth.usermetricstbl SET stepCount = ${stepCount}, stepGoal = ${stepGoal} WHERE userId = ${userId} `;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userStep');
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
            const {
                sleepHours,
                sleepGoal
            } = result[0];
            //console.log("ddd   "+sleepHours)
            res.render('userViews/userSleep', {
                layout: 'layouts/userLayout',
                title: 'User Sleep',
                sleepHours,
                sleepGoal
            });
        }
    });

};

exports.postUserSleep = (req, res) => {
    let userId = req.session.userId;
    const {
        sleepHours,
        sleepGoal
    } = req.body;

    console.log(`inside post user sleep: ${sleepHours}  ${sleepGoal}`);
    let errors = [];
    if (!sleepHours || !sleepGoal) {
        console.log(`inside if statement ${sleepHours}`);
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userSleep', {
            layout: 'layouts/userLayout',
            title: 'User Sleep',
            errors
        });
        return;
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET sleepHours = ${sleepHours}, sleepGoal = ${sleepGoal} WHERE userId = ${userId};`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/home');
        }
    });

};


exports.getUserHydration = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select water,waterGoal from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            //console.log("result "+result[0]);
            const {
                water,
                waterGoal
            } = result[0];
            //console.log("ddd   "+water)
            res.render('userViews/userHydration', {
                layout: 'layouts/userLayout',
                title: 'User Hydration',
                water,
                waterGoal
            });
        }
    });

};


exports.postUserHydration = (req, res) => {
    let userId = req.session.userId;
    const {
        water,
        waterGoal
    } = req.body;
    console.log(`inside post user hyration`);
    let errors = [];
    if (!water || !waterGoal) {
        console.log(`inside if statement ${water}`);
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userHydration', {
            layout: 'layouts/userLayout',
            title: 'User Hydration',
            errors
        });
        return
    }
    let hydrationQuery = `UPDATE happyhealth.usermetricstbl
        SET water = ${water}, waterGoal = ${waterGoal} WHERE userId = ${userId} ;`;
    db.query(hydrationQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("----------susscesfully updated db");
            res.redirect('/home');
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
            const {
                meTime,
                meTimeGoal
            } = result[0];
            //console.log("ddd   "+meTime)
            res.render('userViews/userTrack', {
                layout: 'layouts/userLayout',
                title: 'User Track',
                meTime,
                meTimeGoal
            });
        }
    });

};


exports.postUserTrack = (req, res) => {
    let userId = req.session.userId;
    const {
        meTime,
        meTimeGoal
    } = req.body;
    console.log(`inside post user track`);
    let errors = [];
    if (!meTime || !meTimeGoal) {
        console.log(`inside if statement ${meTime}`);
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userTrack', {
            layout: 'layouts/userLayout',
            title: 'User Track'
        });
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET meTime = ${meTime}, meTimeGoal = ${meTimeGoal} WHERE userId = ${userId};`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/home');
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
            const {
                fruits,
                fruitgoal,
                
            } = result[0];
            //console.log("ddd   "+fruits)
            res.render('userViews/userFruits', {
                layout: 'layouts/userLayout',
                title: 'User Fruits',
                fruits,
                fruitgoal,
                
            });
        }
    });

};


exports.postUserFruits = (req, res) => {
    let userId = req.session.userId;
    const {
        fruits,
        fruitgoal
    } = req.body;
    console.log("-------post user Fruits n veg controller");
    let errors = [];
    if (!fruits || !fruitgoal ) {
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userFruits', {
            layout: 'layouts/userLayout',
            title: 'User Fruits'
        });
    }
    var fruitQuery = `UPDATE happyhealth.usermetricstbl
        SET fruits = ${fruits}, fruitGoal = ${fruitgoal} WHERE userId = ${userId};`;
    db.query(fruitQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/home');
        }
    });

};

exports.getUserVegetables = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select veggies,veggieGoal from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            const {
                
                veggies,
                veggieGoal
            } = result[0];
            //console.log("ddd   "+veggies)
            res.render('userViews/userVegetables', {
                layout: 'layouts/userLayout',
                title: 'User Vegetables',
               
                veggies,
                veggieGoal
            });
        }
    });

};


exports.postUserVegetables = (req, res) => {
    let userId = req.session.userId;
    const {
        
        veggies,
        veggieGoal
    } = req.body;
    console.log("-------post user Vegetables controller");
    let errors = [];
    if ( !veggies || !veggieGoal) {
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userVegetables', {
            layout: 'layouts/userLayout',
            title: 'User Vegetables'
        });
    }
    var vegQuery = `UPDATE happyhealth.usermetricstbl SET veggies = ${veggies}, veggieGoal = ${veggieGoal} WHERE userId = ${userId};`;
    db.query(vegQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/home');
        }
    });

};

exports.getUserPhysicalActivity = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select physicalActivityMinutes,physicalActivityGoal from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            const {
                physicalActivityMinutes,
                physicalActivityGoal
            } = result[0];
            res.render('userViews/userPhysicalActivity', {
                layout: 'layouts/userLayout',
                title: 'User Physical Activity',
                physicalActivityMinutes,
                physicalActivityGoal
            });
        }
    });

};


exports.postUserPhysicalActivity = (req, res) => {
    let userId = req.session.userId;
    const {
        physicalActivityMinutes,
        physicalActivityGoal
    } = req.body;
    console.log("-------post user Physical Activity controller");
    let errors = [];
    if (!physicalActivityMinutes || !physicalActivityGoal) {
        errors.push('Please enter all fields');
        console.log(errors, "----------------errros");
        res.render('userViews/userPhysicalActivity', {
            layout: 'layouts/userLayout',
            title: 'User Physical Activity'
        });
    }
    var ppQuery = `UPDATE happyhealth.usermetricstbl SET physicalActivityMinutes = ${physicalActivityMinutes}, physicalActivityGoal = ${physicalActivityGoal} WHERE userId = ${userId};`;
    db.query(ppQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/home');
        }
    });

};

exports.getUserPersonalProgress = (req, res) => {
    let userId = req.session.userId;
    const stetpQuery = `Select * from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(stetpQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db user table result');
            res.render('userViews/userPersonalProgress', {
                layout: 'layouts/userLayout',
                title: 'User Personal Progress',
                result
            });
        }
    });

};
