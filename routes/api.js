//
const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');
const sqlPool = require('../modal/sqlPool');
const fs = require('fs');
const sd = require("silly-datetime");
const path = require('path');
const formidable = require('formidable');
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
  let sql = 'select * from users';
  let userId = req.query.userId;
  let arr = [];
  if (userId) {
    sql += ' where userId =?';
    arr.push(userId);
  }
  sqlPool(sql, arr, (err, data) => {
    handleData(res, err, data)
  })
})
//获取评论列表
router.get('/goodScoreList', (req, res) => {
  let username = req.query.username;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate + " 23:59:59";
  let sql = 'SELECT uss.username, gsc.userId, gsc.scoreText, gsc.createTime,gsc.orderScore,gsc.isShow ' +
    ' from goods_scores gsc ' +
    ' LEFT JOIN users uss ON uss.userId = gsc.userId where 1=1 ';
  let param = [];
  if (username != null && username != "") {
    username = "%" + username + "%";
    sql = sql + " and uss.username like ?";
    param.push(username);
  }
  if (startDate != null && startDate != "") {
    sql = sql + " and gsc.createTime >= ? and gsc.createTime <= ?";
    param.push(startDate);
    param.push(endDate);
  }
  sqlPool(sql, param, (err, data) => {
    handleData(res, err, data)
  })
})

//获取商品分类列表
router.get('/goodsTypeList', (req, res) => {
  let sql = 'select * from goods_types';
  let typeId = req.query.typeId;
  let arr = [];
  if (typeId) {
    sql += ' where typeId=?';
    arr.push(typeId)
  }
  sqlPool(sql, arr, (err, data) => {
    handleData(res, err, data)
  })
})
//获取商品列表
router.get('/goodsList', (req, res) => {
  let sql = 'SELECT a.*,b.typeName FROM goods a LEFT JOIN goods_types b ON a.typeId=b.typeId ';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
});
//修改商品
router.post('/goodsModify', (req, res) => {
  let sql = 'update goods set';
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
    sql += ' typeId=?,';
    arr.push(typeId);
  }
  if (goodsName != '') {
    sql += ' goodsName=?,';
    arr.push(goodsName);
  }
  if (goodsDesc != '') {
    sql += ' goodsDesc=?,';
    arr.push(goodsDesc);
  }
  if (goodStock != '') {
    sql += ' goodStock=?,';
    arr.push(goodStock);
  }
  if (isSale != '') {
    sql += ' isSale=?,';
    arr.push(isSale);
  }
  if (isHot != '') {
    sql += ' isHot=?,';
    arr.push(isHot);
  }
  if (isNew != '') {
    sql += ' isNew=?,';
    arr.push(isNew);
  }
  sql += ' where  goodsId=? ';
  arr.push(goodsId);
  sql = sql.replace(/,\s*where/g, ' where');
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
  let sql = 'select a.*,b.payName from orders a, pays b where a.orderPayMethod=b.id ';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
})
//获取订单商品
router.get('/orderGoods', (req, res) => {
  let sql = 'SELECT * FROM goods a LEFT JOIN order_goods b ON a.goodsId=b.goodsId WHERE orderId =?';
  let orderId = req.query.orderId;
  sqlPool(sql, orderId, (err, data) => {
    handleData(res, err, data)
  })
})
//修改订单列表
router.post('/orderModify', (req, res) => {
  let sql = 'update orders set ';
  let arr = [];
  let orderStatus = parseInt(req.body.orderStatus) || ''; //订单状态
  let adminRemarks = req.body.adminRemarks || ''; //订单管理员备注
  let orderAddress = req.body.orderAddress || ''; //订单地址
  let orderId = parseInt(req.body.orderId) || ''; //订单ID
  if (orderStatus != '') {
    sql += ' orderStatus=?, ';
    arr.push(orderStatus);
  }
  if (adminRemarks != '') {
    sql += ' adminRemarks=?,';
    arr.push(adminRemarks);
  }
  if (orderAddress != '') {
    sql += ' orderAddress=?,';
    arr.push(orderAddress);
  }
  sql += ' where orderId=?';
  arr.push(orderId);
  sql = sql.replace(/,\s*where/g, ' where');
  sqlPool(sql, arr, (err, data) => {
    handleData(res, err, data)
  })
})
//获取支付方式
router.get('/pays', (req, res) => {
  let sql = 'select * from pays';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
})





