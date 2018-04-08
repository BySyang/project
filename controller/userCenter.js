const userAddrModal = require('../modal/userAddrModal');
const userModal = require('../modal/userModal');
const orderModal = require('../modal/orderModal');
module.exports = {
    userCenterInit(req, res) {
        if (req.session.userInfo) {
            console.log(req.session.userInfo)
            var userInfo = req.session.userInfo;
            let obj = {};
            obj.userInfo = userInfo;
            new Promise(function (resolve, reject) {
                orderModal.orderList(userInfo.userId, function (err, orders) {
                    if (!err) {
                        obj.orders = orders;
                        resolve(obj)
                    } else {
                        reject(err);
                    }
                })
            }).then(function (obj) {
                return new Promise(function (resolve, reject) {
                    userAddrModal.userAddr(obj.userInfo.userId, function (err, data) {
                        if (!err) {
                            obj.userAddr = data;
                            res.render('personal-center', obj);
                            resolve('ok');
                        } else {
                            reject(err);
                        }
                    })
                })

            }).catch(function (err) {
               if(err) console.log(err)
            })
        } else {
            res.send('请先登录<a href="index.html">返回首页</a>');
        }


    }
}