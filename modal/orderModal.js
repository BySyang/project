/* 订单 */
const sqlPool = require('./sqlPool');
let sql =  `SELECT * FROM orders a, order_goods b,goods c , goods_specs d,pays e WHERE a.userId=? AND a.orderId=b.orderId AND b.goodsId=c.goodsId=d.goodsId AND a.orderPayMethod=e.id`;
module.exports = {
    orderList(userId,fn){
        sqlPool(sql,[userId],fn);
    }
}