var express = require('express');
var router = express.Router();


router.get('/*.html', function (req, res, next) {
    let path= req.url.substr(1).replace(/\.html/, '');
        res.render(path)
});


module.exports = router;