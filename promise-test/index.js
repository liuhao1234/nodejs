//读取a.json的内容，根据next数据向下读取相关数据
const fs = require("fs");
const path = require("path");

//callback-hell 回调地狱
// getFileContent("a.json",aData=>{
//     console.log(aData.msg);
//     getFileContent(aData.next, bData=>{
//         console.log(bData.msg);
//         getFileContent(bData.next, cData => {
//             console.log(cData.msg);
//         })
//     })
// })

getFileContentByPromise("a.json").then(data=>{
    console.log(data.msg)
    return getFileContentByPromise(data.next)
}).then(data=>{
    console.log(data.msg)
    return getFileContentByPromise(data.next)
}).then(data=>{
    console.log(data.msg)
})

function getFileContent(fileName,callback){
    const fullFileName = path.resolve(__dirname, 'files', fileName);
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        callback(
            JSON.parse(data.toString())
        )
        //console.log(data.toString())
    })
}

function getFileContentByPromise(fileName){
    return new Promise((resolve,reject)=>{
        const fullFileName = path.resolve(__dirname,"files",fileName);
        fs.readFile(fullFileName,(err,data)=>{
            if(err){
                reject(err)
                return
            }

            resolve(
                JSON.parse(data.toString())
            )
        })
    })
}

