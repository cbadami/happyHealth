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
									stepCount, stepGoal
								});
							}
						});

					} else {
						console.log(result, '--------db user table result');
						const { stepCount, stepGoal } = result[0];
						res.json({ stepCount, stepGoal });
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
					const { stepCount, stepGoal } = result[0];
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
			const { stepCount, stepGoal, datepicker1 } = req.body;
			let errors = [];
			var newdate = (datepicker1.split('-')[1]) + '/' + datepicker1.split('-')[2] + '/' + datepicker1.split('-')[0];
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


exports.getUserSleep = (req, res) => {
	getDate();
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

					var { sleepHours, sleepGoal } = result[0];

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
	getDate();
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
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
					userName: userName,

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
	getDate();
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

			conn.release();
		}
	});
};

exports.postUserHydration = (req, res) => {
	getDate();
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
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
	getDate();
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

					var { meTime, meTimeGoal } = result[0];

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
	getDate();
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
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
					userName: userName,

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
	getDate();
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
					const { fruits, fruitgoal, veggies, veggieGoal } = result[0];
					//console.log("ddd   "+fruits)
					res.render('userViews/userFruits', {
						layout: 'layouts/userLayout',
						title: 'User Fruits',
						userName: userName,
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
	getDate();
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
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
	getDate();
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

			conn.release();
		}
	});
};

exports.getFruitsVeggies = (req, res) => {
	getDate();
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

			conn.release();
		}
	});
};

exports.postFruitsVeggies = (req, res) => {
	getDate();

	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			let userId = req.session.userId;
			let { fruits, fruitgoal, veggies, veggieGoal } = req.body;

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
	getDate();
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
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
	getDate();

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

			conn.release();
		}
	});
};

exports.postUserPhysicalActivity = (req, res) => {
	getDate();

	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
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

