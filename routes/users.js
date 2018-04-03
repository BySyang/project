var express = require('express');
var router = express.Router();
var userControll = require('../controller/userControl');
router.post('/login',userControll.userLogin); //登录

router.post('/exit',userControll.userExit); //退出登录

router.post('/userInfo',userControll.userInfo); //个人中心展示

router.post('userAddress',userControll.addr)
module.exports = router;
