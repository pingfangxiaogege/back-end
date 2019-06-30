var express = require('express');
var router = express.Router();
var Movie = require('./../models/user.js');
var token = require('../token/getToken.js');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  let name = req.body.username;
  let pass = req.body.password;
  Movie.find({username: name}, function (err, data) {
    if (err) {
      throw err;
    }
    if (data.length > 0 && data) {
      if (data[0].password === pass) {
        let content = {username: data[0].username};
        token.setToken(content).then((data)=> {
          res.send(
            {
              "code": 200,
              "status": 0,
              "message": "登陆成功",
              "token":data
            }
          );
        })
      } else {
        res.send(
          {
            "code": 200,
            "status": 1,
            "message": "您输入的密码错误！"
          }
        );
      }
    } else {
      res.send(
        {
          "code": 200,
          "status": 1,
          "message": "用户不存在"
        }
      );
    }
  })
});

module.exports = router;
