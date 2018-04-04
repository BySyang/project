/* 用户 */
const sqlPool = require('./sqlPool');
let sql = ' select * from users ';

module.exports = {
    userLogin(user, pwd, fn) { //登录
        sqlPool(sql + 'where logName=? and logPwd=? ', [user, pwd], fn);
    },
    register(user,pwd,fn){
        let insertSql = 
        `insert into users values (null,?,?,?,null,default,default,'personal_personImg.jpeg',?,'2015-12-14',null,default,default,null,default)`;
        // id , logName  ?, logPwd ?, userName ?, trueName , userType , userSex,  userPhoto , userPone ? , userBirthday , userEmail ,userScore , createTime , lastTime ,userStatus
        sqlPool(insertSql,[user,pwd,user,user],fn);
    },
    userInfo(user,fn){
        sqlPool(sql+'where logName=?',[user], fn)
    },
    resetPwd(user,pwd,fn){
        let updateSql = 'update users set logPwd= ?  where logName=?';
        sqlPool(updateSql,[pwd,user],fn)
    }
    
}