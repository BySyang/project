var express = require('express');
var router = express.Router();


router.get('/*.html', function (req, res, next) {
    let path= req.url.substr(1).replace(/\.html/, '');
        if(path=== 'login'){
            res.render('parts/login');
        }else{
            res.render(path);
        }
});


module.exports = router;