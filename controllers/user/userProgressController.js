// const db = require('../../database');
const pooldb = require('../../pooldb');
const moment = require('moment');

let currentDate = moment(new Date()).format('L').toString();

// exports.getUserProgress = (req, res) => {
// 	let userId = req.session.userId;
// 	const stetpQuery = `Select sum(stepCount) as stepCount, sum(stepGoal) as stepGoal, sum(sleepHours) as sleepHours, sum(sleepGoal) as sleepGoal,  sum(meTime) as meTime, sum(meTimeGoal) as meGoal, sum(water) as water, sum(waterGoal) as waterGoal, sum(fruits) as fruits, sum(fruitGoal) as fruitGoal, sum(veggies) as veggies, sum(veggieGoal) as veggieGoal, sum(physicalActivityMinutes) as physical, sum(physicalActivityGoal) as physicalGoal from happyhealth.usermetricstbl where UserId = ${userId};`;
// 	conn.query(stetpQuery, function (err, result) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			let u = result[0];
// 			let stats = {
// 				step: Math.round((u.stepCount / u.stepGoal) * 100 * 10) / 10,
// 				sleep: Math.round((u.sleepHours / u.sleepGoal) * 100 * 10) / 10,
// 				meTime: Math.round((u.meTime / u.meGoal) * 100 * 10) / 10,
// 				water: Math.round((u.water / u.waterGoal) * 100 * 10) / 10,
// 				fruits: Math.round((u.fruits / u.fruitGoal) * 100 * 10) / 10,
// 				veggies: Math.round((u.veggies / u.veggieGoal) * 100 * 10) / 10,
// 				physical: Math.round((u.physical / u.physicalGoal) * 100 * 10) / 10,
// 			};

// 			console.log(stats, '===========> step stat');

// 			console.log(result, '--------db user table result');
// 			res.render('userViews/userProgress', {
// 				layout: 'layouts/userLayout',
// 				title: 'User Personal Progress',
// 				result,
// 				stats,
// 			});
// 		}
// 	});
// };

exports.getTodayProgress = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.session.userId;

			const metricQuery = `Select * from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}';`;
			conn.query(metricQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db userMetrics table result');

					let u = result[0];
					let statsR = {
						step: Math.round((u.stepCount / u.stepGoal) * 100 * 10) / 10,
						sleep:  Math.round((u.sleepHours / u.sleepGoal) * 100 * 10) / 10,
						meTime: Math.round((u.meTime / u.meTimeGoal) * 100 * 10) / 10,
						water:  Math.round((u.water / u.waterGoal) * 100 * 10) / 10,
						fruits: Math.round((u.fruits / u.fruitGoal) * 100 * 10) / 10,
						veggies: Math.round((u.veggies / u.veggieGoal) * 100 * 10) / 10,
						physical: Math.round((u.physicalActivityMinutes / u.physicalActivityGoal) * 100 * 10) / 10,
					};

					let stats = {
						step: isNaN(statsR.step) ? 0 : statsR.step  ,
						sleep: isNaN(statsR.sleep) ? 0 : statsR.sleep,
						meTime:isNaN(statsR.meTime) ? 0 :  statsR.meTime,
						water: isNaN(statsR.water) ? 0 :statsR.water,
						fruits:isNaN(statsR.fruits) ? 0 :  statsR.fruits,
						veggies: isNaN(statsR.veggies) ? 0 : statsR.veggies,
						physical: isNaN(statsR.physical) ? 0 : statsR.physical
					};
					console.log(stats, '=========> stats');

					res.render('userViews/userProgress', {
						layout: 'layouts/userLayout',
						title: 'User Progress',
						result,
						stats
					});
				}
			});
			conn.release();
		}
	});
};

exports.getProgress = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log(req.query.datepicker1);
			console.log(req.query.datepicker2);
			const user = req.session.userId;

			const startDate = req.query.datepicker1;
			const endDate = req.query.datepicker2;

			console.log('startdate: ', startDate);
			console.log('enddate: ', endDate);
			console.log('userId: ', user);
			//console.log(req);

			const metricSum = `SELECT 
			SUM( happyhealth.usermetricstbl.stepCount) as stepCount,
			SUM( happyhealth.usermetricstbl.stepGoal) as stepGoal,
			SUM( happyhealth.usermetricstbl.sleepHours) as sleepHours,
			SUM( happyhealth.usermetricstbl.sleepGoal) as sleepGoal,
			SUM( happyhealth.usermetricstbl.meTime) as meTime,
			SUM( happyhealth.usermetricstbl.meTimeGoal) as meTimeGoal,
			SUM( happyhealth.usermetricstbl.fruits) as fruits,
			SUM( happyhealth.usermetricstbl.fruitGoal) as fruitGoal,
			SUM( happyhealth.usermetricstbl.veggies) as veggies,
			SUM( happyhealth.usermetricstbl.veggieGoal) as veggieGoal,
			SUM( happyhealth.usermetricstbl.water) as water, 
			SUM( happyhealth.usermetricstbl.waterGoal) as waterGoal,
			SUM( happyhealth.usermetricstbl.physicalActivityMinutes) as physicalActivityMinutes ,
			SUM( happyhealth.usermetricstbl.physicalActivityGoal) as physicalActivityGoal 
			from 
			happyhealth.usermetricstbl
			where
			(happyhealth.usermetricstbl.userId = ${user}
			AND
			STR_TO_DATE(usermetricstbl.date, "%m/%d/%Y")
			BETWEEN
			'${startDate}' AND '${endDate}');`;

			conn.query(metricSum, function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log('****metric sum result**** ', result);

					let u = result[0];
					let statsR = {
						step: Math.round((u.stepCount / u.stepGoal) * 100 * 10) / 10,
						sleep:  Math.round((u.sleepHours / u.sleepGoal) * 100 * 10) / 10,
						meTime: Math.round((u.meTime / u.meTimeGoal) * 100 * 10) / 10,
						water:  Math.round((u.water / u.waterGoal) * 100 * 10) / 10,
						fruits: Math.round((u.fruits / u.fruitGoal) * 100 * 10) / 10,
						veggies: Math.round((u.veggies / u.veggieGoal) * 100 * 10) / 10,
						physical: Math.round((u.physicalActivityMinutes / u.physicalActivityGoal) * 100 * 10) / 10,
					};

					let stats = {
						step: isNaN(statsR.step) ? 0 : statsR.step  ,
						sleep: isNaN(statsR.sleep) ? 0 : statsR.sleep,
						meTime:isNaN(statsR.meTime) ? 0 :  statsR.meTime,
						water: isNaN(statsR.water) ? 0 :statsR.water,
						fruits:isNaN(statsR.fruits) ? 0 :  statsR.fruits,
						veggies: isNaN(statsR.veggies) ? 0 : statsR.veggies,
						physical: isNaN(statsR.physical) ? 0 : statsR.physical
					};
					console.log(stats, '=========>avg stats ');

					
					res.render('userViews/userProgressDate', {
						layout: 'layouts/userLayout',
						title: 'Custom Progress',
						result,
						stats,
						startDate,
						endDate,
					});
				}
			});
			conn.release();
		}
	});
};
