/* 商品 */
const sqlPool = require('./sqlPool');
let sql = `SELECT a.*,b.scoreId,b.userId,b.orderId,b.goodsUsers,b.orderScore,b.scoreText,b.isShow FROM goods a  LEFT JOIN goods_scores b ON a.goodsId=b.goodsId  WHERE a.typeId=?`;
module.exports = {
    goodsType(typeId,fn){
        let sql = `select * from goods_types where typeId=?`;
        sqlPool(sql,[typeId],fn)
    },
    goodsList(typeId, fn) {
        sqlPool(sql, [typeId], fn);
    },
    goodsOne(goodsId, fn) {
        let sql = `SELECT c.*,d.typeName,d.typeDes FROM (SELECT a.*,b.scoreId,b.orderId,b.userId,goodsUsers,b.orderScore,b.scoreText FROM goods AS a LEFT JOIN goods_scores b  ON a.goodsId=b.goodsId WHERE a.goodsId=?)AS c LEFT JOIN goods_types d ON c.typeId =d.typeId`;
        sqlPool(sql, [goodsId], fn)
    },
    goodscore(goodsId,fn){
        let sql =  `select * from goods_scores where goodsId=?`;
        sqlPool(sql,[goodsId],fn)
    },
    goodspecs(goodsId,fn){
        let sql =  `select * from goods_specs WHERE goodsId = ? `;
        sqlPool(sql,[goodsId],fn)
    }
}