$(function () {
  //放大镜
  $.fn.magnifying = function () {
    var that = $(this),
      $imgCon = that.find('.con-fangDaIMg'), //正常图片容器
      $Img = $imgCon.find('img'), //正常图片，还有放大图片集合
      $Drag = that.find('.magnifyingBegin'), //拖动滑动容器
      $show = that.find('.magnifyingShow'), //放大镜显示区域
      $showIMg = $show.find('img'), //放大镜图片
      $ImgList = that.find('.con-FangDa-ImgList > li >img'),
      multiple = $show.width() / $Drag.width();

    $imgCon.mousemove(function (e) {
      $Drag.css('display', 'block');
      $show.css('display', 'block');
      var iX = e.pageX - $(this).offset().left - $Drag.width() / 2,
        iY = e.pageY - $(this).offset().top - $Drag.height() / 2,
        MaxX = $imgCon.width() - $Drag.width(),
        MaxY = $imgCon.height() - $Drag.height();
      iX = iX > 0 ? iX : 0;
      iX = iX < MaxX ? iX : MaxX;
      iY = iY > 0 ? iY : 0;
      iY = iY < MaxY ? iY : MaxY;
      $Drag.css({
        left: iX + 'px',
        top: iY + 'px'
      });
      $showIMg.css({
        marginLeft: -multiple * iX + 'px',
        marginTop: -multiple * iY + 'px'
      });
      if (e.target == $showIMg[0]) {
        $Drag.css('display', 'none');
        $show.css('display', 'none');
      }
    });
    $imgCon.mouseout(function () {
      $Drag.css('display', 'none');
      $show.css('display', 'none');
    });

    $ImgList.click(function () {
      var NowSrc = $(this).data('bigimg');
      $Img.attr('src', NowSrc);
      $(this).parent().addClass('active').siblings().removeClass('active');
    });
  }
  $("#fangdajing").magnifying();

  //color选择
  $('.color').on('click', 'div', function () {
    $(this).addClass("color_checked").removeClass("color_default").siblings('div').addClass('color_default').removeClass("color_checked");
    $(this).addClass('active').siblings().removeClass('active');
    showStock()
  })
  //size选择
  $('.size').on('click', 'div', function () {
    $(this).siblings('div').css('border', '1px solid #ccc');
    $(this).css('border', '1px solid #ff0066');
    $(this).addClass('active').siblings().removeClass('active');
    showStock()
  });
  //cups选择
  $('.cups').on('click', 'div', function () {
    $(this).siblings('div').css('border', '1px solid #ccc');
    $(this).css('border', '1px solid  #ff0066');
    $(this).addClass('active').siblings().removeClass('active');
    showStock()
  });

  //number加减
  let number_val = parseInt($('#number_show').val());
  $('#number_redu').on('click', function () {
    if (number_val > 1) {
      number_val -= 1;
      $('#number_show').val(number_val);
    }
  });
  $('#number_add').on('click', function () {
    if (number_val < 99) {
      number_val += 1;
      $('#number_show').val(number_val);
    }
  });

  //复选择
  $('.product_detamid>ul>li').on('click', function () {
    $(this).addClass('product_midactive').siblings().removeClass('product_midactive');
    $('.con').eq($('.product_detamid>ul>li').index(this)).addClass('product_datatabture').siblings().removeClass('product_datatabture');
  });
  if ($('.toppinlun').text() === '条评论') {
    $('.toppinlun').html('0条评论!')
  }
});
//渲染评论
$.ajax({
  type: 'get',
  url: `/goodscore?id=${$('#pingfen').data('id')}`,
  success(data) {
    var str = '';
    for (let i = 0; i < data.length; i++) {
      $.ajax({
        type: 'post',
        url: `/userOneInfo`,
        async: false,
        data: `id=${data[i].userId}`,
        success(data1) {
          str += ` <div>
      <div class="con_left">
        <img src="${data1[0].userPhoto}" alt="">
        <p>${data1[0].userName}</p>
      </div>
      <div class="con_right">
        <div>
          <p>评分:</p>`
        },
        error(err) {
          console.log(err)
        }
      })

      for (let j = 0; j < data[i].orderScore; j++) {
        str += `<span class="icon-star iconfont"  style="color:#ffc832;"></span>`
      }
      for (let k = 0; k < 5 - data[i].orderScore; k++) {
        str += `<span class="icon-STAR iconfont"></span>`
      }
      str += `</div>
        <p>${data[i].scoreText}</p>
        <p class="pro_data_ed">${formatDate(data[i].createTime)}</p>
      </div>
    </div>`
    }
    if (str == '') {
      str = ` <div class="product_comments">
      <span>暂无评价！</span>
      <div></div>
    </div>`
    }
    $('#pingfen').html(str);
  },
  error(err) {
    console.log(err)
  }
})

