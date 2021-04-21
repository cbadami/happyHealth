
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
            const userId = req.session.userId;
			let currentDate = getCurrentDate();


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
		
										values = '';
										for (let i = 0; i < result.length; i++) {
											values += `(${result[i].userId},'${currentDate}',0,0,0,0,0,0,0,0,0,0,0,0,0,0),`;
										}
										values = values.slice(0, -1);
		
										console.log(values, '===========> users....');
										const newValuesQuery = `INSERT INTO happyhealth.usermetricstbl (userId, date, stepCount, stepGoal, sleepHours, sleepGoal, meTime, meTimeGoal, water, waterGoal, fruits, fruitGoal, veggies, veggieGoal, physicalActivityMinutes, physicalActivityGoal) values ${values};`;
										conn.query(newValuesQuery, (err3, result3) => {
											if (err3) {
												console.log('============> error while inserting metrics');
												conn.release();
												return;
											} else {
												console.log(result3, '===========> insert new values result3');
											}
										});
									}
								}
							});
						}
					});
				}
			});

            res.render('adminViews/adminHome', {
                layout: 'layouts/adminLayout',
                title: 'admin Home'
            });

            conn.release();
        }
    });


};

