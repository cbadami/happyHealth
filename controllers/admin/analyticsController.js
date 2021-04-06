//const db = require('../../database');
const pooldb = require('../../pooldb');

exports.getUserTotalMetrics = (req, res) => {
    pooldb.getConnection(async (err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {
            const userId = req.params.userId;
            const dayQuery =
                `SELECT usermetricstbl.userId, usertbl.fullName, usermetricstbl.stepCount as stepCount, usermetricstbl.sleepHours as sleepHours, usermetricstbl.meTime as meTime, usermetricstbl.fruits as fruits, usermetricstbl.veggies as veggies, usermetricstbl.water as water, usermetricstbl.physicalActivityMinutes as physicalActivityMinutes from usertbl inner join usermetricstbl on usertbl.userId = usermetricstbl.userId where usermetricstbl.userId = ${userId};`;

            const allMetricsQuery =
                `SELECT SUM( usermetricstbl.stepCount) as total, SUM( usermetricstbl.sleepHours) as totalSleep, SUM( usermetricstbl.meTime) as totalMe, SUM( usermetricstbl.fruits) as totalFruits, SUM( usermetricstbl.veggies) as totalVeggies, SUM( usermetricstbl.water) as totalWater, SUM(usermetricstbl.physicalActivityMinutes) as totalActivity from usermetricstbl where usermetricstbl.userId = ${userId} group by usermetricstbl.userId;`;


            await conn.query(dayQuery, async function (err, dayResult) {
                if (err) {
                    throw err;
                }
                // dayResult = JSON.stringify(dayResult);  
                // dayResult = JSON.parse(result);
                console.log(dayResult, "---------result");
                await conn.query(allMetricsQuery, (err, allResult) => {

                    if (err) {
                        console.log(err, "----all metrics error");
                    }
                    console.log(allResult, "----all result");
                    let result = [[1], [2]];
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


                conn.release()
            });

        }
    });


};

exports.getData = (req, res) => {

    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {

            // console.log(req.query.datepicker1);
            // console.log(req.query.datepicker2);
            const user = req.params.userId;

            const startDate = req.query.datepicker1;
            const endDate = req.query.datepicker2;

            console.log("startdate: ", startDate);
            console.log("enddate: ", endDate);
            console.log("userId: ", user);
            //console.log(req);
            var query =
                `SELECT SUM( usermetricstbl.stepCount) as total, SUM( usermetricstbl.sleepHours) as totalSleep, SUM( usermetricstbl.meTime) as totalMe, SUM( usermetricstbl.fruits) as totalFruits, SUM( usermetricstbl.veggies) as totalVeggies, SUM( usermetricstbl.water) as totalWater, SUM( usermetricstbl.physicalActivityMinutes) as  totalphysicalActivityMinutes from usermetricstbl where (usermetricstbl.userId = ${user} AND STR_TO_DATE(usermetricstbl.date, "%m/%d/%Y") BETWEEN '${startDate}' AND '${endDate}');`;


            conn.query(query, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    // result[1].datepicker1 = startDate;
                    // result[1].datepicker2 = endDate;
                    console.log("result: ", result);
                    res.render('adminViews/adminMetricsDate', {
                        layout: 'layouts/adminLayout',
                        title: 'Admin Analytics',
                        result,
                        startDate,
                        endDate
                    });
                }
            });

            conn.release()
        }
    });

};

exports.monthly = (req, res) => {

    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {
            var query = `select 
            usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
            usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
            usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
            usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
            from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where MONTH(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = MONTH(curdate());`;

            conn.query(query, function (err, result) {
                if (err) throw err;
                else {
                    res.render('adminViews/monthlyAnalytics', {
                        layout: 'layouts/adminLayout',
                        title: 'Admin Analytics',
                        obj: result
                    });
                }
            });

            conn.release()
        }
    });


};


//     pooldb.getConnection((err1, conn) => {
// 	if (err1) {
// 		console.log(err1, '=====> error occured');
// 	} else {

// 	}
// });

exports.daily = (req, res) => {

    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {
            var query = `select 
            usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
            usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
            usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
            usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
            from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate());`;

            conn.query(query, function (err, result) {
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

            conn.release()
        }
    });


};

exports.weekely = (req, res) => {

    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {
            var query = `select 
            usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
            usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
            usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
            usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
            from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where WEEK(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = WEEK(curdate());`;

            conn.query(query, function (err, result) {
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

            conn.release();
        }
    });


};

// exports.getCSV = (req, res) => {


//     //res.render("CSVManagement");


//     conn.query("SELECT * FROM happyhealth.usermetricstbl", function(error, data, fields) {

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

    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {

            var query = `select 
            usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
            usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
            usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
            usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal, usermetricstbl.physicalActivityMinutes 
            from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate());`;

            conn.query(query, function (err, result) {
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


            conn.release()
        }
    });


};


exports.getAdminAnalyticsOverAll = (req, res) => {

    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {
            //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`
            var query = `select usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                 usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                 usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                 from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`;

            conn.query(query, function (err, result) {
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

            conn.release()
        }
    });

};
