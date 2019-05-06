const http = require('http');
const URL = require('url');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
    console.log('method',req.method)
    const url = req.url;// /?name=liuhao&age=17
    console.log('url:',url);
    req.query = querystring.parse(URL.parse(url).query);
    req.query2 = URL.parse(url);
    console.log('query:',req.query);
    console.log('query2:',req.query2);
    res.end(JSON.stringify(req.query));
})

server.listen(3000,()=>{
    console.log('200,OK')
})
