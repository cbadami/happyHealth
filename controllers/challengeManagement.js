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
  res.render('adminViews/addChallenge', { layout: "layouts/adminLayout" });
};


exports.editChallenge = (req, res) => {
  let cid = req.params.cid;

  const viewChallengesQuery = `SELECT * FROM happyhealth.challengeTbl WHERE challengeId =  ${cid}`;
  return db.query(viewChallengesQuery, function (err, result) {
    if (err) throw err;
    else {
      console.log(result);
      return res.render('adminViews/editChallenge', { result, layout: "layouts/adminLayout" });
    }
  });
};

exports.updateChallenge = (req, res) => {
  let cid = req.params.cid;
  let { name, description, challengeType, participantType, participantCount, startDate, endDate } = req.body;
  let [year, month, date] = startDate.split("-")
  startDate = month + '/' + date + '/' + year
  let [y, m, d] = endDate.split("-")
  endDate = m + '/' + d + '/' + y
  console.log(startDate,endDate,"----------dates");

  const updateQuery = `UPDATE happyhealth.challengeTbl SET challengeName =  '${name}' , challengeDescription = '${description}', challengeType= '${challengeType}', participantType='${participantType}', participantCount=${participantCount},startDate='${startDate}', endDate= '${endDate}' where challengeId = ${cid}`;
  db.query(updateQuery, function (err, result) {
    if (err) throw err;
    else {
      console.log("Successfully updated");
      // return res.render('adminViews/challengeManagement', {result, layout: "layouts/adminLayout" })
      res.redirect('/challengeManagement');
    }
  });


};

exports.deleteChallenge = (req, res) => {
  let cid = req.params.cid;

  const deleteQuery = `DELETE from happyhealth.challengeTbl where challengeId = ${cid} `;
  db.query(deleteQuery, function (err, result) {
    if (err) throw err;
    else {
      console.log("Successfully deleted");
      res.redirect('/challengeManagement');
    }
  });

};


exports.postChallenge = (req, res) => {
  console.log(req.body,"----------adding post challenge");
  let { name, description, adminChallengeType, participantCount, participantType, startDate, endDate } = req.body;
  //(id,challengeName,description,challengeType,startDate,endDate,partcipantType,participantCount)
  let [year, month, date] = startDate.split("-")
  startDate = month + '/' + date + '/' + year
  let [y, m, d] = endDate.split("-")
  endDate = m + '/' + d + '/' + y
  console.log(startDate,endDate,"----------dates");
  const insert = `INSERT INTO happyhealth.challengeTbl (challengeName, challengeDescription, challengeType, participantType, participantCount , startDate, endDate) VALUES('${name}', '${description}', '${adminChallengeType}', '${participantType}', ${participantCount}, '${startDate}', '${endDate}'); `;
  db.query(insert, (err, results) => {
    if (err) throw err;
    else {
      console.log("Successfully added challenge to db");
    }
  });
  res.redirect('/challengeManagement');
};


exports.getChallengeUsers = (req, res) => {
  let challengeId = req.params.challengeId;
  console.log(challengeId,"--------challenge Id");
  let sql = `SELECT challengeName, participantType FROM happyhealth.challengetbl  where challengeId = ${challengeId}; SELECT userId,userName FROM happyhealth.usertbl; SELECT * FROM happyhealth.userchallengestbl; `;
  db.query(sql, [2, 1], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);

    let challengeData = results[0];
    let userData = results[1];
    let joinedUsers = results[2];

    res.render('adminViews/manageChallengeUsers', { challengeData, userData, joinedUsers, layout: "layouts/adminLayout" });
  });
};

