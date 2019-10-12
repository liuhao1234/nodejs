const {
    login
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
        const result = login(username,password)
        return result.then(data=>{
            if(data){
                return new SuccessModel("登录成功")
            }
            return new ErrorModel("登录失败")
        })
        
    }
}

module.exports = handleUserRouter;