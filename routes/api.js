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
  let sql = 'select a.*,b.score from users a left join user_scores b on a.userId=b.userId ';
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
router.post('/userModify', (req, res) => {
  let sql = 'update users set logName=?,logPwd=?,userPhone=?,userEmail=? where userId=?';
  var arr = [];
  arr.push(req.body.logName || ''); //登录名
  arr.push(req.body.logPwd || ''); //登录密码
  arr.push(req.body.userPhone || ''); //手机号
  arr.push(req.body.userEmail || ''); //邮箱
  arr.push(req.body.userId); //用户id
  sqlPool(sql, arr, (err, data) => {
    handleData(res, err, data)
  })

})
//获取评论列表
router.get('/goodScoreList', (req, res) => {
  let sql = 'SELECT uss.username, gsc.userId, gsc.scoreText, gsc.createTime, ' +
    'gsc.orderScore, gsc.isShow, gsc.scoreId, gsc.reply, goo.goodsName ' +
    'FROM goods_scores gsc ' +
    'LEFT JOIN users uss ON uss.userId = gsc.userId ' +
    'LEFT JOIN goods goo ON goo.goodsId = gsc.goodsId ';
  sqlPool(sql, (err, data) => {
    handleData(res, err, data)
  })
})
//修改是否显示
router.post('/updateGoodScoreIsShow', (req, res) => {
  let scoreId = req.body.scoreId;
  let isShow = req.body.isShow;
  let sql = 'UPDATE goods_scores SET isShow = ? WHERE scoreId = ? ';
  var arr = [isShow, scoreId];
  // console.log("scoreId:"+scoreId+",isShow:"+isShow);
  sqlPool(sql, arr, (err, data) => {
    handleData(res, err, data)
  })
})
// 修改回复
router.post('/updateGoodScoreReplyInfo', (req, res) => {
  let scoreId = req.body.scoreId;
  let value = req.body.value;
  let sql = 'UPDATE goods_scores SET reply = ? WHERE scoreId = ?';
  var arr = [value, scoreId];
  // console.log("scoreId:"+scoreId+",isShow:"+isShow);
  sqlPool(sql, arr, (err, data) => {
    handleData(res, err, data)
  })
})


//获取商品系列表
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
//修改商品系列
router.post('/typeModify', (req, res) => {
  let sql = 'update goods_types set';
  let typeName = req.body.typeName || '';
  let typeDes = req.body.typeDes || '';
  let idShow = req.body.idShow || '';
  let typeId = req.body.typeId || '';
  let arr = [];
  if (typeName != '') {
    sql += ' typeName=?,';
    arr.push(typeName);
  }
  if (typeDes != '') {
    sql += ' typeDes=?,';
    arr.push(typeDes);
  }
  if (idShow != '') {
    sql += ' idShow=?,';
    arr.push(idShow);
  }
  sql += ' where  typeId=? ';
  arr.push(typeId);
  sql = sql.replace(/,\s*where/g, ' where');
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
  let goodsId = parseInt(req.body.goodsId) || ''; //商品ID
  let typeId = parseInt(req.body.typeId) || ''; //商品类型Id
  let goodsName = req.body.goodsName || ''; //商品名
  let goodsDesc = req.body.goodsDesc || ''; //商品描述
  let goodStock = parseInt(req.body.goodStock) || ''; //商品库存
  let goodSvg = parseFloat(req.body.goodSvg) || ''; //商品价格
  let goodscore = parseInt(req.body.goodscore) || ''; //商品评分
  let isSale = req.body.isSale || ''; //是否显示
  let isHot = parseInt(req.body.isHot) || ''; //是否热销
  let isNew = parseInt(req.body.isNew) || ''; //是否新品
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
  if (goodSvg != '') {
    sql += ' goodSvg=?,';
    arr.push(goodSvg);
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


//获取订单列表
router.get('/ordersList', (req, res) => {
  let sql = 'SELECT a.*,b.payName,c.userName FROM orders a, pays b ,users c WHERE a.orderPayMethod=b.id AND a.userId=c.userId';
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
  let orderId = req.body.orderId || ''; //订单ID
  let Courier = req.body.Courier || ''; //快递单号
  let selectCourier = req.body.selectCourier || ''; //快递方式
  let refundState = req.body.refundState || ''; //退款状态
  let refundInfo = req.body.refundInfo || ''; //退款状态
  if (orderStatus != '') {
    sql += ' orderStatus=?, ';
    arr.push(orderStatus);
  }
  if (Courier != '') {
    sql += ' Courier=?, ';
    arr.push(Courier);
  }
  if (selectCourier != '') {
    sql += ' selectCourier=?, ';
    arr.push(selectCourier);
  }
  if (adminRemarks != '') {
    sql += ' adminRemarks=?,';
    arr.push(adminRemarks);
  }
  if (refundState != '') {
    sql += ' refundState=?,';
    arr.push(refundState);
  }
  if (refundInfo != '') {
    sql += ' refundInfo=?,';
    arr.push(refundInfo);
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
//修改图片
router.post('/imgModify', (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./tmp";
  form.parse(req, function (err, fields, files) {
    if (!err) {
      let arrImg = fields.oldImg.split('|');
      for (var key of Object.keys(files)) {
        var oldpath = files[key].path;

        var newpath = 'static/'+arrImg[key.charAt(key.length - 1)].substr();

        fs.renameSync(oldpath, newpath);
      }
      res.writeHead(200, {
        'content-type': 'text/plain'
      });
      res.end("成功");
    } else {
      console.log(err);
      res.writeHead(404, {
        'content-type': 'text/plain'
      });
      res.end("失败");
    }
  })
})
//删数据
router.post('/delete', (req, res) => {
  let tableName = req.body.tableName;
  let tableKey, tableVal, arr = [];
  let all = req.body.all && req.body.all == 1 ? true : false;
  for (let [key, val] of Object.entries(req.body)) {
    if (key.toLowerCase().endsWith('id')) {
      tableKey = key;
      tableVal = val;
    }
  }
  let sql = `delete from ${tableName} where ${tableKey}=? `;
  if (all) sql = sql.substr(0, sql.indexOf('where'));
  sqlPool(sql, [tableVal], (err, data) => {
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