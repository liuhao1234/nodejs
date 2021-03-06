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
    console.log(sql)
    return exec(sql);
}

const getDetail = (id)=>{
    let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows=>{
        return rows[0]
    });
}

const newBlog = (blogData,author)=>{
    let title = blogData.title||"未命名标题";
    let content = blogData.content||"作者未输入内容";
    let createtime = new Date().getTime();
    let sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}')`
    return exec(sql);
}

const updateBlog = (blogData)=>{
    const id = blogData.id;
    const title = blogData.title;
    const content = blogData.content;
    let sql = `update blogs set title='${title}',content='${content}' where id='${id}'`
    return exec(sql);
}

const delBlog = (id)=>{
    let sql = `delete from blogs where id='${id}'`;
    return exec(sql);
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}