const pooldb = require('../../pooldb');

function getCurrentDate() {
	let currentDate = new Date().toLocaleDateString();
	let [m, d, y] = currentDate.split("/");
	m = m.length == 1 ? "0" + m : m;
	d = d.length == 1 ? "0" + d : d;
	currentDate = [m, d, y].join('/');
	console.log(currentDate, "---------cuurent date after formation");
	return currentDate;
}

exports.getUserHome = (req, res) => {
	console.log(req.flash['title'], "------------------flash message");

	let flashTitle = req.flash['title'];
	let flashMessage = req.flash['message'];
	req.flash['title'] = "";
	req.flash['message'] = "";

	req.flash['title'];
	let currentDate = getCurrentDate();
	console.log(currentDate, '**************GET USER HOME CONTROLLER*****************');
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userName = req.session.userName;
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
								console.log(err, '---------error inset query result');
							}
							conn.query(homeQuery, function (err, result) {
								if (err) {
									console.log(err, '_--------------aftere inseting select result');
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

								console.log(
									stepCount,
									sleepHours,
									water,
									meTime,
									fruits,
									veggies,
									physicalActivityMinutes
								);

								res.render('userViews/userHome', {
									layout: 'layouts/userLayout',
									title: 'User Home',
									userName: userName,
									stepCount,
									sleepHours,
									water,
									meTime,
									fruits,
									veggies,
									physicalActivityMinutes,
									flashTitle,
									flashMessage
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
							userName: req.session.userName,
							stepCount,
							sleepHours,
							water,
							meTime,
							fruits,
							veggies,
							physicalActivityMinutes,
							flashTitle,
							flashMessage
						});
						conn.release();
						return;
					}
				}
			});
		}
	});
};

exports.getUserStepByDate = (req, res) => {
	let dateId = req.params.date;
	console.log("finall in getUserStepByDate " + dateId);
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			var newdate = (dateId.split('-')[1]) + '/' + dateId.split('-')[2] + '/' + dateId.split('-')[0];
			const stetpQuery = `Select stepCount, stepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${newdate}' `;
			conn.query(stetpQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {

					if (result.length == 0) {
						console.log(result, '--------default return values result');
						let insertQuery = `Insert into happyhealth.usermetricstbl(userId,date) values(${userId},'${newdate}');`;
						conn.query(insertQuery, function (err, result) {
							if (err) {
								console.log(err, "--------error in inserting query");

							} else {
								console.log(result, "----------inserted query");
								const stepCount = stepGoal = 0;
								res.json({
									stepCount,
									stepGoal
								});
							}
						});

					} else {
						console.log(result, '--------db user table result');
						const {
							stepCount,
							stepGoal
						} = result[0];
						res.json({
							stepCount,
							stepGoal
						});
					}


				}
			});
			conn.release();
		}
	});
};

exports.getUserStep = (req, res) => {
	let currentDate = getCurrentDate();
	console.log('**************GET USER STEP CONTROLLER*****************');
	console.log(currentDate, '---------------------------current date');
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			const stetpQuery = `Select stepCount, stepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${currentDate}' `;
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

exports.postUserStep = (req, res) => {

	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			const userId = req.session.userId;
			const {
				stepCount,
				stepGoal,
				datepicker1
			} = req.body;
			let errors = [];
			let newdate = (datepicker1.split('-')[1]) + '/' + datepicker1.split('-')[2] + '/' + datepicker1.split('-')[0];
			console.log(newdate + "-----------------new");
			if (!stepCount || !stepGoal || !datepicker1) {
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
			console.log(datepicker1);
			const stepQuery = `UPDATE happyhealth.usermetricstbl SET stepCount = ${stepCount}, stepGoal = ${stepGoal} WHERE userId = ${userId} and date = '${newdate}' `;
			console.log(stepQuery);
			conn.query(stepQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					req.flash['title'] = "Step Count";
					req.flash['message'] = "Updated Metrics Sucessfully";
					res.redirect('/home');
				}
			});
			conn.release();
		}
	});
};

exports.getUserSleepByDate = (req, res) => {
	let dateId = req.params.date;
	console.log("finall in getUserSleeByDate " + dateId);
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '===----------==> error occured');
		} else {
			let userId = req.session.userId;
			var newdate = (dateId.split('-')[1]) + '/' + dateId.split('-')[2] + '/' + dateId.split('-')[0];
			const sleepQuery = `Select sleepHours,sleepGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${newdate}' `;
			conn.query(sleepQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {

					if (result.length == 0) {
						console.log(result, '--------default return values result');
						let insertQuery = `Insert into happyhealth.usermetricstbl(userId,date) values(${userId},'${newdate}');`;
						conn.query(insertQuery, function (err, result) {
							if (err) {
								console.log(err, "--------error in inserting query");

							} else {
								console.log(result, "----------inserted query");
								const sleepHours = sleepGoal = 0;
								res.json({
									sleepHours,
									sleepGoal
								});
							}
						});

					} else {
						console.log(result, '--------db user table result');
						const {
							sleepHours,
							sleepGoal
						} = result[0];
						res.json({
							sleepHours,
							sleepGoal
						});
					}


				}
			});
			conn.release();
		}
	});
};


