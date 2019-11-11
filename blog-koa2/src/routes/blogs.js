const router = require('koa-router')()
const { SuccessModel,ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const { 
  getList, 
  getDetail, 
  newBlog, 
  updateBlog,
  delBlog
} = require("../controller/blog")

router.prefix('/api/blog')

router.get('/list',loginCheck, async (ctx, next)=>{
  const author = ctx.session.username;
  //query值可以通过两种方式获取，ctx.request.query或者ctx.query
  const keyword = ctx.request.query.keyword||"";
  const result = await getList(author,keyword);
  ctx.body = new SuccessModel(result)
})

router.get('/detail', async (ctx, next)=>{
  const id = ctx.request.query.id;
  const result = await getDetail(id);
  ctx.body = new SuccessModel(result)
})

router.post('/new', async (ctx, next)=>{
  const author = ctx.session.username
  const postData = ctx.request.body
  postData.author = author
  const result = await newBlog(postData)
  if(result.insertId){
    ctx.body = new SuccessModel('新建成功')
  }else{
    ctx.body = new ErrorModel('新建失败')
  }
})

router.post('/update', async (ctx, next)=>{
  const postData = ctx.request.body;
  const result = await updateBlog(postData);
  if (result.affectedRows>0){
      if(data.changedRows>0){
        ctx.body = new SuccessModel("博客更新成功")
      }else{
        ctx.body = new SuccessModel("博客已被更新")
      }
  }else{
    ctx.body = new ErrorModel("博客更新失败")
  }
})

router.post('/del', async (ctx, next)=>{
  const id = ctx.request.query.id;
  const result = await delBlog(id);
  if (result.affectedRows){
    ctx.body = new SuccessModel("博客删除成功")
  }else{
    ctx.body = new ErrorModel("博客删除失败")
  }
})

module.exports = router