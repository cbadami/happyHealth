// const db = require('../../database');
const pooldb = require('../../pooldb');
const moment = require('moment');
const cron = require('node-cron');
const {
	decodeBase64
} = require('bcryptjs');

let currentDate = moment(new Date()).format('L').toString();
const today = new Date()
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)
console.log(currentDate);


exports.getUserHome = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;

			const homeQuery = `Select * from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}';`;
			conn.query(homeQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					if (!result[0]) {
						let insertQuery = `Insert into happyhealth.usermetricstbl(userId,date) values(${userId},'${currentDate}');`;
						conn.query(insertQuery, function (err, result) {
							if (err) {
								console.log(err, "---------error inset query result");
							}
							conn.query(homeQuery, function (err, result) {
								if (err) {
									console.log(err, "_--------------aftere inseting select result");
								}
								console.log(result[0], '--------db userMetrics table after inserting result');
								const {
									stepCount,
									sleepHours,
									water,
									meTime,
									fruits,
									veggies,
									physicalActivityMinutes,
								} = result[0];

								console.log(stepCount, sleepHours, water, meTime, fruits, veggies, physicalActivityMinutes);

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
								conn.release();
								return;

							});

						});
					} else {

						console.log(result[0], '--------db userMetrics table result');
						const {
							stepCount,
							sleepHours,
							water,
							meTime,
							fruits,
							veggies,
							physicalActivityMinutes,
						} = result[0];

						console.log(stepCount, sleepHours, water, meTime, fruits, veggies, physicalActivityMinutes);

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
						conn.release();
						return;
					}

				}

			});

		}
	});
};

exports.getPreviousUserSteps = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const stetpQuery = `Select stepCount, stepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${yesterday}' `;
			conn.query(stetpQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db user table result');
					const {
						stepCount,
						stepGoal
					} = result[0];
					res.render('userViews/userStep', {
						layout: 'layouts/userLayout',
						title: 'User Step',
						stepCount,
						stepGoal,
					});
				}
			});
			conn.release();
		}
	});
};

exports.getUserStep = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			console.log(yesterday.toDateString());
			const stetpQuery = `Select stepCount, stepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' `;
			const previousStepsQuery = `Select stepCount, stepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${yesterday}' `;
			conn.query(stetpQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db user table result');
					if (result[0].stepCount == 0) {

					} else {

					}
					const {
						stepCount,
						stepGoal
					} = result[0];

					res.render('userViews/userStep', {
						layout: 'layouts/userLayout',
						title: 'User Step',
						stepCount,
						stepGoal,
					});
				}
			});
			conn.release();
		}
	});
};

exports.postUserStep = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.session.userId;
			const {
				stepCount,
				stepGoal
			} = req.body;
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
			conn.query(stepQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/home');
				}
			});
			conn.release();
		}
	});
};

exports.getUserSleep = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const sleepQuery = `Select sleepHours,sleepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' ;`;
			conn.query(sleepQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db user table result');

					var {
						sleepHours,
						sleepGoal
					} = result[0];

					res.render('userViews/userSleep', {
						layout: 'layouts/userLayout',
						title: 'User Sleep',
						sleepHours,
						sleepGoal,
					});
				}
			});
			conn.release();
		}
	});
};

exports.postUserSleep = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const {
				sleepHours,
				sleepGoal
			} = req.body;

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
			conn.query(stepQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.getUserHydration = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const waterLevl = `Select water,waterGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' ;`;
			conn.query(waterLevl, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db user water result');
					var {
						water,
						waterGoal
					} = result[0];
					console.log(water, waterGoal, '==============> water, watergoal');

					res.render('userViews/userHydration', {
						layout: 'layouts/userLayout',
						title: 'User Hydration',
						water,
						waterGoal,
					});
				}
			});

			conn.release();
		}
	});
};

exports.postUserHydration = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const {
				water,
				waterGoal
			} = req.body;
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
			conn.query(hydrationQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log('----------susscesfully updated db');
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.getUserTrack = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const stetpQuery = `Select meTime,meTimeGoal from happyhealth.usermetricstbl where UserId = ${userId} and date= '${currentDate}' ;`;
			conn.query(stetpQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db user table result');

					var {
						meTime,
						meTimeGoal
					} = result[0];

					res.render('userViews/userTrack', {
						layout: 'layouts/userLayout',
						title: 'User Track',
						meTime,
						meTimeGoal,
					});
				}
			});
			conn.release();
		}
	});
};

