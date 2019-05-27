const loginCheck = (username,password)=>{
    console.log("userData:", username, password)
    if(username === "zhangsan" && password === "123456"){
        return true;
    }
    return false;
}

module.exports = {
    loginCheck
}