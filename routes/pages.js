var express = require('express');
var router = express.Router();
var goodsControll = require('../controller/goodsControll');
var catControll = require('../controller/catControll');
var userCenter = require('../controller/userCenter');
router.get('/', function (req, res) {
    res.render('index');
})
router.get('/*.html', function (req, res, next) {
    let path = req.url.substr(1).split('.html')[0];
    if (path === 'login') {
        res.render('parts/login');
    } else if (path === 'Product_series' || path === 'Product_details' || path === 'shopping' || path === 'personal-center') {
        next();
    } else {
        res.render(path);
    }
});
router.get('/Product_series.html', goodsControll.goodsList);   //商品系列页
router.get('/Product_details.html', goodsControll.goodsOne); //商品详情页
router.get('/goodscore',goodsControll.goodscore);
router.get('/goodspecs',goodsControll.goodspecs);
router.get('/shopping.html', catControll.catList);          //购物车
router.get('/personal-center.html',userCenter.userCenterInit)   //个人中心
module.exports = router;