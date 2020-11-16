const db = require('../database');

exports.getChallengeManagement = (req, res) => {
    res.render('challengeManagement');
    let query = `SELECT * FROM happyhealth_MySQL.challengeManagement;`

    db.query(query, (err, results) => {
        if (err) throw err;
        else {
            // console.log(results)
        }
    })
}

exports.postChallenge = (req, res) => {
    const { name, description, type, startDate, endDate, participantType, participantCount } = req.body
    //(id,challengeName,description,challengeType,startDate,endDate,partcipantType,participantCount)

    const insert = `INSERT INTO happyhealth_MySQL.challengeManagement (challengeName, description, challengeType, startDate, endDate, participantType, participantCount) VALUES('${name}', '${description}', '${type}', '${startDate}', '${endDate}', '${participantType}', ${participantCount}); `

    db.query(insert, (err, results) => {
        if (err) throw err;
        else {
             console.log("Successfully added challenge to db")
        }
    })

    // const count = `SELECT COUNT FROM happyhealth_MySQL.challengeManagement`;

    // db.query(count, (err,result)=>{
    //     if(err) throw err;
    //     else{
    //         console.log("No. Of rows: "+result.length )
    //     }
    // })
    

    const select = `select * from happyhealth_MySQL.challengeManagement ` ;

    res.redirect('/challengeManagement');

}


exports.getLeaderboard = (req, res) => {
    const chName = challengeMangemwnt.
        res.render('leaderboard', { chName: chName });
}