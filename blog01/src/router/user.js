const {
    loginCheck
} = require("../controller/user");
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModel");

const handleUserRouter = (req,res)=>{
    const method = req.method;
    const path = req.routePath;
    const id = req.query.id;
    const postData = req.body;
    //用户登录
    if (method === "POST" && path === '/api/user/login') {
        const { username, password } = postData;
        const result = loginCheck(username,password)
        if(result){
            return new SuccessModel("登录成功")
        }else{
            return new ErrorModel("登录失败")
        }
    }
}

module.exports = handleUserRouter;