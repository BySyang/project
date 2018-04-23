const userModal = require('../modal/userModal');
const userAddr = require('../modal/userAddrModal');
const leanengine = require('leanengine');

module.exports = {
    userLogin(req, res) {
        let user = req.body.username;
        let pwd = req.body.password;
        userModal.userLogin(user, pwd, function (err, data) {
            if (!err) {
                if (data[0]) {
                    req.session.userInfo = data[0];
                    res.send('ok');
                } else {
                    res.send('fail');
                }
            } else {
                console.log(err);
            }
        })
    },
    register(req, res) {
        userModal.register(req.body.username, req.body.password, function (err, data) {
            if (!err) {
                if (data) {
                    res.send('ok');
                } else {
                    res.send('fail');
                }
            } else {
                console.log(err);
            }
        })
    },
    resetPwd(req, res) {
        userModal.resetPwd(req.body.username, req.body.password, function (err, data) {
            if (!err) {
                if (data) {
                    res.send('ok');
                } else {
                    res.send('fail');
                }
            } else {
                console.log(err);
            }
        })
    },
    isLogin(req, res) {
        res.send(req.session.userInfo ? 'true' : 'false');
    },
    userExit(req, res) {
        req.session.destroy();
        res.send('ok');
    },
    userInfo(req, res) {
        let userInfo = JSON.stringify(req.session.userInfo);
        res.send(userInfo);
    },
    addr(req, res) {
        userAddr.userAddr(req.session.userInfo.userId, function (err, data) {
            if (!err) {
                if (data[0]) res.send(data);
            } else {
                console.log(err);
            }
        })
    },
    userOneInfo(req,res){
        userModal.userOneInfo(req.body.id,function(err,data){
            if(!err){
                res.send(data)
            }else{
                console.log(err)
            }
        })
    }
    
}