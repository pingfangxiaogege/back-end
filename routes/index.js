var express = require('express');
var utility = require('utility');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.query)
   
  //   var q = req.query.q;
  //   var md5Value = utility.md5(q);
  //   res.send(md5Value);

  res.render('index', { title: 'Express' });
});

module.exports = router;
