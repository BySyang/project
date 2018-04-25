//
const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');
const sqlPool = require('../modal/sqlPool');
const responseData = {
  code: 1,
  message: 'success',
  data: []
}
//登录
router.post('/adminLog', admin.adminLog);
//判断是否登录
router.post('/adminIsLog', admin.adminIsLog);
//退出
router.post('/adminExit', admin.adminExit);


//获取用户信息
router.get('/userInfo', (req, res) => {
  let sql = 'select * from users where userId=?';
  let userId = req.query.userId;
  sqlPool(sql, [userId], (err, data) => {
    handleData(res, err, data)
  })
})
//获取评论列表
router.get('/goodScoreList', (req, res) => {
  let sql = 'select * from goods_scores';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
})
//获取商品分类列表
router.get('/goodsTypeList', (req, res) => {
  let sql = 'select * from goods_types';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
})
//获取商品列表
router.get('/goodsList', (req, res) => {
  let sql = 'select * from goods';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
});
//修改商品
router.post('/goodsModify', (req, res) => {
  let sql = 'update goods set ';
  let arr = [];
  let goodsId = req.body.goodsId || ''; //商品ID
  let typeId = req.body.typeId || ''; //商品类型Id
  let goodsName = req.body.goodsName || ''; //商品名
  let goodsDesc = req.body.goodsDesc || ''; //商品描述
  let goodStock = req.body.goodStock || ''; //商品库存
  let isSale = req.body.isSale || ''; //是否显示
  let isHot = req.body.isHot || ''; //是否热销
  let isNew = req.body.isNew || ''; //是否新品
  if (typeId != '') {
    sql += ' typeId=? ';
    arr.push(typeId);
  }
  if (goodsName != '') {
    sql += ' goodsName=? ';
    arr.push(goodsName);
  }
  if (goodsDesc != '') {
    sql += ' goodsDesc=? ';
    arr.push(goodsDesc);
  }
  if (goodStock != '') {
    sql += ' goodStock=? ';
    arr.push(goodStock);
  }
  if (isSale != '') {
    sql += ' isSale=? ';
    arr.push(isSale);
  }
  if (isHot != '') {
    sql += ' isHot=? ';
    arr.push(isHot);
  }
  if (isNew != '') {
    sql += ' isNew=? ';
    arr.push(isNew);
  }
  sql += ' where  goodsId=? ';
  arr.push(goodsId);
  sqlPool(sql, arr, (err, data) => {
    handleData(res, err, data)
  })
})

//删除商品
router.post('/goodsDel', (req, res) => {
  let sql = 'delete from goods where  goodsId =?';
  let goodsId = req.body.goodsId;
  sqlPool(sql, [goodsId], (err, data) => {
    handleData(res, err, data)
  })
})

//获取订单列表
router.get('/ordersList', (req, res) => {
  let sql = 'select * from orders';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
})
//获取订单商品
router.get('/orderGoods', (req, res) => {
  let sql = 'select * from order_goods where orderId =? ';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
})
//修改订单列表
router.post('/orderModify', (req, res) => {
  let sql = 'update orders set ';
  let arr = [];
  let orderStatus = req.body.orderStatus || ''; //订单状态
  let adminRemarks = req.body.adminRemarks || ''; //订单管理员备注
  let orderAddress = req.body.orderAddress || ''; //订单地址
  let orderId = req.body.orderId || ''; //订单ID
  if (orderStatus != '') {
    sql += ' orderStatus=? ';
    arr.push(orderStatus);
  }
  if (adminRemarks != '') {
    sql += ' adminRemarks=?';
    arr.push(adminRemarks);
  }
  if (orderAddress != '') {
    sql += ' orderAddress=?';
    arr.push(orderAddress);
  }
  sql += ' where orderId=?';
  arr.push(orderId);
  sqlPool(sql, arr, (err, data) => {
    handleData(res, err, data)
  })
})












//数据处理
function handleData(res, err, data) {
  if (!err) {
    if (data[0]) {
      responseData.code = 1;
      responseData.message = 'success';
      responseData.data = data;
      res.json(responseData);
    } else {
      responseData.code = 2;
      responseData.message = 'null';
      responseData.data = '';
      res.json(responseData);
    }
  } else {
    responseData.code = -1;
    responseData.message = 'error';
    responseData.data = '';
    res.json(responseData)
    console.log(err)
  }
}















module.exports = router;