const mysql = require("mysql");
const  { MYSQL_CONF }  = require("../config/db");
//创建连接
const connection = mysql.createConnection(MYSQL_CONF);

//开始连接
connection.connect();

//执行sql语句
function exec(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec
}