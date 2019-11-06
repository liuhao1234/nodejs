var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const path = require('path');
const fs = require('fs');
const session = require('express-session')
const connectRedis = require('connect-redis')

const redisStore = connectRedis(session);
const redisClient = require('./src/db/redis');

const sessionStore = new redisStore({
  client:redisClient
})

var blogRouter = require('./src/routes/blog');
var usersRouter = require('./src/routes/user');

var app = express();

if(process.env.NODE_ENV !== 'dev'){
  app.use(logger('dev',{
    stream:process.stdout//打印到控制台
  }));//打印日志
}else{
  const logFileName = path.join(__dirname,'logs','access.log');
  const writeStream = fs.createWriteStream(logFileName,{
    flags:'a'
  })
  app.use(logger('combined',{
    stream:writeStream//打印到控制台
  }));//打印日志
}

app.use(express.json());//解析postData
app.use(express.urlencoded({ extended: false }));//解析postData兼容处application/json以外的格式
app.use(cookieParser());//解析cookie

app.use(session({
  resave: false, //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  secret:"1qaz@WSX",
  cookie:{
    path:'/',//默认配置,可不写
    httpOnly:true,//默认配置,可不写
    macAge:24*60*60*1000
  },
  store:sessionStore//有了store会自动把内容中的session存到store中
}))

app.use('/api/blog', blogRouter);
app.use('/api/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
