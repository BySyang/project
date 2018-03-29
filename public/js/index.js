$(function(){
    var nowimg=0;
    var timer=null;
    $(".head-banner img:first").clone().appendTo('.head-banner')
    function rightFunc(){
        if(nowimg<2){
            nowimg++
            $(".head-banner").animate({"left":nowimg*-1347},1000)
        }
        else{
            nowimg=0
            $(".head-banner").animate({"left":3*-1347},1000,function(){
                $(".head-banner").css("left",0)

            })
        }
    }
    timer=setInterval(rightFunc,2000)

    $(".head-banner").mouseenter(function(){
        clearInterval(timer)
    })
    $(".head-banner").mouseout(function(){
        clearInterval(timer)
        timer=setInterval(rightFunc,2000)
    })
})