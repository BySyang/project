/* 管理员 */
const sqlPool = require('./sqlPool');
module.exports = {
  adminLog(adm,pwd,fn){
    let sql = `select * from admins wehre logName=? and logPwd=? `;
    sqlPool(sql,[adm,pwd],fn);
  }
}