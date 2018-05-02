$(function () {

  //number加减
  let number_val = parseInt($('.number_show').val());
  let danjia = parseInt($('.shopping_price').text());
  let xiaojie = parseInt($('.shopping_subtotal').text());
  console.log(danjia)
  $('.number_redu').on('click', function () {
    if (number_val > 1) {
      number_val -= 1;
      $('.number_show').val(number_val);
      xiaojie=danjia*number_val;
      $('.shopping_subtotal').text(xiaojie+'元');
    }
  });
  $('.number_add').on('click', function () {
    if (number_val < 99) {
      number_val += 1;
      $('.number_show').val(number_val);
      xiaojie=danjia*number_val;
      $('.shopping_subtotal').text(xiaojie+'元');
    }
  });
  $('.shop_check').click(function(){
    $(this).toggleClass('shop_checked');
  })
  
});