/* 管理员 */
const sqlPool = require('./sqlPool');
module.exports = {
  adminLog(logName,logPwd,fn){
    let sql = `select * from admins where logName=? and logPwd=? `;
    sqlPool(sql,[logName,logPwd],fn);
  },
}