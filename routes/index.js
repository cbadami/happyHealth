var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('userLogin', { title: 'Express' });
});

router.get('/userSignUp', function(req, res, next) {
  res.render('userSignUp');
});

module.exports = router;