//添加商品分类
router.post('/addGoodsType', (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./tmp";
  form.parse(req, function (err, fields, files) {
    if (!err) {
      var LargeImgSrc = '';
      var smallImgSrc = [];
      new Promise((a, b) => {
        for (var key of Object.keys(files)) {
          var file = files[key];
          //使用第三方模块silly-datetime
          var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
          //生成随机数
          var ran = parseInt(Math.random() * 8999 + 10000);
          //拿到扩展名
          var extname = path.extname(file.name);
          //旧的路径
          var oldpath = file.path;
          //新的路径
          var newpath = 'static/images/series/uploads/' + t + ran + extname;
          if (key == 'typeBannerImg') LargeImgSrc = 'uploads/' + t + ran + extname;;
          if (key.startsWith('typeImg')) smallImgSrc.push(t + ran + extname);
          //改名
          fs.renameSync(oldpath, newpath);
        }
        a('ok');
      }).then(() => {
        let arr = [];
        fields.typeBannerImg = LargeImgSrc;
        fields.typeImg = 'uploads/?' + smallImgSrc.join('|');
        arr.push(fields.typeName);
        arr.push(fields.typeDes);
        arr.push(fields.typeImg);
        arr.push(fields.typeBannerImg);
        let sql = `insert into goods_types values(null,?,1,default,?,?,?)`;
        sqlPool(sql, arr, (err, data) => {
          handleData(res, err, data)
        })
      }).catch(err => {
        console.log(err);
        res.writeHead(404, {
          'content-type': 'text/plain'
        });
        res.end("失败");
      })

    }
  })
})
//添加商品
router.post('/addGoods', (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./tmp";
  form.parse(req, function (err, fields, files) {
    if (!err) {
      var flag = true;
      var LargeImgSrc = '';
      var smallImgSrc = [];
      new Promise((a, b) => {
        for (var key of Object.keys(files)) {
          var file = files[key];
          //使用第三方模块silly-datetime
          var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
          //生成随机数
          var ran = parseInt(Math.random() * 8999 + 10000);
          //拿到扩展名
          var extname = path.extname(file.name);
          //旧的路径
          var oldpath = file.path;
          //新的路径
          var newpath = 'static/images/series/uploads/' + t + ran + extname;
          if (key == 'goodLargeImg') LargeImgSrc = 'uploads/' + t + ran + extname;;
          if (key.startsWith('goodsImg')) smallImgSrc.push(t + ran + extname);
          //改名
          fs.renameSync(oldpath, newpath);
        }
        a('ok');
      }).then(() => {
        let arr = [];
        fields.goodLargeImg = LargeImgSrc;
        fields.goodsImg = 'uploads/?' + smallImgSrc.join('|');
        arr.push(parseInt(fields.goodsType));
        arr.push(fields.goodsName);
        arr.push(fields.goodsImg);
        arr.push(fields.goodsDesc);
        arr.push(parseInt(fields.goodStock));
        arr.push(parseFloat(fields.goodSvg));
        arr.push(fields.goodLargeImg);
        let sql = `insert into goods values(null,? ,? ,? ,? ,? ,?,30,0,5,1,1,1,default,?)`
        //数据库字段  null,typeId,goodsName,,goodsImg,goodsDesc,goodStock,goodSvg,warnStock,saleNum,goodscore,isSale,isHot,isNew,createTime,goodLargeImg
        sqlPool(sql,arr, (err, data) => {
          handleData(res, err, data)
        })
      }).catch(err => {
        console.log(err);
        res.writeHead(404, {
          'content-type': 'text/plain'
        });
        res.end("失败");
      })

    }
  })
})
//删数据
router.post('/delete',(req,res)=>{
  let  tableName  = req.body.tableName;
  for (let [key, val] of Object.entries(req.body)){
    
  }
  let tableKey = req.body;
  let tableVal = re
  let sql='delete from ';

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