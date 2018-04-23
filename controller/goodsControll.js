const goodsModal = require('../modal/goodsModal');
module.exports = {

    goodsList(req, res) {
        let typeId = req.query.seriesId;
        let obj = {};
        new Promise(function (resolve, reject) {
            goodsModal.goodsType(typeId, function (err, types) {
                if (!err) {
                    obj.goodsType = types[0];
                    resolve('ok')
                } else {
                    reject(err);
                }
            })

        }).then(function () {
            return new Promise(function (resolve,reject) {
                goodsModal.goodsList(typeId, function (err, goodsList) {
                    if (!err) {
                        obj.goodsList = goodsList;
                        res.render('parts/Product_series', {
                            data: obj
                        });
                        resolve('ok');
                    } else {
                        reject(err);
                    }
                })
            })
        }).catch(function(err){
            console.log(err);
        })
    },
    goodsOne(req, res) {
        let goodsId = req.query.id;
        goodsModal.goodsOne(goodsId, function (err, data) {
            if (!err) {
                if (data[0]) {
                    res.render('parts/Product_details', {
                        data: data[0]
                    });
                } else {
                    var error = new Error('没有此商品');
                    error.message = '没有此商品';
                    res.status(404);
                    res.locals.message = error.message;
                    res.render('error', {
                        error
                    });
                }
            } else {
                console.log(err)
            }
        })
    },
    goodscore(req,res){
        let goodsId = req.query.id;
        goodsModal.goodscore(goodsId,function(err,data){
            if(!err){
                res.send(data)
            }else{
                console.log(err)
            }
        })
    },
    goodspecs(req,res){
        let goodsId = req.query.id;
        goodsModal.goodspecs(goodsId,function(err,data){
            if(!err){
                res.send(data)
            }else{
                console.log(err)
            }
        })
    }
}