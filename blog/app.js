const URL = require("url");
const querystring = require("querystring");
const getPostData = require("./src/utils/getPostData");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const serverHandler = (req,res)=>{
    //设置返回格式
    //res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-type','application/json;charset=utf-8') //'text/plain'
    //处理url
    //解析路由
    const url = URL.parse(req.url);
    const path = url.pathname;
    req.routePath = path;

    //解析query
    const query = querystring.parse(url.query);//querystring.parse(str)可以将"name=liuhao&sex=male"字符串转成{name:'liuhao',sex:'male'}
    req.query = query;

    //解析cookie
    if(req.headers.cookie){
        const cookieStr = req.headers.cookie; //格式：k1=v1;k2=v2;k3=v3
        const cookieObj = querystring.parse(cookieStr.replace(";","&"));
        req.cookie = cookieObj;
    }
    req.cookie = {};
    
    getPostData(req).then(postData=>{
        req.body = postData;
        //处理blog路由
        const blogResult = handleBlogRouter(req, res);
        
        if (blogResult) {
            blogResult.then(data=>{
                res.end(JSON.stringify(data));
            })
            return
        }

        //处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(data=>{
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