/**
 * Created by zhangpeng on 2018/4/10.
 */
$(function () {
    $(".xzbsni ul li").click(function () {
        $(this).addClass("plok").siblings().removeClass("plok")
    })
    $('#pay').click(function () {
        if ($('.xzbsni .plok')[0]) {
            $.ajax({
                type: 'post',
                url: '/orderModifyweb',
                data: {
                    orderId: $('.tijiaozhifu').data('id'),
                    isPay: 1,
                    isCancel:0
                },
                success(data) {
                    if (data == 'ok') {
                        layer.msg('支付成功,等待客服处理...')
                    } else {
                        layer.msg(data);
                    }
                }
            })
        }else{
            layer.msg('请选择支付方式!');
        }
    })

})