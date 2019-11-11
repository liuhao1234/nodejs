const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')
router.prefix('/api/user')

router.post('/login', async (ctx, next)=>{
  const { username,password } = ctx.request.body
  const result = await login(username,password);
  if(result){
    ctx.session.username = username;
    ctx.session.password = password;
    ctx.body = new SuccessModel('登录成功')
  }else{
    ctx.body = new ErrorModel('登录失败')
  }
})

router.get('/session-test', function (ctx, next) {
  if(ctx.session.viewCount == null){
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++
  ctx.body = {
    errno:0,
    viewCount:ctx.session.viewCount
  }
})

module.exports = router
