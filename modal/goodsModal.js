/* 商品 */
const sqlPool = require('./sqlPool');
let sql =  `SELECT * FROM goods a,goods_types b,goods_scores c  WHERE a.typeId = b.typeId and a.goodsId=c.goodsId` ;
    
module.exports = {
    goodsList(fn){
        sqlPool(sql,fn);
    },
    goodsOne(goodsId,fn){
        let sql = `SELECT * FROM (SELECT *FROM goods WHERE goodsId=?)AS a ,goods_scores b WHERE a.goodsId=b.goodsId`;
        sqlPool(sql ,[goodsId],fn)
    }
}
