const orderModal = require('../modal/orderModal');
module.exports = {
    orderList(req, res) {
        if (req.session.userInfo) {
            let userInfo = req.session.userInfo;
            let userId = userInfo.userId;
            orderModal.orderGoodsLast(userId, function (err, data) {
                res.render('parts/shoporder', {
                    orderInfo: data[0],
                    userInfo
                });
            });
        } else {
            res.send('请先登录<a href="index.html">点击返回首页</a>');
        }

    },
    payPage(req, res) {
        if (req.session.userInfo) {
            let userInfo = req.session.userInfo;
            let userId = userInfo.userId;
            orderModal.orderLast(userId, function (err, data) {
                res.render('parts/pay', {
                    orderInfo: data[0],
                    userInfo
                });
            });
        } else {
            res.send('请先登录<a href="index.html">点击返回首页</a>');
        }

    }

}