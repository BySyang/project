/* 订单 */
const sqlPool = require('./sqlPool');
let sql =  `SELECT * FROM orders a, order_goods b,goods c , goods_specs d WHERE a.userId=1 AND a.orderId=b.orderId AND b.goodsId=c.goodsId=d.goodsId`;
module.exports = {
    orderList(userId,fn){
        sqlPool(sql,[userId],fn);
    }
}