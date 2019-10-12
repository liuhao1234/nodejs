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
    const url = URL.parse(req.url);
    const path = url.pathname;
    const query = querystring.parse(url.query);
    req.query = query;
    req.routePath = path;

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