var express = require('express');
var router = express.Router();
const {
  login
} = require("../controller/user");
const {
  SuccessModel,
  ErrorModel
} = require("../model/resModel");

/* GET users listing. */
router.post('/login', function(req, res, next) {
  var {username,password} = req.body
  const result = login(username,password);
  result.then(data=>{
      if(data){
          req.session.username = data.username;
          req.session.realname = data.realname;
          res.json(new SuccessModel("登录成功"))
      }
      res.json(new ErrorModel("登录失败"))
  })
});

// router.get('/session-test',function(req,res,next){
//   var session = req.session;
//   if(!session.num){
//     session.num = 0
//   }
//   session.num++
//   res.json({
//     num:session.num
//   })
// })

module.exports = router;