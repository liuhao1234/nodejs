const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const morgan = require('koa-morgan')
const path = require('path')
const fs = require('fs')

const blogs = require('./src/routes/blogs')
const users = require('./src/routes/users')

// app
const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))//主要针对postdata中row-body数据类型的解析
app.use(json())//主要针对postdata中application/json数据类型的解析
app.use(logger())//让控制台打印的日志格式更加规整
// 打印日志
const ENV = process.env.NODE_ENV
if(ENV === 'dev'){
  app.use(morgan('dev',{
    stream:process.stdout//打印到控制台
  }));//打印日志
}else{
  const logFileName = path.join(__dirname,'logs','access.log');
  const writeStream = fs.createWriteStream(logFileName,{
    flags:'a'
  })
  app.use(morgan('combined',{
    stream:writeStream//打印到控制台
  }));//打印日志
}

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
