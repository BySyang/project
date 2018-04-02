$('.person-info-list>li ').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.info-title').text($(this).first().text());
    var index = $('.person-info-list>li ').index($(this))
    $('.person-info-content .infos>div').eq($('.person-info-list>li ').index($(this))).show().siblings().hide();
})