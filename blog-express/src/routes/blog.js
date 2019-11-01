var express = require('express');
var router = express.Router();
const {
  SuccessModel,
  ErrorModel
} = require("../model/resModel");
const {
  loginCheck
} = require("../middleware/loginCheck");
const { 
  getList, 
  getDetail, 
  newBlog, 
  updateBlog,
  delBlog
} = require("../controller/blog");

/* GET users listing. */
router.get('/list',function(req, res, next) {
  const author = req.session.username;
  const keyword = req.query.keyword||"";
  const result = getList(author,keyword);
  result.then(data=>{
    res.json(new SuccessModel(data))
  })
});
router.get('/detail', function(req, res, next) {
  const id = req.query.id;
  const result = getDetail(id);
  result.then(data=>{
    res.json(new SuccessModel(data));
  })
});
router.post('/new',function(req,res,next){
  const author = req.session.username;
  const postData = req.body
  const result = newBlog(postData,author);
  result.then(data=>{
      if(data.insertId){
        res.json(new SuccessModel('新建成功'));
      }else{
        res.json(new ErrorModel('新建失败'));
      }
  })
})
router.post('/update',function(req,res,next){
  const postData = req.body;
  const result = updateBlog(postData);
  result.then(data=>{
      // console.log("updateMsg",data)
      if (data.affectedRows>0){
          if(data.changedRows>0){
            res.json(new SuccessModel("博客更新成功"))
          }else{
            res.json(new SuccessModel("博客已被更新"))
          }
      }else{
        res.json(new ErrorModel("博客更新失败"))
      }
  })
})

router.post('/del',function(req,res,next){
  const id = req.query.id;
  const result = delBlog(id);
  result.then(data=>{
      // console.log(data)
      if (data.affectedRows){
        res.json(new SuccessModel("博客删除成功"))
      }else{
        res.json(new ErrorModel("博客删除失败"))
      }
  })
})

module.exports = router;