const db = require('../../database');
const moment = require('moment');
const cron = require('node-cron');

let currentDate = moment(new Date()).format('L').toString();

exports.getUserHome = (req, res) => {
	let userId = req.session.userId;

	const homeQuery = `Select * from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}';`;
	db.query(homeQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result.length, '--------db userMetrics table result');

			if (result.length === 0) {
				const insertData = `INSERT INTO userMetricsTbl VALUES (${userId},'${currentDate}',0,0,0,0,0,0,0,0,0,0,0,0,0,0);`;
				db.query(insertData, (err, result) => {
					if (err) {
						console.log(err, '=======> error while updating empty data');
					} else {
						let stepCount = (sleepHours = water = meTime = fruits = veggies = physicalActivityMinutes = 0);
						res.render('userViews/userHome', {
							layout: 'layouts/userLayout',
							title: 'User Home',
							stepCount,
							sleepHours,
							water,
							meTime,
							fruits,
							veggies,
							physicalActivityMinutes,
						});
					}
				});
			} else {
				const { stepCount, sleepHours, water, meTime, fruits, veggies, physicalActivityMinutes } = result[0];
				res.render('userViews/userHome', {
					layout: 'layouts/userLayout',
					title: 'User Home',
					stepCount,
					sleepHours,
					water,
					meTime,
					fruits,
					veggies,
					physicalActivityMinutes,
				});
			}
		}
	});
};

exports.getUserStep = (req, res) => {
	let userId = req.session.userId;
	const stetpQuery = `Select stepCount, stepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' `;
	db.query(stetpQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result, '--------db user table result');
			const { stepCount, stepGoal } = result[0];
			res.render('userViews/userStep', {
				layout: 'layouts/userLayout',
				title: 'User Step',
				stepCount,
				stepGoal,
			});
		}
	});
};

exports.postUserStep = (req, res) => {
	const userId = req.session.userId;
	const { stepCount, stepGoal } = req.body;
	let errors = [];

	if (!stepCount || !stepGoal) {
		console.log(`inside if statement ${stepCount}, `);
		errors.push('Please enter all fields');
		console.log(errors, '----------------errros');
		res.render('userViews/userStep', {
			layout: 'layouts/userLayout',
			title: 'User Step',
			errors,
		});
		return;
	}

	var stepQuery = `UPDATE happyhealth.usermetricstbl SET stepCount = ${stepCount}, stepGoal = ${stepGoal} WHERE userId = ${userId} and date = '${currentDate}' `;
	db.query(stepQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/home');
		}
	});
};

exports.getUserSleep = (req, res) => {
	let userId = req.session.userId;
	const sleepQuery = `Select sleepHours,sleepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' ;`;
	db.query(sleepQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result, '--------db user table result');

			var { sleepHours, sleepGoal } = result[0];

			res.render('userViews/userSleep', {
				layout: 'layouts/userLayout',
				title: 'User Sleep',
				sleepHours,
				sleepGoal,
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
		console.log(errors, '----------------errros');
		res.render('userViews/userSleep', {
			layout: 'layouts/userLayout',
			title: 'User Sleep',
			errors,
		});
		return;
	}
	var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET sleepHours = ${sleepHours}, sleepGoal = ${sleepGoal} WHERE userId = ${userId} and date = '${currentDate}' ; `;
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
	const waterLevl = `Select water,waterGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' ;`;
	db.query(waterLevl, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result, '--------db user water result');
			var { water, waterGoal } = result[0];
			console.log(water, waterGoal, '==============> water, watergoal');

			res.render('userViews/userHydration', {
				layout: 'layouts/userLayout',
				title: 'User Hydration',
				water,
				waterGoal,
			});
		}
	});
};

