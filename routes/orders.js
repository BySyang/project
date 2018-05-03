const express = require('express');
const router = express.Router();
const orderControll = require('../controller/orderControll');
const catControll = require('../controller/catControll');


router.post('/orderList',orderControll.orderList);
router.post('/catList',catControll.catList);
router.post('/orderAdd', orderControll.orderAdd)
module.exports = router;