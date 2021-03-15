const db = require('../../database');


exports.getUserChallenges = (req, res) => {
    res.render('userViews/userChallenges', {
        layout: "layouts/userLayout",
        title: "User Management"
    });
};


exports.getUserMoreChallenges = (req, res) => {
    res.render('userViews/user_more_challenges', {
        layout: "layouts/userLayout",
        title: "User Management"
    });
};

exports.setChallengesAccept = (req, res) => {
    console.log("Set active");
    const userId = req.session.userId;
    res.render('userViews/challengeAccepted', {
        layout: 'layouts/userLayout',
        title: 'Active Challenges'
    });
};

exports.getActiveChallenges = (req, res) => {
    res.render('userViews/activeChallenges', {
        layout: 'layouts/userLayout',
        title: 'Active Challenges'
    });
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

    const allAvailableChallenges = `Select * from happyhealth.challengetbl`;

    db.query(allAvailableChallenges, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result, "------------db group result");
            res.render('userViews/availableChallenges', {
                layout: 'layouts/userLayout',
                title: 'Available Challanges',
                result
            });
            console.log(req.session.userId);
            console.log("***************Available challanges executed successfully******************");
        }
    });
};

exports.getCompletedChallenges = (req, res) => {

    res.render('userViews/completedChallenges', {
        layout: 'layouts/userLayout',
        title: 'Completed Challenges'
    });

};


exports.getPersonalGoals = (req, res) => {

    res.render('userViews/personalGoals', {
        layout: 'layouts/userLayout',
        title: 'Personal Goals'
    });

};