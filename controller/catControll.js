const catModal = require('../modal/catModal');
module.exports = {
    catList(req, res) {
        if (req.session.userInfo) {
            let userId = req.session.userInfo.userId;
            catModal.catList(userId, function (err, data) {
                res.render('parts/shopping', {data});
            });
        }else{
            res.send('请先登录<a href="index.html">点击返回首页</a>');
        }

    }
}