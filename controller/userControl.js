const userModal = require('../modal/userModal');
const userAddr = require('../modal/userAddrModal');
module.exports = {
    userLogin(req, res) {
        let user = req.body.username;
        let pwd = req.body.password;
        userModal.userLogin(user, pwd, function (err, data) {
            if (!err) {
                if (data[0]) {
                    res.session.userInfo = data[0];
                    res.send('ok');
                } else {
                    res.send('fail');
                }
            } else {
                console.log(err);
            }
        })
    },
    userExit(req, res) {
        req.session.destroy();
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
    }
}