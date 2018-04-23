//
const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');

//登录
router.post('/adminLog',admin.adminLog);
//判断是否登录
router.post('/adminIsLog',admin.adminIsLog);
//退出
router.post('/adminExit',admin.adminExit);


















module.exports = router;