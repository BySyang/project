/**
 * Created by zhangpeng on 2018/4/9.
 */

$("#city").click(function (e) {
    SelCity(this,e);
});
$(function(){
    $(".chgeb").click(function(){
        $(".changepc").css({display:"block"});
        $(".clastyo").css({display:"none"})
    });
    $(".bcshrxopl").click(function(){
        $(".changepc").css({display:"none"});
        $(".clastyo").css({display:"block"});
        $(".opcaty1").css({display:"none"})
    });
    $(".adressa").click(function(){
        $(".opcaty1").css({display:"block"})
    })
});
$(function(){
    $(".shouhurxl12 a").click(function(){
        $(".shouhurxl13").css({display:"none"});
        $(".xgfpxo").css({display:"block"});
        $(".fapiaowr3").css({display:"none"})
    });
    $(".godieba").click(function(){
        $(".fapiaowr3").css({display:"block"})
    });
    $(".worilrgo").click(function(){
        $(".xgfpxo").css({display:"none"});
        $(".shouhurxl13").css({display:"block"})
    })

});
$(function(){
    $(".dianyidian").click(function(){
        $(".zgykskbj").slideToggle()
    })
});