exports.postUserHydration = (req, res) => {
	let userId = req.session.userId;
	const { water, waterGoal } = req.body;
	console.log(`inside post user hyration`);
	let errors = [];
	if (!water || !waterGoal) {
		console.log(`inside if statement ${water}`);
		errors.push('Please enter all fields');
		console.log(errors, '----------------errros');
		res.render('userViews/userHydration', {
			layout: 'layouts/userLayout',
			title: 'User Hydration',
			errors,
		});
		return;
	}
	let hydrationQuery = `UPDATE happyhealth.usermetricstbl
        SET water = ${water}, waterGoal = ${waterGoal} WHERE userId = ${userId} and date = '${currentDate}' ;`;
	db.query(hydrationQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log('----------susscesfully updated db');
			res.redirect('/home');
		}
	});
};

exports.getUserTrack = (req, res) => {
	let userId = req.session.userId;
	const stetpQuery = `Select meTime,meTimeGoal from happyhealth.usermetricstbl where UserId = ${userId} and date= '${currentDate}' ;`;
	db.query(stetpQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result, '--------db user table result');

			var { meTime, meTimeGoal } = result[0];

			res.render('userViews/userTrack', {
				layout: 'layouts/userLayout',
				title: 'User Track',
				meTime,
				meTimeGoal,
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
		console.log(errors, '----------------errros');
		res.render('userViews/userTrack', {
			layout: 'layouts/userLayout',
			title: 'User Track',
		});
	}
	var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET meTime = ${meTime}, meTimeGoal = ${meTimeGoal} WHERE userId = ${userId} and date = '${currentDate}';`;
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
	const stetpQuery = `Select fruits,fruitgoal,veggies,veggieGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' ;`;
	db.query(stetpQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result, '--------db user table result');
			//console.log("result "+result[0]);
			const { fruits, fruitgoal, veggies, veggieGoal } = result[0];
			//console.log("ddd   "+fruits)
			res.render('userViews/userFruits', {
				layout: 'layouts/userLayout',
				title: 'User Fruits',
				fruits,
				fruitgoal,
				veggies,
				veggieGoal,
			});
		}
	});
};

exports.postUserFruits = (req, res) => {
	let userId = req.session.userId;
	const { veggies, veggieGoal, fruits, fruitgoal } = req.body;
	console.log('-------post user Fruits n veg controller');
	let errors = [];
	if (!fruits || !fruitgoal) {
		errors.push('Please enter all fields');
		console.log(errors, '----------------errros');
		res.render('userViews/userFruits', {
			layout: 'layouts/userLayout',
			title: 'User Fruits',
		});
	}

	var fruitQuery = `UPDATE happyhealth.usermetricstbl
        SET fruits = ${fruits}, fruitGoal = ${fruitgoal},veggies = ${veggies}, veggieGoal = ${veggieGoal} WHERE userId = ${userId} and date = '${currentDate}';`;
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
	const stetpQuery = `Select veggies,veggieGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}';`;
	db.query(stetpQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result, '--------db user table result');
			const { veggies, veggieGoal } = result[0];
			//console.log("ddd   "+veggies)
			res.render('userViews/userVegetables', {
				layout: 'layouts/userLayout',
				title: 'User Vegetables',

				veggies,
				veggieGoal,
			});
		}
	});
};

exports.getFruitsVeggies = (req, res) => {
	let userId = req.session.userId;
	const fv = `select fruits, fruitGoal, veggies, veggieGoal from happyhealth.usermetricstbl where userId =${userId} and date = '${currentDate}'`;
	db.query(fv, (err, result) => {
		if (err) {
			console.log(err, '======> error while getting fruits and veggies');
		} else {
			console.log(result, '=====> fruits veggies result');
			const { fruits, fruitGoal, veggies, veggieGoal } = result[0];
			res.render('userViews/userFruitsVeggies', {
				layout: 'layouts/userLayout',
				title: ' Fruits & Vegetables',
				fruits,
				fruitGoal,
				veggies,
				veggieGoal,
			});
		}
	});
};

