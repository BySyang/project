const  orderModal = require('../modal/orderModal');
module.exports = {
    orderList(req,res){
        let userId = req.session.userInfo.userId;
        console.log(req.session.userInfo)
        orderModal.orderList(userId,function(err,data){
            res.send(data);
        })
    },
}
