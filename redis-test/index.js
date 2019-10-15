const redis = require("redis");

// 创建客户端
const redisClient = redis.createClient(6379,"127.0.0.1");
redis.addCommand("error",err=>{
    console.log(err)
})

// 测试
redisClient.set("username","liuhao",redis.print);
redisClient.get("username",(err,val)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("val",val)
    redisClient.quit();
})





