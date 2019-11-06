const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const blogs = require('./routes/blogs')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))//主要针对postdata中row-body数据类型的解析
app.use(json())//主要针对postdata中application/json数据类型的解析
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} ${ms}ms`)
})

// session 配置
app.keys = ['1qaz!QAZ']
app.use(session({
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24*60*60*1000
  },
  store:redisStore({
    all:'127.0.0.1:6379',
  })
}))

// routes
app.use(blogs.routes(), blogs.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
