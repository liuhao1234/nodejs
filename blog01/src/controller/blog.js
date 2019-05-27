const getList = (author,keyword)=>{
    //先返回假数据
    const resData = [{
            id: 1,
            title: "标题A",
            content: "内容A",
            createTime: 1558841290238,
            author: "lisi"
        }, {
            id: 2,
            title: "标题B",
            content: "内容B",
            createTime: 1558841490238,
            author: "zhangsan"
        }, {
            id: 3,
            title: "标题C",
            content: "内容C",
            createTime: 1558841690238,
            author: "wangermazi"
        }]
    return resData
}

const getDetail = (id)=>{
    const resData = {
        id: 1,
        title: "标题A",
        content: "详情内容A",
        createTime: 1558841290238,
        author: "lisi"
    }
    return resData;
}

const newBlog = (blogData)=>{
    const resData = {
        id:101
    }
    return resData;
}

const updateBlog = (id,blogData)=>{
    console.log("updateBlog-id", id)
    console.log("updateBlog-blogData", blogData)
    return false;
}

const delBlog = (id)=>{
    console.log(id)
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}