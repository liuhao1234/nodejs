const http = require('http');


const server = http.createServer((req, res) => {
    console.log('method', req.method)
    if(req.method === 'POST'){
        console.log('req content-type',req.headers['content-type'])
        let postData = '';
        req.on('data',chunk => {
            //chunk是一个二进制格式的数据
            console.log("chunk",chunk)
            postData += chunk.toString();
        })

        req.on('end',() => {
            console.log(postData)
            console.log(JSON.parse(postData).name)
            res.end(postData)
        })
    }
    
})

server.listen(3000, () => {
    console.log('200,OK')
})
