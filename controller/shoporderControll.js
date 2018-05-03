const orderModal = require('../modal/orderModal');
module.exports = {
    orderList(req, res) {
        if (req.session.userInfo) {
            let userId = req.session.userInfo.userId;
            orderModal.orderList(userId, function (err, data) {
                res.render('parts/shoporder', {
                    data
                });
            });
        } else {
            res.send('请先登录<a href="index.html">点击返回首页</a>');
        }

    },
  
}