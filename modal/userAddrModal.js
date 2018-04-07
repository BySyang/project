/* 用户地址 */
const sqlPool = require('./sqlPool');
let sql = 'select * from users_address ';
module.exports = {
    userAddr(userId, fn) {
        sqlPool(sql + ' where userId=?', [userId], fn);
    }
}