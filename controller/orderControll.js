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
            let userId = req.session.userInfo.userId;
            let goodsId = req.body.goodsId;
            let price = req.body.price.trim(); //单价
            let num = req.body.num; //数量
            let goodSpec = req.body.goodSpec; //规格
            let discount = getDis(req.session.userInfo.userLevel);
            let orderunique = 'CH' + sd.format(new Date(), 'YYYYMMDDHHmmss');
            let courier = Math.floor(Math.random() * 666666); //物流号
            let goodsMoney = price * num; //商品总金额
            arr.push(userId);
            arr.push(orderunique);
            arr.push(goodsMoney); //总金额
            arr.push(goodsMoney + 11); //加运费
            arr.push(goodsMoney * discount+11) //乘打折
            arr.push(courier) //物流号
            orderModal.orderAdd(arr, (err, data) => {
                if (!err) {
                    new Promise((resolve, reject) => {
                        orderModal.orderLast(userId, (err, data) => {
                            if (!err) {
                                resolve(data[0].orderId);
                            } else {
                                reject(err);
                            }
                        })
                    }).then((orderId) => {
                        return new Promise((resolve, reject) => {
                            let param = [];
                            console.log(orderId)
                            param.push(orderId, goodsId, num, price, goodSpec);
                            orderModal.orderGoodsAdd(param, (err, data) => {
                                if (!err) {
                                    res.send('ok')
                                } else {
                                    reject(err);
                                }
                            })
                        })
                    }).catch(err => {
                        console.log(err);
                        res.send('服务器出错,请联系管理员!');
                    })
                } else {
                    console.log(err)
                    res.send('服务器出错,请联系管理员!');
                }

            });
        } else {
            res.send('请先登录!');
        }

    },
    //修改订单
    orderModify(req,res){
        if(req.session.userInfo){
            let orderId = req.body.orderId;
            let remarks = req.body.Remarks;
            let address = req.body.address;
            let isPay = req.body.isPay;
            let param = [remarks, address, orderId];
            if (isPay) {
                param = [orderId, isPay];
            }
            orderModal.orderModify(param, (err, data) => {
                if (!err) {
                    res.send('ok')
                } else {
                    console.log(err);
                    res.send('服务器出错.请联系管理员!')
                }
            })
        }else{
            res.send('登录超时!请重新登录!');
        }
    }
}
//折扣计算
function getDis(level) {
    return 1 - level * 5 / 100
}