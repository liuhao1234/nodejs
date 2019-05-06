const URL = require("url");
const handleUserRouter = (req,res)=>{
    const method = req.method;
    const url = URL.parse(req.url);
    const path = url.pathname;
    const query = url.query;

    //用户登录
    if (method === "POST" && path === '/api/user/login') {
        return {
            msg: "这是用户登录的接口"
        }
    }
}

module.exports = handleUserRouter;