exports.postUserTrack = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const {
				meTime,
				meTimeGoal
			} = req.body;
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
			conn.query(stepQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.getUserFruits = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const stetpQuery = `Select fruits,fruitgoal,veggies,veggieGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' ;`;
			conn.query(stetpQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db user table result');
					//console.log("result "+result[0]);
					const {
						fruits,
						fruitgoal,
						veggies,
						veggieGoal
					} = result[0];
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

			conn.release();
		}
	});
};

exports.postUserFruits = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const {
				veggies,
				veggieGoal,
				fruits,
				fruitgoal
			} = req.body;
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
			conn.query(fruitQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.getUserVegetables = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const stetpQuery = `Select veggies,veggieGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}';`;
			conn.query(stetpQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '--------db user table result');
					const {
						veggies,
						veggieGoal
					} = result[0];
					//console.log("ddd   "+veggies)
					res.render('userViews/userVegetables', {
						layout: 'layouts/userLayout',
						title: 'User Vegetables',

						veggies,
						veggieGoal,
					});
				}
			});

			conn.release();
		}
	});
};

exports.getFruitsVeggies = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const fv = `select fruits, fruitGoal, veggies, veggieGoal from happyhealth.usermetricstbl where userId =${userId} and date = '${currentDate}'`;
			conn.query(fv, (err, result) => {
				if (err) {
					console.log(err, '======> error while getting fruits and veggies');
				} else {
					console.log(result, '=====> fruits veggies result');
					const {
						fruits,
						fruitGoal,
						veggies,
						veggieGoal
					} = result[0];
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

			conn.release();
		}
	});
};

exports.postFruitsVeggies = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			let {
				fruits,
				fruitgoal,
				veggies,
				veggieGoal
			} = req.body;

			let updateFV = `update happyhealth.usermetricstbl set fruits = ${fruits} , fruitGoal= ${fruitgoal} , veggies = ${veggies} , veggieGoal= ${veggieGoal} where userId =${userId} and date = '${currentDate}'; `;
			conn.query(updateFV, (err, result) => {
				if (err) {
					console.log(err, '=====> error while updating fruits & veggies');
				} else {
					console.log(result, '===========> updated successfully');
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.postUserVegetables = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const {
				veggies,
				veggieGoal
			} = req.body;
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
			conn.query(vegQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.getUserPhysicalActivity = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const phy = `Select physicalActivityMinutes, physicalActivityGoal from happyhealth.usermetricstbl where userId = ${userId} and date = '${currentDate}';`;
			conn.query(phy, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log(result, '-------- physical activity result');
					const {
						physicalActivityMinutes,
						physicalActivityGoal
					} = result[0];
					console.log(physicalActivityMinutes, physicalActivityGoal, '==========> PHYYYYYYYY');
					res.render('userViews/userPhysicalActivity', {
						layout: 'layouts/userLayout',
						title: 'User Physical Activity',
						physicalActivityMinutes,
						physicalActivityGoal,
					});
				}
			});

			conn.release();
		}
	});
};

exports.postUserPhysicalActivity = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const {
				physicalActivityMinutes,
				physicalActivityGoal
			} = req.body;
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
			conn.query(ppQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};



// console.log(currentDate, '=======> current Date');
// const checkCurrentDayMetrics = `SELECT * FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
// conn.query(checkCurrentDayMetrics, async (err, result) => {
// 	if (err) {
// 		console.log(err, '=======> error occured');
// 	} else {
// 		if (result.length > 0) {
// 			const deleteMetrics = `DELETE FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
// 			conn.query(deleteMetrics, (err, result) => {
// 				if (err) {
// 					console.log(err, '--------delete error');
// 				}
// 				console.log(result, '--------result delete metrics');
// 			});
// 		}
// 			console.log('running cron job at every day 12:am');
// 			const usersQuery = 'SELECT userId FROM usertbl';
// 			conn.query(usersQuery, (err, result) => {
// 				if (err) {
// 					console.log(err, '------error while users');
// 				} else {
// 					let usersCount = result.length;
// 					let users = result;
// 					let values = '';

