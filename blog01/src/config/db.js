const  env = process.env.NODE_ENV //环境参数
let MYSQL_CONF = null;
if(env === 'dev'){
    MYSQL_CONF = {
        host:"localhost",
        user:"root",
        password:"1qaz!QAZ",
        port:"3306",
        database:"myblog"
    }
}

if(env === 'production'){
    MYSQL_CONF = {
        host:"localhost",
        user:"root",
        password:"1qaz!QAZ",
        port:"3306",
        database:"myblog"
    }
}
module.exports={
    MYSQL_CONF
}