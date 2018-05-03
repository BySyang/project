const orderModal = require('../modal/orderModal');
const sd = require("silly-datetime");
module.exports = {
    orderList(req, res) {
        let userId = req.session.userInfo.userId;
        orderModal.orderList(userId, function (err, data) {
            res.send(data);
        })
    },
    //添加订单
    orderAdd(req, res) {
        if (req.session.userInfo) {
            let arr = [];
            let goodsId = req.body.goodsId;
            let userId = req.session.userInfo.userId;
            let orderunique = 'CH' + sd.format(new Date(), 'YYYYMMDDHHmmss');
            let courier = Math.floor(Math.random() * 794156); //物流号
            let goodsMoney = req.body.goodsMoney; //商品总金额
            let goodSpec = req.body.goodSpec;
            arr.push(userId);
            arr.push(orderunique);
            arr.push(goodsMoney); //总金额
            arr.push(goodsMoney + 11); //加运费
            arr.push((goodsMoney + 11) * 0.95) //乘打折
            arr.push(courier) //物流号
            orderModal.orderAdd(arr, function (err, data) {
                if (!err) {
                    res.send('ok')
                } else {
                    console.log(err)
                    res.send('fail');
                }

            });
        } else {
            res.send('登录超时');
        }

    }
}