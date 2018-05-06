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
            let allMoney = 0;
            let goodsInfo = datachuli(req.body);
            goodsInfo.forEach(function (item) {
                allMoney += item.price * item.num;
            })
            let userId = req.session.userInfo.userId;
            let discount = getDis(req.session.userInfo.userLevel);
            //订单编号
            let orderunique = 'CH' + sd.format(new Date(), 'YYYYMMDDHHmmss');
            //物流号
            let courier = Math.floor(Math.random() * 666666);
            //id,订单号,总金额,总金额加运费,总金额打折后,物流号
            arr.push(userId, orderunique, allMoney, (allMoney + 11), (allMoney * discount + 11), courier);

            orderModal.orderAdd(arr, (err, data) => {
                if (!err) {
                    console.log(1111)
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
                            goodsInfo.forEach((item, i) => {
                                console.log(item)
                                param[i] ? 1 : param[i] = [];
                                param[i].push(orderId, item.goodsId, item.num, item.price, item.spec);
                            })
                            console.log(param)
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
    orderModify(req, res) {
        if (req.session.userInfo) {
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
        } else {
            res.send('登录超时!请重新登录!');
        }
    }
}
//折扣计算
function getDis(level) {
    return 1 - level * 5 / 100
}

function datachuli(data) {
    let index, newKey, newData = [];
    for (let [key, val] of Object.entries(data)) {
        index = key.substr(-1);
        newKey = key.slice(0, key.length - 1);
        newData[index] ? 1 : newData[index] = {};
        newData[index][newKey] = val;
    }
    return newData
}