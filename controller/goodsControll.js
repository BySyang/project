const goodsModal = require('../modal/goodsModal');
module.exports = {
    goodsList(req, res) {
        goodsModal.goodsList(function (err, data) {
            if (!err) {
                res.render('Product_series', {data})
            } else {
                console.log(err)
            }
        })
    },
    goodsOne(req, res) {
        let goodsId = req.query.id;
        goodsModal.goodsOne(goodsId,function(err,data){
           if(!err){
            res.render('parts/Product_details',{data:data[0]})
           }else{
               console.log(err)
           }
        })
    }
}