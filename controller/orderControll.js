const  orderModal = require('../modal/orderModal');
module.exports = {
    orderList(req,res){
        let userId = req.session.userInfo.userId;
        orderModal.orderList(userId,function(err,data){
            res.send(data);
        })
    },
}
