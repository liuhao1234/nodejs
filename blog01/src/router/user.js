const handleUserRouter = (req,res)=>{
    const method = req.method;
    const path = req.routePath;
    //用户登录
    if (method === "POST" && path === '/api/user/login') {
        return {
            msg: "这是用户登录的接口"
        }
    }
}

module.exports = handleUserRouter;