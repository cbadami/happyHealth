const pooldb = require('../pooldb');
const cron = require('node-cron');

exports.resetUserMetrics = () => {
	let currentDate = new Date().toLocaleDateString();

	let [m, d, y] = currentDate.split('/');
	m = m.length == 1 ? '0' + m : m;
	d = d.length == 1 ? '0' + d : d;
	currentDate = [m, d, y].join('/');

	console.log(currentDate, '---------cuurent date after formation--------------');

	try {
		cron.schedule('00 03 * * *', async () => {
			console.log('***********cron job started************');
			pooldb.getConnection((err1, conn) => {
				if (err1) {
					console.log(err1, '=====> error occured');
					return;
				} else {
					console.log('************db connected successfully************');

					const checkCurrentDayMetrics = `SELECT * FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
					conn.query(checkCurrentDayMetrics, async (err, result) => {
						if (err) {
							console.log(err, '=================> check current day metrics error occured');
							conn.release();
							return;
						} else {
							console.log(result, '======================> RESSSSSSSSS');

							if (result.length > 0) {
								const deleteMetrics = `DELETE FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
								conn.query(deleteMetrics, (err, result) => {
									if (err) {
										console.log(err, '------------delete metricd error');
										conn.release();
										return;
									}
									console.log(result, '-------------result delete metrics');
								});
							}
							let usersQuery = `SELECT GROUP_CONCAT(userId order by userId) as users FROM happyhealth.usertbl;`;
							conn.query(usersQuery, (err, result) => {
								if (err) {
									console.log(err, '=======> error while searching users.');
									conn.release();
									return;
								} else {
									console.log(result[0].users, '=====> found users.');
									let usersList = result[0].users;

									console.log(usersList, '============================> user list');

									let getRecentMetrics = `SELECT * FROM happyhealth.usermetricstbl group by userId HAVING userId IN (${usersList}) order by str_to_date(date,'%m/%d/%Y');`;
									conn.query(getRecentMetrics, (err2, result2) => {
										if (err2) {
											console.log(err2, '---------get recent metrics');
											conn.release();
											return;
										} else {
											console.log(result2.length, '======> result2');

											let values = '';

											for (let i = 0; i < result2.length; i++) {
												const {
													userId,
													stepGoal,
													sleepGoal,
													meTimeGoal,
													waterGoal,
													fruitGoal,
													veggieGoal,
													physicalActivityGoal,
												} = result2[i];
												console.log(
													userId,
													stepGoal,
													sleepGoal,
													meTimeGoal,
													waterGoal,
													fruitGoal,
													veggieGoal,
													physicalActivityGoal
												);
												values += `(${userId},"${currentDate}",0,${stepGoal},0,${sleepGoal},0,${meTimeGoal},0,${waterGoal},0,${fruitGoal},0,${veggieGoal},0,${physicalActivityGoal}),`;
											}
											values = values.slice(0, -1);
											// console.log(values,"====> values")
											const newValuesQuery = `INSERT INTO happyhealth.usermetricstbl (userId, date, stepCount, stepGoal, sleepHours, sleepGoal, meTime, meTimeGoal, water, waterGoal, fruits, fruitGoal, veggies, veggieGoal, physicalActivityMinutes, physicalActivityGoal) values ${values};`;
											conn.query(newValuesQuery, (err3, result3) => {
												if (err3) {
													console.log('============> error while inserting metrics');
													conn.release();
													return;
												} else {
													conn.release();

													console.log(result3, '===========> insert new values result3');
													console.log('************Updated all metrics through CRON************');
													//console.log(res, "=========> res stattttttttt")
													// res.status(200).json({
													// 	message: 'User metrics updated Succesfully  with cron job',
													// });
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		});
	} catch (err) {
		console.log(err, '-------------cron job error');
	}
};

exports.updateAllMetrics = (req, res) => {

	let currentDate = new Date().toLocaleDateString();

	let [m, d, y] = currentDate.split('/');
	m = m.length == 1 ? '0' + m : m;
	d = d.length == 1 ? '0' + d : d;
	currentDate = [m, d, y].join('/');

	console.log(currentDate, '---------cuurent date after formation--------------');

	try {
		console.log('*********** UPDATING LOCALLYYY************');
		pooldb.getConnection((err1, conn) => {
			if (err1) {
				console.log(err1, '=====> error occured');
				return;
			} else {
				console.log('************db connected successfully************');

				const checkCurrentDayMetrics = `SELECT * FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
				conn.query(checkCurrentDayMetrics, async (err, result) => {
					if (err) {
						console.log(err, '=================> check current day metrics error occured');
						conn.release();
						return;
					} else {
						console.log(result, '======================> RESSSSSSSSS');

						if (result.length > 0) {
							const deleteMetrics = `DELETE FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
							conn.query(deleteMetrics, (err, result) => {
								if (err) {
									console.log(err, '------------delete metricd error');
									conn.release();
									return;
								}
								console.log(result, '-------------result delete metrics');
							});
						}
						let usersQuery = `SELECT GROUP_CONCAT(userId order by userId) as users FROM happyhealth.usertbl;`;
						conn.query(usersQuery, (err, result) => {
							if (err) {
								console.log(err, '=======> error while searching users.');
								conn.release();
								return;
							} else {
								console.log(result[0].users, '=====> found users.');
								let usersList = result[0].users;

								console.log(usersList, '============================> user list');

								let getRecentMetrics = `SELECT * FROM happyhealth.usermetricstbl group by userId HAVING userId IN (${usersList}) order by str_to_date(date,'%m/%d/%Y');`;
								conn.query(getRecentMetrics, (err2, result2) => {
									if (err2) {
										console.log(err2, '---------get recent metrics');
										conn.release();
										return;
									} else {
										console.log(result2.length, '======> result2');

										let values = '';

										for (let i = 0; i < result2.length; i++) {
											const {
												userId,
												stepGoal,
												sleepGoal,
												meTimeGoal,
												waterGoal,
												fruitGoal,
												veggieGoal,
												physicalActivityGoal,
											} = result2[i];
											console.log(
												userId,
												stepGoal,
												sleepGoal,
												meTimeGoal,
												waterGoal,
												fruitGoal,
												veggieGoal,
												physicalActivityGoal
											);
											values += `(${userId},"${currentDate}",0,0,0,0,0,0,0,0,0,0,0,0,0,0),`;
										}
										values = values.slice(0, -1);
										// console.log(values,"====> values")
										const newValuesQuery = `INSERT INTO happyhealth.usermetricstbl (userId, date, stepCount, stepGoal, sleepHours, sleepGoal, meTime, meTimeGoal, water, waterGoal, fruits, fruitGoal, veggies, veggieGoal, physicalActivityMinutes, physicalActivityGoal) values ${values};`;
										conn.query(newValuesQuery, (err3, result3) => {
											if (err3) {
												console.log('============> error while inserting metrics');
												conn.release();
												return;
											} else {
												console.log(result3, '===========> insert new values result3');
												console.log('************Cron Job completed************');
												console.log('************Updated all metrics************');
													res.status(200).json({
														message: 'User metrics updated Succesfully',
													});
													return;
												// return;
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	} catch (err) {
		console.log(err);
	}


};


exports.yesterdayUpdateMetrics = (req, res) => {

	let da = new Date();
	
	let timestamp = da.setDate(da.getDate() - 1)
	console.log(timestamp, "=======> yes")
	let currentDate = new Date(timestamp).toLocaleDateString(); 

	let [m, d, y] = currentDate.split('/');
	m = m.length == 1 ? '0' + m : m;
	d = d.length == 1 ? '0' + d : d;
	currentDate = [m, d, y].join('/');

	console.log(currentDate, '---------cuurent date after formation--------------');


	try {
		console.log('*********** UPDATING LOCALLYYY************');
		pooldb.getConnection((err1, conn) => {
			if (err1) {
				console.log(err1, '=====> error occured');
				return;
			} else {
				console.log('************db connected successfully************');

				const checkCurrentDayMetrics = `SELECT * FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
				conn.query(checkCurrentDayMetrics, async (err, result) => {
					if (err) {
						console.log(err, '=================> check current day metrics error occured');
						conn.release();
						return;
					} else {
						console.log(result, '======================> RESSSSSSSSS');

						if (result.length > 0) {
							const deleteMetrics = `DELETE FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
							conn.query(deleteMetrics, (err, result) => {
								if (err) {
									console.log(err, '------------delete metricd error');
									conn.release();
									return;
								}
								console.log(result, '-------------result delete metrics');
							});
						}
						let usersQuery = `SELECT GROUP_CONCAT(userId order by userId) as users FROM happyhealth.usertbl;`;
						conn.query(usersQuery, (err, result) => {
							if (err) {
								console.log(err, '=======> error while searching users.');
								conn.release();
								return;
							} else {
								console.log(result[0].users, '=====> found users.');
								let usersList = result[0].users;

								console.log(usersList, '============================> user list');

								let getRecentMetrics = `SELECT * FROM happyhealth.usermetricstbl group by userId HAVING userId IN (${usersList}) order by str_to_date(date,'%m/%d/%Y');`;
								conn.query(getRecentMetrics, (err2, result2) => {
									if (err2) {
										console.log(err2, '---------get recent metrics');
										conn.release();
										return;
									} else {
										console.log(result2.length, '======> result2');

										let values = '';

										for (let i = 0; i < result2.length; i++) {
											const {
												userId,
												stepGoal,
												sleepGoal,
												meTimeGoal,
												waterGoal,
												fruitGoal,
												veggieGoal,
												physicalActivityGoal,
											} = result2[i];
											console.log(
												userId,
												stepGoal,
												sleepGoal,
												meTimeGoal,
												waterGoal,
												fruitGoal,
												veggieGoal,
												physicalActivityGoal
											);
											values += `(${userId},"${currentDate}",0,0,0,0,0,0,0,0,0,0,0,0,0,0),`;
										}
										values = values.slice(0, -1);
										// console.log(values,"====> values")
										const newValuesQuery = `INSERT INTO happyhealth.usermetricstbl (userId, date, stepCount, stepGoal, sleepHours, sleepGoal, meTime, meTimeGoal, water, waterGoal, fruits, fruitGoal, veggies, veggieGoal, physicalActivityMinutes, physicalActivityGoal) values ${values};`;
										conn.query(newValuesQuery, (err3, result3) => {
											if (err3) {
												console.log('============> error while inserting metrics');
												conn.release();
												return;
											} else {
												console.log(result3, '===========> insert new values result3');
												console.log('************Cron Job completed************');
												console.log('************Updated all metrics************');
													res.status(200).json({
														message: 'User metrics updated Succesfully',
													});
													return;
												// return;
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	} catch (err) {
		console.log(err);
	}


};
