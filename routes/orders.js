const express = require('express');
const router = express.Router();
const orderControll = require('../controller/orderControll');
const catControll = require('../controller/catControll');


router.post('/orderList', orderControll.orderList);
router.post('/catList', catControll.catList);
router.post('/orderAdd', orderControll.orderAdd)
router.post('/orderModifyweb', orderControll.orderModify);
router.post('/catAdd', catControll.catAdd);
router.post('/catCancel', catControll.catCancel);
module.exports = router;