exports.getUserSleep = (req, res) => {
	let currentDate = getCurrentDate();
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
				sleepGoal,
				datepicker1
			} = req.body;

			console.log(`inside post user sleep: ${sleepHours}  ${sleepGoal}`);
			let errors = [];
			let newdate = (datepicker1.split('-')[1]) + '/' + datepicker1.split('-')[2] + '/' + datepicker1.split('-')[0];
			if (!sleepHours || !sleepGoal) {
				console.log(`inside if statement ${sleepHours}`);
				errors.push('Please enter all fields');
				console.log(errors, '----------------errros');
				res.render('userViews/userSleep', {
					layout: 'layouts/userLayout',
					title: 'User Sleep',
					userName: userName,

					errors,
				});
				return;
			}
			var stepQuery = `UPDATE happyhealth.usermetricstbl
				SET sleepHours = ${sleepHours}, sleepGoal = ${sleepGoal} WHERE userId = ${userId} and date = '${newdate}' ; `;
			conn.query(stepQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					req.flash['title'] = "Sleep Hours";
					req.flash['message'] = "Updated Metrics Sucessfully";
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.getUserHydrationByDate = (req, res) => {
	let dateId = req.params.date;
	console.log("finall in getUserWaterByDate " + dateId);
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			var newdate = (dateId.split('-')[1]) + '/' + dateId.split('-')[2] + '/' + dateId.split('-')[0];
			const waterQuery = `Select water, waterGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${newdate}' `;
			conn.query(waterQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {

					if (result.length == 0) {
						console.log(result, '--------default return values result');
						let insertQuery = `Insert into happyhealth.usermetricstbl(userId,date) values(${userId},'${newdate}');`;
						conn.query(insertQuery, function (err, result) {
							if (err) {
								console.log(err, "--------error in inserting query");

							} else {
								console.log(result, "----------inserted query");
								const water = waterGoal = 0;
								res.json({
									water,
									waterGoal
								});
							}
						});

					} else {
						console.log(result, '--------db user table result');
						const {
							water,
							waterGoal
						} = result[0];
						res.json({
							water,
							waterGoal
						});
					}


				}
			});
			conn.release();
		}
	});
};

exports.getUserHydration = (req, res) => {
	let currentDate = getCurrentDate();
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
				waterGoal,
				datepicker1
			} = req.body;
			console.log(`inside post user hyration`);
			let errors = [];
			let newdate = (datepicker1.split('-')[1]) + '/' + datepicker1.split('-')[2] + '/' + datepicker1.split('-')[0];
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
				SET water = ${water}, waterGoal = ${waterGoal} WHERE userId = ${userId} and date = '${newdate}' ;`;
			conn.query(hydrationQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					req.flash['title'] = "Water Consumed";
					req.flash['message'] = "Updated Metrics Sucessfully";
					console.log('----------susscesfully updated water db');
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.getUserTrackByDate = (req, res) => {
	let dateId = req.params.date;
	console.log("finall in getUserStepByDate " + dateId);
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			var newdate = (dateId.split('-')[1]) + '/' + dateId.split('-')[2] + '/' + dateId.split('-')[0];
			const stetpQuery = `Select meTime,meTimeGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${newdate}' `;
			conn.query(stetpQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {

					if (result.length == 0) {
						console.log(result, '--------default return values result');
						let insertQuery = `Insert into happyhealth.usermetricstbl(userId,date) values(${userId},'${newdate}');`;
						conn.query(insertQuery, function (err, result) {
							if (err) {
								console.log(err, "--------error in inserting query");

							} else {
								console.log(result, "----------inserted query");
								const meTime = meTimeGoal = 0;
								res.json({
									meTime,
									meTimeGoal
								});
							}
						});

					} else {
						console.log(result, '--------db user table result');
						const {
							meTime,
							meTimeGoal
						} = result[0];
						res.json({
							meTime,
							meTimeGoal
						});
					}


				}
			});
			conn.release();
		}
	});
};

