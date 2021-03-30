const db = require('../../database');
const CsvParser = require("json2csv").Parser;

exports.getUserTotalMetrics = async (req, res) => {

    const userId = req.params.userId;
    const dayQuery =
        `SELECT usermetricstbl.userId, usertbl.fullName, usermetricstbl.stepCount as stepCount, usermetricstbl.sleepHours as sleepHours, usermetricstbl.meTime as meTime, usermetricstbl.fruits as fruits, usermetricstbl.veggies as veggies, usermetricstbl.water as water, usermetricstbl.physicalActivityMinutes as physicalActivityMinutes from usertbl inner join usermetricstbl on usertbl.userId = usermetricstbl.userId where usermetricstbl.userId = ${userId};`;

    const allMetricsQuery =
        `SELECT SUM( usermetricstbl.stepCount) as total, SUM( usermetricstbl.sleepHours) as totalSleep, SUM( usermetricstbl.meTime) as totalMe, SUM( usermetricstbl.fruits) as totalFruits, SUM( usermetricstbl.veggies) as totalVeggies, SUM( usermetricstbl.water) as totalWater, SUM(usermetricstbl.physicalActivityMinutes) as totalActivity from usermetricstbl where usermetricstbl.userId = ${userId} group by usermetricstbl.userId;`;


    await db.query(dayQuery, async function (err, dayResult) {
        if (err) {
            throw err;
        }
        // dayResult = JSON.stringify(dayResult);  
        // dayResult = JSON.parse(result);
        console.log(dayResult, "---------result");
        await db.query(allMetricsQuery, (err, allResult) => {

            if (err) {
                console.log(err, "----all metrics error");
            }
            console.log(allResult, "----all result");
            let result = [[1],[2]];
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
        `SELECT SUM( happyhealth.usermetricstbl.stepCount) as total, SUM( happyhealth.usermetricstbl.sleepHours) as totalSleep, SUM( happyhealth.usermetricstbl.meTime) as totalMe, SUM( happyhealth.usermetricstbl.fruits) as totalFruits, SUM( happyhealth.usermetricstbl.veggies) as totalVeggies, SUM( happyhealth.usermetricstbl.water) as totalWater, SUM( happyhealth.usermetricstbl.physicalActivityMinutes) as  totalphysicalActivityMinutes from happyhealth.usermetricstbl where (happyhealth.usermetricstbl.userId = ${user} AND STR_TO_DATE(usermetricstbl.date, "%m/%d/%Y") BETWEEN '${startDate}' AND '${endDate}');`;


    db.query(query, function (err, result) {
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
};



exports.getAdminAnalytics = (req, res) => {
    var query = `select 
                 usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                 usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                 usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                 usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal, usermetricstbl.physicalActivityMinutes 
                 from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate());`;

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



exports.download = (req, res) => {


    let query = `select 
    usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
    usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
    usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
    usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal, usermetricstbl.physicalActivityMinutes 
    from usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId where DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate());`;

    db.query(query, function (err, result) {
        if (err) throw err;

        console.log(result, "------result");

        let userMetrics = [];
        result.forEach((r) => {
            const { userId, date,stepCount, sleepCount } = r;
            userMetrics.push({ userId,date, stepCount, sleepCount });
        });

        const csvFields = ["userId", "date", "stepCount", "sleepCount"];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(userMetrics);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");

        res.status(200).end(csvData);

    });

};