//渲染商品规格
$.ajax({
  type: 'get',
  url: `/goodspecs?id=${$('#pingfen').data('id')}`,
  success(data) {
    var colorArr = [];
    var sizeArr = [];
    var cupsArr = [];
    data.forEach((item, i) => {
      let arr = item.dictdata_value.split('|');
      colorArr.push(arr[0]);
      sizeArr.push(arr[1]);
      cupsArr.push(arr[2]);
    });
    colorArr = [...new Set(colorArr)].sort();
    sizeArr = [...new Set(sizeArr)].sort();
    cupsArr = [...new Set(cupsArr)].sort();
    $('.color').html(() => {
      var str = '';
      colorArr.forEach((item, i) => {
        if (i == 0) {
          str += `<div data-id="${item}" class="color_checked active"></div>`
        } else {
          str += `<div data-id="${item}"></div>`
        }
      })
      return '<p>颜色</p>' + str
    });
    $('.size').html(() => {
      var str = '';
      sizeArr.forEach((item, i) => {
        if (i == 0) {
          str += `<div data-id="${item}" style="border: 1px solid red;" class="active">${item}</div>`;
        } else {
          str += `<div data-id="${item}">${item}</div>`;
        }
      })
      return '<p>衣带尺寸</p>' + str
    })
    $('.cups').html(() => {
      var str = '';
      cupsArr.forEach((item, i) => {
        if (i == 0) {
          str += `<div data-id="${item}" style="border: 1px solid red;" class="active">${item}</div>`
        } else {
          str += `<div data-id="${item}">${item}</div>`
        }
      })
      return '<p>罩杯大小</p>' + str
    });
    showStock()
  }
})

function showStock() {
  var color = $('.color>.active').data('id');
  var size = $('.size>.active').data('id');
  var cups = $('.cups>.active').data('id');
  $.ajax({
    type: 'get',
    url: `/goodspecs?id=${$('#pingfen').data('id')}&spec=${color}|${size}|${cups}`,
    success(data) {
      if (!data[0]) {
        $('.goodStock').text(0);
        $('.money').text('无')
      } else {
        $('.goodStock').text(data[0].goodStock);
        $('.money').text('¥ ' + data[0].goodsPrice)
      }
    },
    error(err) {
      console.log(err)
    }

  })
}
//生成订单
$('#lijibuy').on('click', function () {
  let stock = $('.goodStock').text() //库存
  if (stock > 0) {
    $('.price .money').text() //单价
    $('#number_show').val() //数量
    $('#pingfen').data('id') //商品id
    let spec = `${$('.color .active').data('id')}|${$('.size .active').data('id')}|${$('.cups .active').data('id')}`;
    $.ajax({
      type: 'post',
      url: '/orderAdd',
      data: {
        price: $('.price .money').text().substr(1),
        num: $('#number_show').val(),
        goodsId: $('#pingfen').data('id'),
        goodSpec: spec
      },
      success(data) {
        if (data == 'ok') {
          window.location.href = 'shoporder.html'
        } else {
          layer.msg(data);
        }
      },
      error(err) {
        console.log(err)
      }
    })
  } else {
    layer.msg('库存不足!');
  }
})
//生成购物车
$('#tianjiagouwu').click(() => {
  let stock = $('.goodStock').text() //库存
  if (stock > 0) {
    $('.price .money').text() //单价
    $('#number_show').val() //数量
    $('#pingfen').data('id') //商品id
    let spec = `${$('.color .active').data('id')}|${$('.size .active').data('id')}|${$('.cups .active').data('id')}`;
    $.ajax({
      type: 'post',
      url: '/catAdd',
      data: {
        price: $('.price .money').text().substr(1).trim(),
        catNum: $('#number_show').val(),
        goodsId: $('#pingfen').data('id'),
        spec: spec
      },
      success(data) {
        if (data == 'ok') {
          layer.confirm('您的宝贝已加入购物车,您是继续购物,还是前往购物车结算？', {
            btn: ['继续购物', '前往购物车'] //按钮
          }, function () {

          }, function () {
            location.href = 'shopping.html';
          });
        }
      },
      error(err) {
        console.log(err)
      }
    })
  } else {
    layer.msg('库存不足!');
  }
})