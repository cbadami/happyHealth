const db = require('../../database');
var mysql = require('mysql');

exports.getUserTotalMetrics = async (req, res) => {

    const userId = req.params.userId;
    const dayQuery =
        `SELECT usermetricstbl.userId,
         usertbl.fullName, 
         usermetricstbl.stepCount as stepCount,
         usermetricstbl.sleepHours as sleepHours,
         usermetricstbl.meTime as meTime, 
         usermetricstbl.fruits as fruits, 
         usermetricstbl.veggies as veggies, 
         usermetricstbl.water as water 
         from usertbl inner join usermetricstbl on usertbl.userId = usermetricstbl.userId 
         where usermetricstbl.userId = ${userId} group by usermetricstbl.userId;`;

    const allMetricsQuery =
        `SELECT SUM( usermetricstbl.stepCount) as total,
         SUM( usermetricstbl.sleepHours) as totalSleep, 
         SUM( usermetricstbl.meTime) as totalMe, 
         SUM( usermetricstbl.fruits) as totalFruits,
         SUM( usermetricstbl.veggies) as totalVeggies,
         SUM( usermetricstbl.water) as totalWater 
         from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId 
         where usermetricstbl.userId = ${userId} group by usermetricstbl.userId;`;


    await db.query(dayQuery, async function (err, dayResult) {
        if (err) {
            throw err;
        }

        console.log(dayResult, "---------result");
        await db.query(allMetricsQuery, (err, allResult) => {

            if (err) {
                console.log(err, "----all metrics error");
            }
            console.log(allResult, "----all result");
            let result = [1, 2];
            result[0] = dayResult;
            result[1] = allResult;
            console.log(result[0][0], '------------db usermetricstbl result');
            console.log(result[1][0], '------------db userstbl result');
            res.render('adminViews/adminTotalMetrics', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                result
            });
            console.log('****get Total metrics executed successfully****');
        });
    });
};

exports.getData = (req, res) => {

    const user = req.params.userId;

    const startDate = req.query.datepicker1;
    const endDate = req.query.datepicker2;

    console.log("startdate: ", startDate);
    console.log("enddate: ", endDate);
    console.log("userId: ", user);

    var query =
        `SELECT 
    SUM( usermetricstbl.stepCount) as total,
    SUM( usermetricstbl.sleepHours) as totalSleep,
    SUM( usermetricstbl.meTime) as totalMe,
    SUM( usermetricstbl.fruits) as totalFruits,
    SUM( usermetricstbl.veggies) as totalVeggies,
    SUM( usermetricstbl.water) as totalWater
    from 
    usermetricstbl
    where
    (usermetricstbl.userId = ${user}
    AND
    STR_TO_DATE(usermetricstbl.date, "%m/%d/%Y")
    BETWEEN
    '${startDate}' AND '${endDate}');`;


    db.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("result: ", result);
            res.render('adminViews/adminMetricsDate', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                result
            });
        }
    });
};

exports.monthly = (req, res) => {

    var query = `select 
                    usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                    usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                    usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                    usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                    from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where MONTH(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = MONTH(curdate());`;

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            res.render('adminViews/monthlyAnalytics', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};

exports.daily = (req, res) => {

    var query = `select 
                    usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                    usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                    usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                    usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                    from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate());`;

    db.query(query, function (err, result) {
        if (err) throw err;
        else {

            res.render('adminViews/dailyAnalytics', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',

            });
        }
    });
};

exports.weekely = (req, res) => {

    var query = `select 
                    usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                    usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                    usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                    usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                    from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where WEEK(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = WEEK(curdate());`;

    db.query(query, function (err, result) {
        if (err) throw err;
        else {

            res.render('adminViews/weekelyAnalytics', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};


exports.getAdminAnalytics = (req, res) => {
    var query = `select 
                 usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                 usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                 usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                 usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                 from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate());`;

    db.query(query, function (err, result) {
        if (err) throw err;
        else {

            res.render('adminViews/adminAnalyticsOverAll', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });

};


exports.getAdminAnalyticsOverAll = (req, res) => {

    var query = `select usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                 usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                 usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                 from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`;

    db.query(query, function (err, result) {
        if (err) throw err;
        else {

            res.render('adminViews/adminAnalyticsOverAll', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};