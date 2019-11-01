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
        const author = req.session.username;
        console.log(author)
        const keyword = req.query.keyword||"";
        const result = getList(author,keyword);

        return result.then(listdata => {
            return new SuccessModel(listdata);
        })  
    }

    //获取博客详情
    if (method === "GET" && path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }

    //新建一篇博客
    if (method === "POST" && path === '/api/blog/new') {
        const author = req.session.username;
        const result = newBlog(postData,author);
        return result.then(data=>{
            if(data.insertId){
                return new SuccessModel('新建成功')
            }else{
                return new ErrorModel('新建失败')
            }
        })
    }

    //更新一篇博客
    if (method === "POST" && path === '/api/blog/update') {
        const result = updateBlog(id,postData);
        return result.then(data=>{
            // console.log("updateMsg",data)
            if (data.affectedRows>0){
                if(data.changedRows>0){
                    return new SuccessModel("博客更新成功")
                }else{
                    return new SuccessModel("博客已被更新")
                }
            }else{
                return new ErrorModel("博客更新失败")
            }
        })
    }

    //删除一篇博客
    if (method === "POST" && path === '/api/blog/del') {
        const author = req.session.username
        const result = delBlog(id,author)
        return result.then(data=>{
            // console.log(data)
            if (data.affectedRows){
                return new SuccessModel("博客删除成功")
            }else{
                return new ErrorModel("博客删除失败")
            }
        })
    }
}

module.exports = handleBlogRouter;