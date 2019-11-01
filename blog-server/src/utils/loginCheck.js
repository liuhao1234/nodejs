const { ErrorModel } = require('../model/resModel');
function loginCheck(req){
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel("未登录")
        )
    }
}
module.exports = loginCheck