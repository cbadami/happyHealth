const db = require('../../database');
var mysql = require('mysql');
// const db1 =  mysql.createConnection({host: '127.0.0.1',user: 'root',password: 'password',database: 'happyhealth',port: 3306, multipleStatements: true});
const fastcsv = require('fast-csv');
const fs = require('fs');
// var ws = fs.createWriteStream('./usermetrics_mysql_fastcsv.csv');
const path = require("path");
var express = require('express');
var app = express();

app.use("/files", express.static(__dirname+"/files"));

// const db1 =  mysql.createConnection({host: '127.0.0.1',user: 'root',password: 'password',database: 'happyhealth',port: 3306, multipleStatements: true});

exports.getUserTotalMetrics = (req, res) => {

    const userId = req.params.userId;
    const dayQuery = 
    `SELECT usermetricstbl.userId, usertbl.fullName,
    usermetricstbl.stepCount as stepCount,
    usermetricstbl.sleepHours as sleepHours,                      
    usermetricstbl.meTime as meTime, 
    usermetricstbl.fruits as fruits,
    usermetricstbl.veggies as veggies,
    usermetricstbl.water as water,
    usermetricstbl.physicalActivityMinutes as physicalActivityMinutes
    from usertbl inner join usermetricstbl on usertbl.userId = usermetricstbl.userId 
    where
    usermetricstbl.userId = ${userId} 
    AND
    DAY(STR_TO_DATE(usermetricstbl.date, '%m/%d/%y')) = DAY(curdate())
    group by 
    usermetricstbl.userId;`

    const allMetricsQuery = 
    `SELECT 
    SUM( usermetricstbl.stepCount) as total,
    SUM( usermetricstbl.sleepHours) as totalSleep,
    SUM( usermetricstbl.meTime) as totalMe,
    SUM( usermetricstbl.fruits) as totalFruits,
    SUM( usermetricstbl.veggies) as totalVeggies,
    SUM( usermetricstbl.water) as totalWater,
    SUM( usermetricstbl.physicalActivityMinutes) as totalphysicalActivityMinutes
    from 
    usertbl inner join usermetricstbl on usertbl.userId =  usermetricstbl.userId
    where
    usermetricstbl.userId = ${userId} 
    group by 
    usermetricstbl.userId;`

   
    db.query(dayQuery + allMetricsQuery, function (err, result) {
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

    // console.log(req.query.datepicker1);
    // console.log(req.query.datepicker2);
    const user = req.params.userId;
    
    const startDate = req.query.datepicker1;
    const endDate = req.query.datepicker2;
    
    console.log("startdate: ", startDate);
    console.log("enddate: ", endDate);
    console.log("userId: ",user);
    //console.log(req);
    var query = 
    `SELECT 
    SUM( usermetricstbl.stepCount) as total,
    SUM( usermetricstbl.sleepHours) as totalSleep,
    SUM( usermetricstbl.meTime) as totalMe,
    SUM( usermetricstbl.fruits) as totalFruits,
    SUM( usermetricstbl.veggies) as totalVeggies,
    SUM( usermetricstbl.water) as totalWater,
    SUM( usermetricstbl.physicalActivityMinutes) as totalphysicalActivityMinutes
    from 
    usermetricstbl
    where
    (usermetricstbl.userId = ${user}
    AND
    STR_TO_DATE(usermetricstbl.date, "%m/%d/%Y")
    BETWEEN
    '${startDate}' AND '${endDate}');`

    const obj = {datepicker1: startDate, datepicker2: endDate};
    
    db.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            result.push(obj);
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
                    usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal,
                    usermetricstbl.physicalActivityMinutes, usermetricstbl.physicalActivityGoal
                 
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

exports.getCSV = (req, res) => {

   
    db.query("SELECT * FROM happyhealth.usermetricstbl", function(error, data, fields) {
   
       const jsonData = JSON.parse(JSON.stringify(data));
       console.log("jsonData", jsonData);
   
       var ws = fs.createWriteStream('files/usermetrics_mysql_fastcsv.csv');

       fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
             console.log("Write to usermetrics_mysql_fastcsv.csv successfully!");
             
           })
           .pipe(ws);
           
           
           


        
        // res.header('Content-Type', 'text/csv');
        // res.attachment('usermetrics_mysql_fastcsv.csv');  
        // res.sendFile(path.resolve('./usermetrics_mysql_fastcsv.csv')); 
    
    // path.join(__dirname, './', 'usermetrics_mysql_fastcsv.csv')    
    // converter.json2csv(jsonData, (err, csv) =>{

    //     if(err)
    //         throw err;

    //     console.log(csv);    
    //     //res.header('Content-Type', 'text/csv');
    //     res.attachment('data.csv');
    //     res.send(csv);
    // });
          
        //    const filePath = './usermetrics_mysql_fastcsv.csv';
        //    res.header('Content-Type', 'text/csv');
        //    res.attachment('data.cs'); 
        //    res.send(filePath);
           //res.download(filePath);
           //res.download('./usermetrics_mysql_fastcsv.csv','usermetrics_mysql_fastcsv.csv');
           
           res.render('adminViews/CSVManagement', {
            layout: 'layouts/adminLayout',
            title: 'Admin Analytics',
            obj: data
            });

            res.send("<a href=/files/usermetrics_mysql_fastcsv.csv download='usermetrics_mysql_fastcsv.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script> ")
                .on("finish",function(){
                    console.log("finished downloading");
                });
        });
  
}

exports.getAdminAnalytics = (req, res) => {
    var query = `select 
                 usertbl.userId,usertbl.UserName, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, 
                 usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                 usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                 usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal, 
                 usermetricstbl.physicalActivityMinutes, usermetricstbl.physicalActivityGoal
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