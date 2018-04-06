const express = require('express');
const router = express.Router();
const userControll = require('../controller/userControll');
const AV = require('../modal/AV');
router.post('/isLogin',userControll.isLogin);
router.post('/login',userControll.userLogin); //登录

router.post('/resetPwd',userControll.resetPwd);
router.post('/exit',userControll.userExit); //退出登录
router.post('/register',userControll.register)

router.post('/userInfo',userControll.userInfo); //个人中心展示

router.post('/userAddress',userControll.addr);

router.post('/getIdent',AV.sendMsg);

router.post('/verifyCode',AV.verifyCode);


module.exports = router;