// 					for (let i = 0; i < usersCount; i++) {
// 						values += `(${users[i].userId},"${currentDate}",0,0,0,0,0,0,0,0,0,0,0,0,0,0),`;
// 					}
// 					values = values.slice(0, -1);
// 					//console.log(values, '========> values to insert');
// 					const newValuesQuery = `INSERT INTO happyhealth.usermetricstbl (userId, date, stepCount, stepGoal, sleepHours, sleepGoal, meTime, meTimeGoal, water, waterGoal, fruits, fruitGoal, veggies, veggieGoal, physicalActivityMinutes, physicalActivityGoal) values ${values};`;
// 					conn.query(newValuesQuery, (err, result) => {
// 						if (err) {
// 							console.log('============> error while reseting values or already inserted');
// 						} else {
// 							console.log(result, '===========> insert new values');
// 						}
// 					});
// 				}
// 			});

// 	}
// });

exports.resetUserMetrics = (req, res) => {

	try {

		cron.schedule('0 0 * * *', async () => {
			console.log("***********cron job started************")
			pooldb.getConnection((err1, conn) => {
				if (err1) {
					console.log(err1, '=====> error occured');
					return;
				} else {

					let currentDate = moment(new Date()).format('L').toString();
					let currDate = new Date();
					console.log('************Cron Job Started************');
					console.log(currDate, '===========> current Date');


					const checkCurrentDayMetrics = `SELECT * FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
					conn.query(checkCurrentDayMetrics, async (err, result) => {
						if (err) {
							console.log(err, '=======> check current day metrics error occured');
							conn.release();
							return;
						} else {
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

								let usersQuery = `SELECT GROUP_CONCAT(userId) as users FROM happyhealth.usertbl ;`;
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
												console.log(err2, "---------get recent metrics");
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
														console.log(result3, '===========> insert new values result3');
														console.log('************Cron Job completed************');
														// return;
													}
												});
											}
										});
									}
								});
							}
						}
					});

				}
			});



		});
	} catch (err) {
		console.log(err, "-------------cron job error");
	}

};

exports.updateUserMetricGoals = (req, res) => {
	console.log('================================updating metrics');
	console.log(currentDate, "----------current Dater");
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {

			try {
				const checkCurrentDayMetrics = `SELECT * FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
				conn.query(checkCurrentDayMetrics, async (err, result) => {
					if (err) {
						console.log(err, '=======> error occured');
					} else {
						if (result.length > 0) {
							const deleteMetrics = `DELETE FROM happyhealth.usermetricstbl where date = '${currentDate}';`;
							conn.query(deleteMetrics, (err, result) => {
								if (err) {
									console.log(err, '--------delete error');
								}
								console.log(result, '--------result delete metrics');
							});
						}
					}
				});

				let usersQuery = `SELECT GROUP_CONCAT(userId) as users FROM happyhealth.usertbl;`;
				conn.query(usersQuery, (err, result) => {
					if (err) {
						console.log(err, '=======> error while searching users.');
					} else {
						console.log(result[0].users, '=====> found users.');
						let usersList = result[0].users;

						console.log(usersList, '============================> user list');

						let getRecentMetrics = `SELECT * FROM happyhealth.usermetricstbl group by userId HAVING userId IN (${usersList}) order by str_to_date(date,'%m/%d/%Y');`;
						//let getRecentMetrics = `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`
						conn.query(getRecentMetrics, (err2, result2) => {
							if (err2) {
								console.log(err2, "--------------------error while getting recent metrics");
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
									conn.release();
									if (err3) {
										console.log('============> error while inserting metrics');
									} else {
										console.log(result3, '===========> insert new values result3');
										console.log('************Cron Job completed************');
										res.status(200).json({
											message: "User metrics updated Succesfully"
										});
										return;
									}
								});
							}
						});
					}
				});
			} catch (err) {
				console.log(err);
			}


		}
	});
};