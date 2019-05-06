const serverHandler = (req,res)=>{
    //设置返回格式
    res.setHeader('Content-type','application/json') //'text/plain'
    const resData = {
        name:'liuhao123',
        age:'33',
        env:process.env.NODE_ENV
    }
    res.end(JSON.stringify(resData));
}

module.exports = serverHandler;