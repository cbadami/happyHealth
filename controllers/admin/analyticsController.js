const db = require('../../database');
var mysql = require('mysql');
const db1 =  mysql.createConnection({host: '127.0.0.1',user: 'root',password: 'password',database: 'happyhealth',port: 3306, multipleStatements: true});

exports.getUserTotalMetrics = (req, res) => {

    const userId = req.params.userId;
    const dayQuery = 
    `SELECT usermetricstbl.userId, usertbl.fullName,
    usermetricstbl.stepCount as stepCount,
    usermetricstbl.sleepHours as sleepHours,                      
    usermetricstbl.meTime as meTime, 
    usermetricstbl.fruits as fruits,
    usermetricstbl.veggies as veggies,
    usermetricstbl.water as water
    from usertbl inner join usermetricstbl on usertbl.userId = usermetricstbl.userId where
    usermetricstbl.userId = ${userId} 
    group by 
    usermetricstbl.userId;`

    const allMetricsQuery = 
    `SELECT 
    SUM( usermetricstbl.stepCount) as total,
    SUM( usermetricstbl.sleepHours) as totalSleep,
    SUM( usermetricstbl.meTime) as totalMe,
    SUM( usermetricstbl.fruits) as totalFruits,
    SUM( usermetricstbl.veggies) as totalVeggies,
    SUM( usermetricstbl.water) as totalWater
    from 
    usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId
    where
    usermetricstbl.userId = ${userId} 
    group by 
    usermetricstbl.userId;`

   
    db1.query(dayQuery + allMetricsQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            result = JSON.stringify(result);  
            result = JSON.parse(result);
            console.log(result[0][0], '------------db usermetricstbl result');
            console.log(result[1][0], '------------db userstbl result');
            res.render('adminViews/adminTotalMetrics', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                result
            })
            console.log('****get Total metrics executed successfully****');
        }
    });
}

exports.getData = (req, res) => {

    console.log(req.body);
    const userId = req.body.userId;
    const startDate = req.body.datepicker1;
    const endDate = req.body.datepicker2;
    console.log("startdate: ", startDate);
    console.log("enddate: ", endDate);
    console.log("userId: ",userId);
    var query = 
    `SELECT 
    SUM( happyhealth.usermetricstbl.stepCount) as total,
    SUM( happyhealth.usermetricstbl.sleepHours) as totalSleep,
    SUM( happyhealth.usermetricstbl.meTime) as totalMe,
    SUM( happyhealth.usermetricstbl.fruits) as totalFruits,
    SUM( happyhealth.usermetricstbl.veggies) as totalVeggies,
    SUM( happyhealth.usermetricstbl.water) as totalWater
    from 
    happyhealth.usermetricstbl
    where
    happyhealth.usermetricstbl.userId = ${userId};`

              
    db.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("result: ",result)
            res.render('adminViews/adminMetricsDate', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                result
            })
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
                //obj: result
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
                 from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate());`

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