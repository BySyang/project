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
  })
  //商品加
  $(document).on('click', '.number_add', function () {
    var nowNum = $(this).siblings('input').val();
    var newNum = $(this).siblings('input').val(++nowNum).val();
    console.log(newNum)
    $(this).parents('li').siblings('.shopping_subtotal').text($(this).parents('li').siblings('.shopping_price').data('price') * newNum + '元')
    catCalc();
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
    })
    console.log(goodsInfo)
    $.ajax({
      type:'post',
      url: '/orderAdd',
      data: goodsInfo,
      success(data){
        console.log(data);
      },
      error(err){
        console.log(err);
        
      }
    })
  })
});