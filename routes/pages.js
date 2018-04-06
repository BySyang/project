var express = require('express');
var router = express.Router();
var goodsControll = require('../controller/goodsControll');

router.get('/*.html', function (req, res, next) {
    let path = req.url.substr(1).split('.html')[0];
        if(path=== 'login'){
            res.render('parts/login');
        }else if(path === 'Product_series'||path==='Product_details'||path === 'shopping'){
            next();
        }else{
            res.render(path);
        }
});
router.get('/Product_series.html',goodsControll.goodsList);
router.get('/Product_details.html',goodsControll.goodsOne);
module.exports = router;