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
  console.log($('.color div').eq(0).find('div'))
  $('.color div').eq(0).find('div').addClass("color_default");
  $('.color div').each(function () {
    $(this).click(function () {
      $(".color div").addClass("color_default").removeClass("color_checked");
      $(this).addClass("color_checked").removeClass("color_default");
    })
  })
  //size选择
  $('.size div').on('click', function () {
    $('.size div').css('background-color', '#fff');
    $(this).css('background-color', '#ff0066');
  });
  //cups选择
  $('.cups div').on('click', function () {
    $('.cups div').css('background-color', '#fff');
    $(this).css('background-color', '#ff0066');
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
  if($('.toppinlun').text()==='条评论'){
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
        type:'post',
        url:`/userOneInfo`,
        async:false,
        data:`id=${data[i].userId}`,
        success(data1){
          str += ` <div>
      <div class="con_left">
        <img src="${data1[0].userPhoto}" alt="">
        <p>${data1[0].userName}</p>
      </div>
      <div class="con_right">
        <div>
          <p>评分:</p>`
        },
        error(err){
          console.log(err)
        }
      })
     
      for (let j = 0; j < data[i].orderScore; j++) {
        str += `<span class="icon-star iconfont"  style="color:#ffc832;"></span>`
      }
      for (let k = 0; k < 5-data[i].orderScore; k++) {
        str += `<span class="icon-STAR iconfont"></span>`
      }
      str+=`</div>
        <p>${data[i].scoreText}</p>
        <p class="pro_data_ed">${formatDate(data[i].createTime)}</p>
      </div>
    </div>`
    }
    if(str==''){
      str =` <div class="product_comments">
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
// $.ajax({
//   type:get
// })
