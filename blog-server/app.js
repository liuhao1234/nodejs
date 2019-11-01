const URL = require("url");
const querystring = require("querystring");
const { set, get } = require("./src/db/redis");
const { access } =require("./src/utils/log");
const loginCheck = require("./src/utils/loginCheck");
const getPostData = require("./src/utils/getPostData");
const getCookieExpires = require("./src/utils/getCookieExpires");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// 代码上线是上传代码重新启动服务

const serverHandler = (req,res)=>{
    // 记录日志
    access(`${req.method}--${req.url}--${req.headers['user-agent']}--${new Date().getTime()}`);
    //设置返回格式
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Content-type','application/json;charset=utf-8') //'text/plain'
    //处理url
    const url = URL.parse(req.url);

    //解析路由
    const path = url.pathname;
    req.routePath = path;
    
    //解析query
    const query = querystring.parse(url.query);//querystring.parse(str)可以将"name=liuhao&sex=male"字符串转成{name:'liuhao',sex:'male'}
    req.query = query;

    //解析cookie
    if(req.headers.cookie){
        const cookieStr = req.headers.cookie.replace(/\s+/g,""); //格式：k1=v1;k2=v2;k3=v
        const cookieObj = {};
        cookieStr.split(";").forEach(item => {
            if(!item){
                return;
            }
            var itemArr = item.split("=");
            var key = itemArr[0];
            var value =  itemArr[1];
            cookieObj[key] = value;
        });
        // console.log(cookieObj)
        req.cookie = cookieObj;
    }else{
        req.cookie = {};
    }

    //解析session
    // let userId = req.cookie.userid
    // if(userId){//判断前台是否登录
    //     if(!SESSION_DATA[userId]){//判断session中是否有该用户数据
    //         SESSION_DATA[userId] = {}
    //     }
    // }else{//如果没有用户则创建新用户
    //     userId = `${new Date().getTime()}_${Math.random()}`
    //     res.setHeader("Set-Cookie",`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);//httpOnly:只允许后端改
    //     SESSION_DATA[userId] = {}
    // }

    // req.session = SESSION_DATA[userId]

    let userId = req.cookie.userid
    if(!userId){//判断前台是否登录
        userId = `${new Date().getTime()}_${Math.random()}`
        res.setHeader("Set-Cookie",`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);//httpOnly:只允许后端改
        set(userId,{})
    }
    req.sessionId = userId;
    get(userId).then(sessionData => {
        if(!sessionData){
            set(userId,{})
            req.session = {}
        }else{
            req.session = sessionData
        }
        
        return getPostData(req);
    }).then(postData=>{
        req.body = postData;
        //处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(data=>{
                res.end(JSON.stringify(data));
            })
            return
        }

        //验证是否登录
        const loginCheckResult = loginCheck(req);
        if(loginCheckResult){
            loginCheckResult.then(data=>{
                res.end(JSON.stringify(data));
            })
            return
        }

        //处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(data=>{
                res.end(JSON.stringify(data));
            })
            return
        }

        //处理404
        res.writeHead("404", { "Content-type": "text/plain" })
        res.write("404 NOT FOUND");
        res.end();
    });
}

module.exports = serverHandler;