exports.getUserTrack = (req, res) => {
	let currentDate = getCurrentDate();
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

					let {
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
				meTimeGoal,
				datepicker1
			} = req.body;
			console.log(`inside post user track`);
			let errors = [];
			let newdate = (datepicker1.split('-')[1]) + '/' + datepicker1.split('-')[2] + '/' + datepicker1.split('-')[0];
			if (!meTime || !meTimeGoal) {
				console.log(`inside if statement ${meTime}`);
				errors.push('Please enter all fields');
				console.log(errors, '----------------errros');
				res.render('userViews/userTrack', {
					layout: 'layouts/userLayout',
					title: 'User Track',
					userName: userName,

				});
			}
			var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET meTime = ${meTime}, meTimeGoal = ${meTimeGoal} WHERE userId = ${userId} and date = '${newdate}';`;
			conn.query(stepQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					req.flash['title'] = "Mindful Minutes";
					req.flash['message'] = "Updated Metrics Sucessfully";
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};


exports.getFruitsVeggiesByDate = (req, res) => {
	let dateId = req.params.date;
	console.log("finall in getUserStepByDate " + dateId);
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			var newdate = (dateId.split('-')[1]) + '/' + dateId.split('-')[2] + '/' + dateId.split('-')[0];
			const query = `Select fruits, fruitGoal, veggies, veggieGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${newdate}' `;
			conn.query(query, function (err, result) {
				if (err) {
					console.log(err);
				} else {

					if (result.length == 0) {
						console.log(result, '--------default return values result');
						let insertQuery = `Insert into happyhealth.usermetricstbl(userId,date) values(${userId},'${newdate}');`;
						conn.query(insertQuery, function (err, result) {
							if (err) {
								console.log(err, "--------error in inserting query");

							} else {
								console.log(result, "----------inserted query");
								const fruits = fruitGoal = veggies = veggieGoal = 0;
								res.json({
									fruits,
									fruitGoal,
									veggies,
									veggieGoal
								});
							}
						});

					} else {
						console.log(result, '--------db user table result');
						const {
							fruits,
							fruitGoal,
							veggies,
							veggieGoal
						} = result[0];
						console.log(fruits, fruitGoal, veggies, veggieGoal, "-------printing");
						res.json({
							fruits,
							fruitGoal,
							veggies,
							veggieGoal
						});
					}


				}
			});
			conn.release();
		}
	});
};

exports.getFruitsVeggies = (req, res) => {
	let currentDate = getCurrentDate();
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
				veggieGoal,
				datepicker1
			} = req.body;
			let newdate = (datepicker1.split('-')[1]) + '/' + datepicker1.split('-')[2] + '/' + datepicker1.split('-')[0];
			let updateFV = `update happyhealth.usermetricstbl set fruits = ${fruits} , fruitGoal= ${fruitgoal} , veggies = ${veggies} , veggieGoal= ${veggieGoal} where userId =${userId} and date = '${newdate}'; `;
			conn.query(updateFV, (err, result) => {
				if (err) {
					console.log(err, '=====> error while updating fruits & veggies');
				} else {
					console.log(result, '===========> updated successfully');
					req.flash['title'] = "Fruits and Veggies";
					req.flash['message'] = "Updated Metrics Sucessfully";
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};

exports.getUserPhysicalActivityByDate = (req, res) => {
	let dateId = req.params.date;
	console.log("finall in getUserStepByDate " + dateId);
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			var newdate = (dateId.split('-')[1]) + '/' + dateId.split('-')[2] + '/' + dateId.split('-')[0];
			const query = `Select physicalActivityMinutes, physicalActivityGoal from happyhealth.usermetricstbl where UserId = ${userId} and date = '${newdate}' `;
			conn.query(query, function (err, result) {
				if (err) {
					console.log(err);
				} else {

					if (result.length == 0) {
						console.log(result, '--------default return values result');
						let insertQuery = `Insert into happyhealth.usermetricstbl(userId,date) values(${userId},'${newdate}');`;
						conn.query(insertQuery, function (err, result) {
							if (err) {
								console.log(err, "--------error in inserting query");

							} else {
								console.log(result, "----------inserted query");
								const physicalActivityMinutes = physicalActivityGoal = 0;
								res.json({
									physicalActivityMinutes,
									physicalActivityGoal
								});
							}
						});

					} else {
						console.log(result, '--------db user table result');
						const {
							physicalActivityMinutes,
							physicalActivityGoal
						} = result[0];
						res.json({
							physicalActivityMinutes,
							physicalActivityGoal
						});
					}


				}
			});
			conn.release();
		}
	});
};

exports.getUserPhysicalActivity = (req, res) => {
	let currentDate = getCurrentDate();
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
				physicalActivityGoal,
				datepicker1
			} = req.body;
			let newdate = (datepicker1.split('-')[1]) + '/' + datepicker1.split('-')[2] + '/' + datepicker1.split('-')[0];
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
			var ppQuery = `UPDATE happyhealth.usermetricstbl SET physicalActivityMinutes = ${physicalActivityMinutes}, physicalActivityGoal = ${physicalActivityGoal} WHERE userId = ${userId} and date = '${newdate}';`;
			conn.query(ppQuery, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					req.flash['title'] = "Physical Activity";
					req.flash['message'] = "Updated Metrics Sucessfully";
					res.redirect('/home');
				}
			});

			conn.release();
		}
	});
};