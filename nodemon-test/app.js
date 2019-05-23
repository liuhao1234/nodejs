const http = require("http");
const url = require("url");
const querystring = require("querystring");

const serverHandler = (req,res)=>{
    var method = req.method;
    var reqUrl = req.url;
    var reqUrlObj = url.parse(reqUrl);
    var query = querystring.parse(reqUrlObj.query);

    res.setHeader("content-type","application/json;charset=UTF-8");
    const resData = {
        method,
        reqUrl,
        reqUrlObj,
        query
    }
    res.end(JSON.stringify(resData));
}

const server = http.createServer(serverHandler);

server.listen(3000,()=>{
    console.log("server is listening on port 3000")
})