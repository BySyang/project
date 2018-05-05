/* 购物车 */
const sqlPool = require('./sqlPool');
let sql =  `SELECT * FROM cats a ,goods b, goods_specs c WHERE a.goodsId=b.goodsId AND a.specId=c.specId HAVING userId =?` ;
    
module.exports = {
    catList(userId,fn){
        sqlPool(sql,[userId],fn);
    },
    catAdd(arr,fn){
        let sql = 'insert into cats values(null,?,?,?,?,?,0,default)';
        //用户id,商品id,商品价格,商品数量,商品规格,是否取消,时间.
        sqlPool(sql,arr,fn)
    }
}
