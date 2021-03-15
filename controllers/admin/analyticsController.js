const db = require('../../database');

exports.getUserTotalMetrics = (req, res) => {

    const userId = req.params.userId;
    const allMetricsQuery = `SELECT usermetricstbl.userId, usertbl.fullName, SUM(DISTINCT usermetricstbl.stepCount) as total, AVG(DISTINCT usermetricstbl.stepCount) as average, SUM(DISTINCT usermetricstbl.sleepHours) as totalSleep, AVG(DISTINCT usermetricstbl.sleepHours) as avgSleep, SUM(DISTINCT usermetricstbl.meTime) as totalMe, AVG(DISTINCT usermetricstbl.meTime) as avgMe, SUM(DISTINCT usermetricstbl.fruits) as totalFruits, AVG(DISTINCT usermetricstbl.fruits) as avgFruits, SUM(DISTINCT usermetricstbl.veggies) as totalVeggies, AVG(DISTINCT usermetricstbl.veggies) as avgVeggies, SUM(DISTINCT usermetricstbl.water) as totalWater, AVG(DISTINCT usermetricstbl.water) as avgWater from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId  AND usertbl.userId = ${userId} group by usermetricstbl.userId`;
    db.query(allMetricsQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(`${JSON.stringify(result)}`, '------------db users result');
            res.render('adminViews/adminTotalMetrics', {
                layout: 'layouts/adminLayout',
                title: 'User Management',
                result
            })
            console.log('****getUserManagement executed successfully****');
        }
    });
}

exports.monthly = (req, res) => {

    var query = `select 
                    usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                    usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                    usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                    usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                    from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where MONTH(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = MONTH(curdate());`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            //console.log(result);
            //console.log("monthly");
            res.render('adminViews/monthlyAnalytics', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
}

exports.daily = (req, res) => {

    var query = `select 
                    usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                    usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                    usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                    usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                    from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate());`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            //console.log(result);
            //console.log("daily");
            res.render('adminViews/dailyAnalytics', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
}

exports.weekely = (req, res) => {

    var query = `select 
                    usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                    usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                    usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                    usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                    from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where WEEK(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = WEEK(curdate());`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            // console.log(result);
            // console.log("monthly");
            res.render('adminViews/weekelyAnalytics', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
}

// exports.getCSV = (req, res) => {

    
//     //res.render("CSVManagement");

    
//     db.query("SELECT * FROM happyhealth.usermetricstbl", function(error, data, fields) {
    
//        const jsonData = JSON.parse(JSON.stringify(data));
//        console.log("jsonData", jsonData);
     
//        fastcsv
//           .write(jsonData, { headers: true })
//           .on("finish", function() {
//              console.log("Write to usermetrics_mysql_fastcsv.csv successfully!");
//            })
//            .pipe(ws);


//            res.render('adminViews/CSVManagement', {
//             layout: 'layouts/adminLayout',
//             title: 'Admin Analytics',
//             obj: data
//             });
//         });


        
// }

exports.getAdminAnalytics = (req, res) => {
    var query = `select 
                 usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                 usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                 usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                 usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                 from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            //console.log(result);

            res.render('adminViews/adminAnalyticsOverAll', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
    // res.render('adminViews/adminAnalytics'
    // , {
    //     layout: 'layouts/adminLayout',
    //     title: 'Admin Analytics'
    // }
    // );
};


exports.getAdminAnalyticsOverAll = (req, res) => {

    //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


    var query = `select usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                 usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                 usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                 from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            //console.log(result);

            res.render('adminViews/adminAnalyticsOverAll', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};