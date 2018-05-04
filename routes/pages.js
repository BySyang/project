var express = require('express');
var router = express.Router();
var goodsControll = require('../controller/goodsControll');
var catControll = require('../controller/catControll');
var userCenter = require('../controller/userCenter');
var shoporderControll = require('../controller/shoporderControll')
router.get('/', function (req, res) {
    res.render('index');
})
router.get('/*.html', function (req, res, next) {
    let path = req.url.substr(1).split('.html')[0];
    if (path === 'login') {
        res.render('parts/login');
    } else if (path === 'Product_series' || path === 'Product_details' || path === 'shopping' || path === 'personal-center' || path ==='shoporder'||path==='pay') {
        next();
    } else {
        res.render(path);
    }
});
router.get('/Product_series.html', goodsControll.goodsList);   //商品系列页
router.get('/Product_details.html', goodsControll.goodsOne); //商品详情页
router.get('/goodscore',goodsControll.goodscore);   //商品评论
router.get('/goodspecs',goodsControll.goodspecs);  //商品规格
router.get('/shopping.html', catControll.catList);          //购物车
router.get('/personal-center.html',userCenter.userCenterInit)   //个人中心
router.get('/shoporder.html', shoporderControll.orderList)   //订单详情
router.get('/pay.html', shoporderControll.payPage);
module.exports = router;