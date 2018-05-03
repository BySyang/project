/* 订单 */
const sqlPool = require('./sqlPool');
let sql = `SELECT * FROM orders a, order_goods b,goods c , goods_specs d WHERE a.userId=? AND a.orderId=b.orderId AND b.goodsId=c.goodsId=d.goodsId`;
module.exports = {
    orderList(userId, fn) {
        sqlPool(sql, [userId], fn);
    },
    orderAdd(arr, fn) {
        let sql = 'insert into orders values' +
            '(null,?,?,1,?,' +
            '11,?,?,null,20,' +
            '1,0,0,0,default,' +
            'null,null,?,1,null,0)'
        /*
         *Id,用户ID,订单号,订单状态,商品总金额(打折前)
         *,运费,订单总金额(运费加商品总金额),打折后总金额,用户留言,订单积分
         * 支付方式,是否支付,是否评价,是否取消,创建时间
         * 订单地址,管理员留言,物流号,快递方式,退款信息,退款状态
         *
         */
        sqlPool(sql,arr,fn);

    }
}