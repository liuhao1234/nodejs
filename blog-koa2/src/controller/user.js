const { exec,escape } = require("../db/mysql");
const login = (username,password)=>{
    var username = escape(username);
    var password = escape(password);
    const sql = `
        select username,realname from users where username=${username} and password=${password}
    `    
    return exec(sql).then(rows=>{
        //console.log(rows)
        return rows[0];
    })
}

module.exports = {
    login
}