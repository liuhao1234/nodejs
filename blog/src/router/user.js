const {
    login,
    loginTest
} = require("../controller/user");
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModel");
const {
    set
} = require("../db/redis");

const handleUserRouter = (req,res)=>{
    const method = req.method;
    const path = req.routePath;
    //用户登录
    if (method === "POST" && path === '/api/user/login') {
        const { username, password } = req.body;
        const result = login(username,password);
        return result.then(data=>{
            if(data){
                // 设置session
                req.session.username = data.username;
                req.session.realname = data.realname;
                set(req.sessionId,req.session)
                return new SuccessModel("登录成功")
            }
            return new ErrorModel("登录失败")
        })
    }
    //用户登录验证测试
    // if (method === "GET" && path === '/api/user/login-test') {
    //     if(req.session.username){
    //         return Promise.resolve(
    //             new SuccessModel(req.session)
    //         )
    //     }
    //     return Promise.resolve(new ErrorModel("登录失败"))
    // }
}

module.exports = handleUserRouter;