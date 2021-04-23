//const db = require('../../database');
const pooldb = require('../../pooldb');
const CsvParser = require("json2csv").Parser;
// const resetC = require("../resetMetrics")

// resetC.resetMetrics ()

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
                    let result = [
                        [1],
                        [2]
                    ];
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


                conn.release();
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
            const userId = req.params.userId;

            const startDate = req.query.datepicker1;
            const endDate = req.query.datepicker2;

            console.log("startdate: -------------------> start date: ", startDate);
            console.log("enddate: ", endDate);
            console.log("userId: ", userId);
            //console.log(req);
            var query =
                `SELECT SUM( usermetricstbl.stepCount) as total, SUM( usermetricstbl.sleepHours) as totalSleep, SUM( usermetricstbl.meTime) as totalMe, SUM( usermetricstbl.fruits) as totalFruits, SUM( usermetricstbl.veggies) as totalVeggies, SUM( usermetricstbl.water) as totalWater, SUM( usermetricstbl.physicalActivityMinutes) as  totalphysicalActivityMinutes from usermetricstbl where (usermetricstbl.userId = ${userId} AND STR_TO_DATE(usermetricstbl.date, "%m/%d/%Y") BETWEEN '${startDate}' AND '${endDate}');`;


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
                        endDate,
                        userId
                    });
                }
            });

            conn.release();
        }
    });

};

exports.getDataForDate = (req, res) => {

    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {

            const date = req.query.datepicker;


            console.log("date: ", date);

            var query =
                `select 
                usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal, usermetricstbl.physicalActivityMinutes 
                from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where STR_TO_DATE(usermetricstbl.date, "%m/%d/%Y") = '${date}'`;


            conn.query(query, function (err, result) {
                if (err) {
                    throw err;
                } else {

                    console.log("result: -------------> Now", result);
                    res.render('adminViews/adminAnalyticsOverAllDate', {
                        layout: 'layouts/adminLayout',
                        title: 'Admin Analytics',
                        obj: result,
                        date
                    });
                }
            });

            conn.release();
        }
    });

};

exports.getAdminAnalytics = (req, res) => {


    let currentDate = req.query.datepicker;

    console.log(currentDate, "------------------ query date");
    if (!currentDate) {
        currentDate = new Date().toLocaleDateString();
        console.log(currentDate, "-------current date");

        let [m, d, y] = currentDate.split("/");
        m = m.length == 1 ? "0" + m : m;
        d = d.length == 1 ? "0" + d : d;
        currentDate = [m, d, y].join('/');
        console.log(currentDate, "---------cuurent date after formation");
    } else {
        // 2021-04-19 04/20/2021

        let [y, m, d] = currentDate.split('-');
        currentDate = [m, d, y].join('/');
        console.log(currentDate, "---------query date after formation");

    }

    pooldb.getConnection((err1, conn) => {
        if (err1) {
            console.log(err1, '=====> error occured');
        } else {

            var query = `select 
            usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
            usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
            usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
            usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal, usermetricstbl.physicalActivityMinutes 
            from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where usermetricstbl.date = '${currentDate}'`;

            conn.query(query, function (err, result) {
                if (err) throw err;
                else {
                    //console.log(result);



                    res.render('adminViews/adminAnalyticsOverAll', {
                        layout: 'layouts/adminLayout',
                        title: 'Admin Analytics',
                        obj: result,
                        currentDate
                    });
                }
            });

            conn.release();
        }
    });

};

exports.download = (req, res) => {

    let currentDate = req.query.datepicker;

    console.log(currentDate, "------------------ query date");
    if (!currentDate) {
        currentDate = new Date().toLocaleDateString();
        console.log(currentDate, "-------current date");

        let [m, d, y] = currentDate.split("/");
        m = m.length == 1 ? "0" + m : m;
        d = d.length == 1 ? "0" + d : d;
        currentDate = [m, d, y].join('/');
        console.log(currentDate, "---------cuurent date after formation");
    } else {
        // 2021-04-19 04/20/2021

        let [y, m, d] = currentDate.split('-');
        currentDate = [m, d, y].join('/');
        console.log(currentDate, "---------query date after formation");

    }

    let query = `select usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal, usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal, usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal, usermetricstbl.physicalActivityMinutes, usermetricstbl.physicalActivityGoal from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where usermetricstbl.date='${currentDate}';`;


    pooldb.getConnection((err, conn) => {

        if (err) {
            console.log(err, "----------------Error in connecting to databse");
            return;
        }

        conn.query(query, function (err, result) {

            conn.release();
            if (err) {
                console.log(err, "-------------------Error in querying to databse");
                return;
            };

            console.log(result, "-----------------------result");
            if (result.length == 0) {
                console.log("****************No data**************");
                res.status(200).json({
                    message: "No data"
                });
                return;
            }

            let userMetrics = [];
            result.forEach((r) => {
                const {
                    userId,
                    UserName,
                    fullName,
                    date,
                    stepCount,
                    stepGoal,
                    sleepHours,
                    sleepGoal,
                    meTime,
                    meTimeGoal,
                    water,
                    waterGoal,
                    veggies,
                    veggieGoal,
                    fruits,
                    fruitGoal,
                    physicalActivityMinutes,
                    physicalActivityGoal
                } = r;
                userMetrics.push({
                    userId,
                    UserName,
                    fullName,
                    date,
                    stepCount,
                    stepGoal,
                    sleepHours,
                    sleepGoal,
                    meTime,
                    meTimeGoal,
                    water,
                    waterGoal,
                    veggies,
                    veggieGoal,
                    fruits,
                    fruitGoal,
                    physicalActivityMinutes,
                    physicalActivityGoal
                });
            });

            const csvFields = ["userId", "date", "stepCount", "sleepCount"];
            const csvParser = new CsvParser({
                csvFields
            });
            const csvData = csvParser.parse(userMetrics);

            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=Reports.csv");

            res.status(200).end(csvData);
        });



    });
};