exports.postFruitsVeggies = (req, res) => {
	let userId = req.session.userId;
	let { fruits, fruitgoal, veggies, veggieGoal } = req.body;

	let updateFV = `update happyhealth.usermetricstbl set fruits = ${fruits} , fruitGoal= ${fruitgoal} , veggies = ${veggies} , veggieGoal= ${veggieGoal} where userId =${userId} and date = '${currentDate}'; `;
	db.query(updateFV, (err, result) => {
		if (err) {
			console.log(err, '=====> error while updating fruits & veggies');
		} else {
			console.log(result, '===========> updated successfully');
			res.redirect('/home');
		}
	});
};

exports.postUserVegetables = (req, res) => {
	let userId = req.session.userId;
	const { veggies, veggieGoal } = req.body;
	console.log('-------post user Vegetables controller');
	let errors = [];
	if (!veggies || !veggieGoal) {
		errors.push('Please enter all fields');
		console.log(errors, '----------------errros');
		res.render('userViews/userVegetables', {
			layout: 'layouts/userLayout',
			title: 'User Vegetables',
		});
	}
	var vegQuery = `UPDATE happyhealth.usermetricstbl SET veggies = ${veggies}, veggieGoal = ${veggieGoal} WHERE userId = ${userId} and date = '${currentDate}';`;
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
	const phy = `Select physicalActivityMinutes, physicalActivityGoal from happyhealth.usermetricstbl where userId = ${userId} and date = '${currentDate}';`;
	db.query(phy, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result, '-------- physical activity result');
			const { physicalActivityMinutes, physicalActivityGoal } = result[0];
			console.log(physicalActivityMinutes, physicalActivityGoal, '==========> PHYYYYYYYY');
			res.render('userViews/userPhysicalActivity', {
				layout: 'layouts/userLayout',
				title: 'User Physical Activity',
				physicalActivityMinutes,
				physicalActivityGoal,
			});
		}
	});
};

exports.postUserPhysicalActivity = (req, res) => {
	let userId = req.session.userId;
	const { physicalActivityMinutes, physicalActivityGoal } = req.body;
	console.log('-------post user Physical Activity controller');
	let errors = [];
	if (!physicalActivityMinutes || !physicalActivityGoal) {
		errors.push('Please enter all fields');
		console.log(errors, '----------------errros');
		res.render('userViews/userPhysicalActivity', {
			layout: 'layouts/userLayout',
			title: 'User Physical Activity',
		});
	}
	var ppQuery = `UPDATE happyhealth.usermetricstbl SET physicalActivityMinutes = ${physicalActivityMinutes}, physicalActivityGoal = ${physicalActivityGoal} WHERE userId = ${userId} and date = '${currentDate}';`;
	db.query(ppQuery, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/home');
		}
	});
};

exports.resetUserMetrics = async (req, res) => {
	console.log('running cron job at every day 12:am');

	const usersQuery = 'SELECT userId FROM usertbl';
	await db.query(usersQuery, (err, result) => {
		if (err) {
			console.log(err, '------error while users');
		} else {
			let usersCount = result.length;
			let users = result;
			let values = '';

			for (let i = 0; i < usersCount; i++) {
				values += `(${users[i].userId},"${currentDate}",0,0,0,0,0,0,0,0,0,0,0,0,0,0 ),`;
			}

			console.log(values.slice(0, -1), '========> values to insert');

			const newValuesQuery = `INSERT INTO happyhealth.usermetricstbl (userId, date, stepCount, stepGoal, sleepHours, sleepGoal, meTime, meTimeGoal, water, waterGoal, fruits, fruitGoal, veggies, veggieGoal, physicalActivityMinutes, physicalActivityGoal) values ${values}`;
			db.query(newValuesQuery, (err, result) => {
				if (err) {
					console.log(err, '============> error while reseting values');
				} else {
					console.log(result, '===========> insert new values');
				}
			});
		}
	});
};
