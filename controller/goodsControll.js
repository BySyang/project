const goodsModal = require('../modal/goodsModal');
module.exports = {
    goodsType(req,res){
       
    },
    goodsList(req, res) {
        let typeId = req.query.seriesId;
        goodsModal.goodsList(typeId,function (err, data) {
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
               if(data[0])  {
                res.render('parts/Product_details',{data:data[0]});
               }else{
                var error = new Error('没有此商品');
                error.message = '没有此商品';
                res.status(404);
                res.locals.message = error.message;
                res.render('error',{error});
               }
               
           
           }else{
               console.log(err)
           }
        })
    }
}