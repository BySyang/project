/* 购物车 */
const sqlPool = require('./sqlPool');
let sql =  `SELECT * FROM cats a ,goods b, goods_specs c WHERE a.goodsId=b.goodsId AND a.specId=c.specId HAVING userId =?` ;
    
module.exports = {
    catList(userId,fn){
        sqlPool(sql,[userId],fn);
    },
}
