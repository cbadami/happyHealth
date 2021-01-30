// const db = require('../database');

// exports = getUserProfile(req, res){
//     const allUserProfileQuery = `SELECT * FROM happyhealth.userTbl`;

//     db.query(allUserProfileQuery, function (err, result) {
//         if (err) {
//             throw err;
//         } else {
//             console.log(result, "------------db user result");
//             res.render('userViews/userProfile', {Layout: 'userLayout', title: 'Profile', result });
//             console.log("***************getUserProfile executed successfully******************");
//         }

//     });

// };