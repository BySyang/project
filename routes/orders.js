const express = require('express');
const router = express.Router();
const orderControll = require('../controller/orderControll');


router.post('/orderList',orderControll.orderList);

module.exports = router;