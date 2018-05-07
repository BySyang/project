/* 订单 */
const sqlPool = require('./sqlPool');
let sql = `SELECT d.*,c.goodLargeImg,c.goodsName FROM (SELECT a.*,b.goodsId,b.goodsPrice,b.spec,b.goodsNum FROM orders a LEFT JOIN order_goods b ON a.orderId=b.orderId LIMIT 1) d LEFT JOIN goods c ON c.goodsId=d.goodsId WHERE d.userId =?`;
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
    },
    orderLast(userId,fn){
        let sql = 'SELECT * FROM orders WHERE userId=? ORDER BY  orderId DESC LIMIT 1 ';
        sqlPool(sql,[userId],fn);
    },
    orderGoodsAdd(arr,fn){
        let sql = 'insert into order_goods(orderId,goodsId,goodsNum,goodsPrice,spec) values ?' ;
            /* 
            *id ,订单id,商品id,商品数量,商品单价,商品规格
            */
        sqlPool(sql,arr,fn);
    },
    orderGoodsLast(userId,fn){
        let sql = 'SELECT a.*,b.goodsName,b.goodLargeImg,c.totalMoney,c.realTotalMoney,c.orderRemarks,c.iscancel FROM order_goods a LEFT JOIN goods b  ON a.goodsId = b.goodsId LEFT JOIN orders c ON a.orderId=c.orderId WHERE a.orderId = (SELECT d.orderId FROM orders d WHERE d.userId = ? ORDER BY d.orderId DESC LIMIT 1)';
        sqlPool(sql,[userId],fn)
    },
    orderModify(arr,fn){
        console.log(arr)
        let sql =  'update orders set orderRemarks=?, orderAddress=? where orderId=? ';
        if(arr.length==4){
            sql = 'update orders set isPay=?, iscancel=? where orderId=?';
        }
        sqlPool(sql,arr,fn)
    }
}