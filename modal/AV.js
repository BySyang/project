const AV = require('leanengine');

AV.init({
    appId: '1pDX5iHJuBy3hRizQw3rRAzk-gzGzoHsz',
    appKey: 'vCNSnDNh2TiX0H8xf8HPY9KP',
    masterKey: 'DkLJl32eEOVUhV8IMTV6Yuyx'

})

AV.Cloud.useMasterKey();

module.exports = {
    //发送短信：
    sendMsg: function (req,res) {
        let phone = req.body.phone;
        //3. 配置请求服务，调用AV.Cloud.requestSmsCode()
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: phone,
            name: "项目测试", //进行的服务类型
            op: "美邦", //进行什么操作
            ttl: 10 //验证码过期时间，单位分钟
        }).then(function (data) {
            // console.log(data)
            res.send("success")
        }, function (err) {
            //console.log(err);
            res.send("fail")
        });
    },
    // 验证短信：
    verifyCode: function (req,res) {
        let smscode = req.body.smscode;
        let phone = req.body.phone;
        console.log(smscode,phone)
        AV.Cloud.verifySmsCode(smscode, phone).then(function (data) {

            res.send("success");
        }, function (err) {

            res.send("fail");
        });
    }
};
