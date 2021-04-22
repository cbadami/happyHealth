const pooldb = require('../../pooldb');

function getCurrentDate() {
	let currentDate = new Date().toLocaleDateString();
	let [m, d, y] = currentDate.split('/');
	m = m.length == 1 ? '0' + m : m;
	d = d.length == 1 ? '0' + d : d;
	currentDate = [m, d, y].join('/');
	console.log(currentDate, '---------cuurent date after formation');
	return currentDate;
}

exports.getAdminHome = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			// const userId = req.session.userId;
			let currentDate = getCurrentDate();

			pooldb.getConnection((err1, conn) => {
				if (err1) {
					console.log(err1, '=====> error occured');
					return;
				} else {
					console.log('************db connected successfully************');

					const checkCurrentDayMetrics = `SELECT * FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
					conn.query(checkCurrentDayMetrics, async (err, resultCurrentDay) => {
						if (err) {
							console.log(err, '=================> check current day metrics error occured');
							conn.release();
							return;
						} else {
							console.log(resultCurrentDay, '======================> resultCurrentDay');

							let usersQuery = `select  userId  from happyhealth.usertbl where userId not in(SELECT userId FROM happyhealth.usermetricstbl where date = '${currentDate}') order by userId;`;
							conn.query(usersQuery, (err, resultNoMetUsers) => {
								if (err) {
									console.log(err, '=======> error while searching users.');
									conn.release();
									return;
								} else {
									console.log(resultNoMetUsers,"-----------------result no metric users(lenivalu)")
									if (resultNoMetUsers.length == 0) {
										console.log('User metrics already created in db.=');
										console.log(resultNoMetUsers, 'All users updated their metrics for today...');
										res.render('adminViews/adminHome', {
											layout: 'layouts/adminLayout',
											title: 'admin Home',
										});
										return;
									} else {
										console.log(resultNoMetUsers[0].userId,'========> These are the users not updated their metrics today....');

										let noMetricsUsers = [];
										resultNoMetUsers.map((uid) => {
											noMetricsUsers.push(uid.userId);
										});
										console.log(noMetricsUsers, '=============> no metrics users');

										let usersList = noMetricsUsers.toString();

										const getRecentMetric = `SELECT * FROM happyhealth.usermetricstbl group by userId HAVING userId IN (${usersList}) order by str_to_date(date,'%m/%d/%Y');`;
										conn.query(getRecentMetric, (err, resultRecentMetric) => {
											if (err) {
												console.log('Error while getting metrics');
											} else {
												 console.log(JSON.stringify(resultRecentMetric), '============> recent metrics of the user');
												// let zeroMetricsUsers = [];
												// resultRecentMetric.map(metric=>{
												// 	if(usersList.includes(userId)){
												// 		c
												// 	}
												// })


												let values = '';

												for (let i=0; i< resultRecentMetric.length ; i++) {
													// const {stepGoal,sleepGoal,meTimeGoal,waterGoal,fruitGoal,veggieGoal,physicalActivityGoal} = resultRecentMetric[i];
													// console.log(metricResult[i], '=========> recent row ====================>');
													values += `(${resultRecentMetric[i].userId},'${currentDate}', ${resultRecentMetric[i].stepGoal}, ${resultRecentMetric[i].sleepGoal}, ${resultRecentMetric[i].meTimeGoal},${resultRecentMetric[i].waterGoal}, ${resultRecentMetric[i].fruitGoal}, ${resultRecentMetric[i].veggieGoal}, ${resultRecentMetric[i].physicalActivityGoal}),`;
												}
												//else{
												// 	values += `(${userId},'${currentDate}',0,0,0,0,0,0,0),`;
												// }
												values = values.slice(0, -1);
												console.log(values, "==============> THIS IS TJE INSER QUEry")

												 newValuesQuery = `Insert into happyhealth.usermetricstbl(userId,date, stepGoal, sleepGoal, meTimeGoal,waterGoal, fruitGoal, veggieGoal, physicalActivityGoal) values ${values}`;
												 conn.query(newValuesQuery, (err3, resultInsertToCurrentDay) => {
													if (err3) {
														console.log('============> error while inserting metrics');
														conn.release();
														return;
													} else {
														console.log(resultInsertToCurrentDay, '===========> after inserting new values result3');
														res.render('adminViews/adminHome', {
															layout: 'layouts/adminLayout',
															title: 'admin Home',
														});
														return;
													
													}
												});
											
											}

										});
									}

									

								}
							});



						}
					});
				}
			});

		

			conn.release();
		}
	});
};
