const router = require('koa-router')()

router.prefix('/api/users')

router.get('/login', function (ctx, next) {
  ctx.body = {
    errno:0,
    viewCount:ctx.session.viewCount
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
