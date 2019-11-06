const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', function (ctx, next) {
  ctx.body = 'this is a blog/list response!'
})

module.exports = router