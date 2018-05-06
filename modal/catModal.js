/* 购物车 */
const sqlPool = require('./sqlPool');
let sql = `SELECT a.*,b.goodsName,b.goodsImg FROM cats a ,goods b WHERE a.goodsId=b.goodsId AND a.userId=?`;
    
module.exports = {
    catList(userId,fn){
        sqlPool(sql,[userId],fn);
    },
    catAdd(arr,fn){
        let sql = 'insert into cats values(null,?,?,?,?,?,0,default)';
        //用户id,商品id,商品价格,商品数量,商品规格,是否取消,时间.
        sqlPool(sql,arr,fn)
    },
    catCancel(arr,fn){
        console.log(arr)
        let sql = 'UPDATE cats SET isCancel=1 WHERE cartId IN (?)';
        sqlPool(sql,arr,fn)
    }
}
