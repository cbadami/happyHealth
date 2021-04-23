const pooldb = require('../pooldb');

exports.resetMetrics = () => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
			return;
		} else {
			console.log('************db connected successfully************');

			const checkCurrentDayMetrics = `SELECT * FROM happyhealth.usermetricstbl where date = '04/21/2021';`;
			conn.query(checkCurrentDayMetrics, async (err, result) => {
				if (err) {
					console.log(err, '=================> check current day metrics error occured');
					conn.release();
					return;
				} else {
					console.log(result, '======================> RESSSSSSSSS');

					let usersQuery = `select  userId  from happyhealth.usertbl where userId not in(SELECT userId FROM happyhealth.usermetricstbl where date = '04/21/2021') order by userId;`;
					conn.query(usersQuery, (err, result) => {
						if (err) {
							console.log(err, '=======> error while searching users.');
							conn.release();
							return;
						} else {
							if (result.length == 0) {
								console.log('User metrics already created in db.=');
								console.log(result, 'All users updated their metrics for today...');
								return;
							} else {
								console.log(
									result,
									'========> These are the users not updated their metrics today....'
								);

								// values = '';
								// for (let i = 0; i < result.length; i++) {
								// 	values += `(${result[i].userId},'${currentDate}',0,0,0,0,0,0,0,0,0,0,0,0,0,0),`;
								// }
								// values = values.slice(0, -1);

								// console.log(values, '===========> users....');
								// const newValuesQuery = `INSERT INTO happyhealth.usermetricstbl (userId, date, stepCount, stepGoal, sleepHours, sleepGoal, meTime, meTimeGoal, water, waterGoal, fruits, fruitGoal, veggies, veggieGoal, physicalActivityMinutes, physicalActivityGoal) values ${values};`;
								// conn.query(newValuesQuery, (err3, result3) => {
								// 	if (err3) {
								// 		console.log('============> error while inserting metrics');
								// 		conn.release();
								// 		return;
								// 	} else {
								// 		console.log(result3, '===========> insert new values result3');
								// 		console.log('************Cron Job completed************');
								// 		console.log('************Updated all metrics************');
								// 	}
								// });
							}
						}
					});
				}
			});
		}
	});
};

// else {
// 	console.log(result[0].users, '=====> found users.');
// 	let usersList = result[0].users;

// 	console.log(usersList, '============================> user list');

// 	let getRecentMetrics = `SELECT * FROM happyhealth.usermetricstbl group by userId HAVING userId IN (${usersList}) order by str_to_date(date,'%m/%d/%Y');`;
// 	conn.query(getRecentMetrics, (err2, result2) => {
// 		if (err2) {
// 			console.log(err2, '---------get recent metrics');
// 			conn.release();
// 			return;
// 		} else {
// 			console.log(result2.length, '======> result2');

// 			let totalUsers = JSON.parse("[" + usersList + "]");
// 			let preUserMet = [];
// 			let noPreUserMet = [];

// 			result2.map(rrr=>{
// 				preUserMet.push(rrr.userId)
// 			})

// 			totalUsers.filter( element => {
// 				if(preUserMet.includes(element) == false ){
// 					noPreUserMet.push(element)
// 				}
// 			});

// 			let va = '';
// 			console.log(preUserMet, noPreUserMet, "============> pre User Metrics")

// 			if(noPreUserMet.length>0){
// 				for(let i=0; i<noPreUserMet.length; i++){
// 					va += `(${noPreUserMet[i]},"${currentDate}",0,0,0,0,0,0,0,0,0,0,0,0,0,0),`;
// 				}
// 			}

// 			va = va.slice(0, -1);

// 			console.log(va, "=============> va")

// 			let values = '';

// 			for (let i = 0; i < result2.length; i++) {
// 				const {
// 					userId,
// 					stepGoal,
// 					sleepGoal,
// 					meTimeGoal,
// 					waterGoal,
// 					fruitGoal,
// 					veggieGoal,
// 					physicalActivityGoal,
// 				} = result2[i];
// 				console.log(
// 					userId,
// 					stepGoal,
// 					sleepGoal,
// 					meTimeGoal,
// 					waterGoal,
// 					fruitGoal,
// 					veggieGoal,
// 					physicalActivityGoal
// 				);
// 				values += `(${userId},"${currentDate}",0,${stepGoal},0,${sleepGoal},0,${meTimeGoal},0,${waterGoal},0,${fruitGoal},0,${veggieGoal},0,${physicalActivityGoal}),`;
// 			}
// 			values = values.slice(0, -1);
// 			 console.log(values+','+va,"====> combining 2")

// 			values = values+','+va

// 			const newValuesQuery = `INSERT INTO happyhealth.usermetricstbl (userId, date, stepCount, stepGoal, sleepHours, sleepGoal, meTime, meTimeGoal, water, waterGoal, fruits, fruitGoal, veggies, veggieGoal, physicalActivityMinutes, physicalActivityGoal) values ${values};`;

// 			conn.query(newValuesQuery, (err3, result3) => {
// 				if (err3) {
// 					console.log('============> error while inserting metrics');
// 					conn.release();
// 					return;
// 				} else {
// 					conn.release();

// 					console.log(result3, '===========> insert new values result3');
// 					console.log('************Updated all metrics through CRON************');
// 					//console.log(res, "=========> res stattttttttt")
// 					// res.status(200).json({
// 					// 	message: 'User metrics updated Succesfully  with cron job',
// 					// });
// 				}
// 			});

// 		}
// 	});
// }
