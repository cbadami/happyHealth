const db = require('../database');


exports.getActiveChallenges = (req, res) => {


    res.render('userViews/activeChallenges', {layout: 'layouts/userLayout', title: 'Active Challenges' });
    // const allGroupsQuery = `SELECT * FROM happyhealth.groupTbl`;

    // db.query(allGroupsQuery, function (err, result) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         console.log(result, "------------db group result");
    //         res.render('userViews/activeChallenges', {layout: 'layouts/userLayout', title: 'Active Challenges', result });
    //         console.log("***************getGroup executed successfully******************");
    //     }
    // });

};

exports.getAvailableChallenges = (req, res) => {

    res.render('userViews/availableChallenges', {layout: 'layouts/userLayout', title: 'Available Challenges' });
    // const allGroupsQuery = `SELECT * FROM happyhealth.groupTbl`;

    // db.query(allGroupsQuery, function (err, result) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         console.log(result, "------------db group result");
    //         res.render('adminViews/groupManagement', {layout: 'layouts/adminLayout', title: 'Group Management', result });
    //         console.log("***************getGroup executed successfully******************");
    //     }

    // });

};

exports.getCompletedChallenges = (req, res) => {

    res.render('userViews/completedChallenges', {layout: 'layouts/userLayout', title: 'Completed Challenges' });
    
};