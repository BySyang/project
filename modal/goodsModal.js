/* 商品 */
const sqlPool = require('./sqlPool');
let sql = `SELECT * FROM goods LEFT JOIN  goods_scores ON goods.goodsId=goods_scores.goodsId WHERE goods.typeId=?`;
module.exports = {
    goodsList(typeId, fn) {
        sqlPool(sql, [typeId], fn);
    },
    goodsOne(goodsId, fn) {
        let sql = `SELECT * FROM (SELECT *FROM goods WHERE goodsId=?)AS a ,goods_scores b WHERE a.goodsId=b.goodsId`;
        sqlPool(sql, [goodsId], fn)
    }
}