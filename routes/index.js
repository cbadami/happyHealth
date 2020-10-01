var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "select * from User_Info";
  db.query(sql,function(err,data,fields){
    if(err) throw err;
    console.log("connected ");
    console.log(data[0]['emailid']);
    var titleData = data[0]['emailid'];
    res.render('userLogin',{title: 'Happy Health',logindata: titleData});
  })
  
});

router.get('/userSignUp', function(req, res, next) {
  res.render('userSignUp');
});

module.exports = router;
