const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'})
    res.end('<h1>hello world新更改!!!</h1>')
})

server.listen(3000,()=>{
    console.log('server is listenning on port 3000');
})