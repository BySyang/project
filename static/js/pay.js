/**
 * Created by zhangpeng on 2018/4/10.
 */
$(function(){
    $(".xzbsni ul li").click(function(){
        $(this).addClass("plok").siblings().removeClass("plok")
    })
})