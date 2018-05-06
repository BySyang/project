const catModal = require('../modal/catModal');
module.exports = {
    catList(req, res) {
        if (req.session.userInfo) {
            let userId = req.session.userInfo.userId;
            catModal.catList(userId, function (err, data) {
                res.render('parts/shopping', {
                    data
                });
            });
        } else {
            res.send('请先登录<a href="index.html">点击返回首页</a>');
        }

    },
    catAdd(req, res) {
        if (req.session.userInfo) {
            let goodsId = req.body.goodsId;
            let userId = req.session.userInfo.userId;
            let catNum = req.body.catNum;
            let price = req.body.price;
            let spec = req.body.spec;
            let param = [userId, goodsId, price,catNum,spec];
            catModal.catAdd(param,(err,data)=>{
                if(!err){
                    res.send('ok');
                }else{
                    console.log(err)
                    res.send('服务器错误,请联系管理员!');
                }
            })
        }else{
            res.send('请先登录!')
        }
    },
    //
    catCancel(req,res){
        console.log(req.body)
        catModal.catCancel([...Object.values(req.body)],(err)=>{
            if(!err){
                res.send('ok');
            }else{
                console.log(err);
                res.send('服务器错误,请联系管理员!')
            }
        })
    }
}