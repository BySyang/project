/* 用户 */
const sqlPool = require('./sqlPool');
let sql = ' select * from users ';

module.exports = {
    userLogin(user, pwd, fn) { //登录
        sqlPool(sql + 'where logName=? and logPwd=? ', [user, pwd], fn);
    },
    userInfo(user,fn){
        sqlPool(sql+'where logName=?',[user], fn)
    }
    
}