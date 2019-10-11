const { exec } = require("../db/mysql");
const getList = (author,keyword)=>{
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql);
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