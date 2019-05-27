const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog,
    delBlog
} = require("../controller/blog");
const { 
    SuccessModel, 
    ErrorModel 
} = require("../model/resModel");

const handleBlogRouter = (req,res)=>{
    const method = req.method;
    const path = req.routePath;
    const id = req.query.id;
    const postData = req.body;
    //获取博客列表
    if(method === "GET" && path === '/api/blog/list'){
        const author = req.query.author||"";
        const keyword = req.query.keyword||"";
        const resData = getList(author,keyword);

        return new SuccessModel(resData);
    }

    //获取博客详情
    if (method === "GET" && path === '/api/blog/detail') {
        const resData = getDetail(id);
        return new SuccessModel(resData)
    }

    //新建一篇博客
    if (method === "POST" && path === '/api/blog/new') {
        const resData = newBlog(id,postData)
        return new SuccessModel(resData)
    }

    //更新一篇博客
    if (method === "POST" && path === '/api/blog/update') {
        const result = updateBlog(id,postData)
        if (result){
            return new SuccessModel("博客更新成功")
        }else{
            return new ErrorModel("博客更新失败")
        }
    }

    //删除一篇博客
    if (method === "POST" && path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel("博客删除成功")
        } else {
            return new ErrorModel("博客删除失败")
        }
    }
}

module.exports = handleBlogRouter;