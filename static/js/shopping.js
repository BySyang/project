$(function () {

  //number加减
  let number_val = parseInt($('.number_show').val());
  let danjia = parseInt($('.shopping_price').text());
  let xiaojie = parseInt($('.shopping_subtotal').text());

  //全选
  $('#allcheck').click(function () {
    $(this).toggleClass('shop_checked');
    if ($(this).hasClass('shop_checked')) {
      $('.check').addClass('shop_checked');
    } else {
      $('.check').removeClass('shop_checked');
    }
    catCalc();

  })
  //单选
  $(document).on('click', '.check', function () {
    $(this).toggleClass('shop_checked');
    catCalc();
  })
  //商品减
  $(document).on('click', '.number_redu', function () {
    var nowNum = $(this).siblings('input').val();
    var newNum = $(this).siblings('input').val(nowNum > 1 ? --nowNum : nowNum).val();
    $(this).parents('li').siblings('.shopping_subtotal').text($(this).parents('li').siblings('.shopping_price').data('price') * newNum + '元')
    if (nowNum != newNum) catCalc();
    numChange.call(this);
  })
  //商品加
  $(document).on('click', '.number_add', function () {
    var nowNum = $(this).siblings('input').val();
    var newNum = $(this).siblings('input').val(++nowNum).val();
    $(this).parents('li').siblings('.shopping_subtotal').text($(this).parents('li').siblings('.shopping_price').data('price') * newNum + '元')
    catCalc();
    numChange.call(this);
  })
  //购物车算法
  function catCalc() {
    var allNUm = 0;
    var allMoney = 0;
    var checkNum = 0;
    $('.check').each(function () {
      if ($(this).hasClass('shop_checked')) {
        var price = parseInt($(this).parents('ul').find('.shopping_price').data('price'));
        var num = parseInt($(this).parents('ul').find('.shopping_number input').val());
        allMoney += price * num;
        allNUm += num;
        checkNum++;
      }
    });
    $('#shopping_allnum').text(checkNum);
    $('#shopping_checknum').text(allNUm);
    $('#shopping_subtotal').text(allMoney);
  }
  //购物车结算
  $('#shopping_jiesuan').click(() => {
    var goodsInfo = {};
    var cartIds = [];
    var ul = $($('.shopping_sec').find('ul').has('.shop_checked'));
    var goodsId = ul.data('id');
    var price = ul.find('.shopping_price').data('price');
    var num = ul.find('input').val();
    var spec = ul.data('spec');
    ul.each(function (i) {
      goodsInfo['goodsId' + i] = $(this).data('id');
      goodsInfo['price' + i] = $(this).find('.shopping_price').data('price');
      goodsInfo['num' + i] = $(this).find('input').val();
      goodsInfo['spec' + i] = $(this).data('spec');
      cartIds.push($(this).data('cart'));
    })
    if (cartIds.length == 0) {
      layer.msg('没有商品!');
      return
    }
    $.ajax({
      type: 'post',
      url: '/orderAdd',
      data: goodsInfo,
      success(data) {
        if (data == 'ok') {
          $.post('/catCancel', {
            cartIds
          }, data => {
            if (data == 'ok') {
              location.href = 'shoporder.html';
            } else {
              layer.msg(data);
            }
          })
        } else {
          layer.msg(data);
        }

      },
      error(err) {
        console.log(err);

      }
    })
  })
});

//删除商品
$(document).on('click', '.icon-shanchu', function () {
  var that = this;
  layer.confirm('你确定要从购物车中删除此商品吗?', {
      btn: ['删除', '取消']
    },
    function () {
      $.post('/catDel', {
        cartId: $(that).parents('ul').data('cart')
      }, data => {
        if (data == 'ok') {
          layer.msg('删除成功');
          if ($(that).parents('ul').siblings().length == 0) {
            $(that).parents('.shopping_sec').append('<ul>你的购物车空空如也.</ul>');
          }
          $(that).parents('ul').remove()
        } else {
          layer.msg(data);
        }
      })
    },
    function () {
      layer.closeAll();
    })
})

function numChange() {
  var cartNum = $(this).siblings('input').val();
  var cartId = $(this).parents('ul').data('cart');
  $.post('/catModify', {
    cartNum,
    cartId
  }, data => {
    if (data == 'ok') {
      console.log('修改成功')
    } else {
      layer.msg('添加出错0.0!');
    }
  })

}