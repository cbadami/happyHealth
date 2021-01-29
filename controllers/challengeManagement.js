const db = require('../database');


let challengeNaam = '';

exports.getChallengeManagement = (req, res) => {
  const viewChallengesQuery = `SELECT * FROM happyhealth.challengeTbl`;
  return db.query(viewChallengesQuery, function (err, result) {
    if (err) throw err;
    else {
      return res.render("adminViews/challengeManagement", {
        layout: "layouts/adminLayout",
        result,
        title: "Challenge Management",
      });
    }
  });
};

exports.addChallenge = (req, res) => {
  res.render('adminViews/addChallenge', { layout: "layouts/adminLayout" })
}


exports.editChallenge = (req, res) => {
  let cid = req.params.cid;

  const viewChallengesQuery = `SELECT * FROM happyhealth.challengeTbl WHERE challengeId =  ${cid}`;
  return db.query(viewChallengesQuery, function (err, result) {
    if (err) throw err;
    else {
      console.log(result);
      return res.render('adminViews/editChallenge', { result, layout: "layouts/adminLayout" })
    }
  });
}

exports.updateChallenge = (req, res) => {
  let cid = req.params.cid;
  const { name, description, challengeType, participantType, participantCount, startDate, endDate } = req.body;


  const updateQuery = `UPDATE happyhealth.challengeTbl SET challengeName =  '${name}' , challengeDescription = '${description}', challengeType= '${challengeType}', participantType='${participantType}', participantCount=${participantCount},startDate='${startDate}', endDate= '${endDate}' where challengeId = ${cid}`
  return db.query(updateQuery, function (err, result) {
    if (err) throw err;
    else {
      console.log("Successfully updated");
      // return res.render('adminViews/challengeManagement', {result, layout: "layouts/adminLayout" })
    }
  });

  //Viewing All challenges
  const viewChallengesQuery = `SELECT * FROM happyhealth.challengeTbl`;
  return db.query(viewChallengesQuery, function (err, result) {
    if (err) throw err;
    else {
      return res.render("adminViews/challengeManagement", {
        layout: "layouts/adminLayout",
        result,
        title: "Challenge Management",
      });
    }
  });

}

exports.deleteChallenge =  (req, res) => {
  let cid = req.params.cid;

  const deleteQuery = `DELETE from happyhealth.challengeTbl where challengeId = ${cid} `;
  return db.query(deleteQuery, function (err, result) {
    if (err) throw err;
    else {
      console.log("Successfully deleted");
    }
  });

    //Viewing All challenges
    const viewChallengesQuery = `SELECT * FROM happyhealth.challengeTbl`;
    return db.query(viewChallengesQuery, function (err, result) {
      if (err) throw err;
      else {
        return res.render("adminViews/challengeManagement", {
          layout: "layouts/adminLayout",
          result,
          title: "Challenge Management",
        });
      }
    });



}


exports.postChallenge = (req, res) => {
  const { name, description, challengeType, participantCount, participantType, startDate, endDate } = req.body;
  //(id,challengeName,description,challengeType,startDate,endDate,partcipantType,participantCount)

  console.log(req.body);

  const insert = `INSERT INTO happyhealth.challengeTbl (challengeName, challengeDescription, challengeType, participantType, participantCount , startDate, endDate) VALUES('${name}', '${description}', '${challengeType}', '${participantType}', ${participantCount}, '${startDate}', '${endDate}'); `;

  db.query(insert, (err, results) => {
    if (err) throw err;
    else {
      console.log("Successfully added challenge to db");
    }
  });
  res.redirect('/challengeManagement');
};


exports.getLeaderboard = (req, res) => {
  console.log(req.params.challengeId);

  let id = parseInt(req.params.challengeId);
  console.log("id of selected challenge: " + id);

  var viewChallengesQuery = `SELECT challengeName FROM happyhealth_MySQL.challengeManagement  where id = ${id}`;
  // "SELECT balance FROM members WHERE username = 'kappa'"


  db.query(viewChallengesQuery, function (err, result) {

    if (err) {
      console.log(err);
    }
    else {
      //check to see if the result is empty
      if (result.length > 0) {

        //console.log(`result: ${JSON.stringify(result)}`)
        // console.log(`length of result: ${result.length}`)
        // let strResult = JSON.stringify(result)
        // const value = result[index].challengeName
        //console.log(" Value :  " +(result[index].challengeName))
        // value = result[index]['challengeName'];
        // console.log(value);

        challengeNaam = result[0].challengeName;

        console.log(challengeNaam);

        res.render('leaderboard', { challengeNaam: challengeNaam });

      }

    }

  });

};