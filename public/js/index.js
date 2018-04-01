$(function() {

// 轮播js
var nowimg = 0;
var timer = null;
$(".head-banner li:first").clone().appendTo('.head-banner').css({
    "background-image": "url('./images/首页banner/home-5038.jpg')",
    "background-size": "100% 100%",
    "background-repeat": "no-repeat"
})

function rightFunc() {
    if (nowimg < 2) {
        nowimg++
        $(".head-banner").animate({ "left": nowimg * -1347 }, 1500)
    } else {
        nowimg = 0
        $(".head-banner").animate({ "left": 3 * -1347 }, 2000, function() {
            $(".head-banner").css("left", 0)

        })
    }
}
timer = setInterval(rightFunc, 4000)
$(".head-banner").mouseenter(function() {
    clearInterval(timer)
})

// 导航js
$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > 10) {
        $(".head-nav").addClass("head-nav1")
        $(".head-nav>ul>li>a").css({"color":"#000000"})
        $(".head_nav_right_i>i").addClass("box_input1")
        $(".box_input").css({"border":"1px solid #ff0066"})
    }

    if (scrollTop < 10) {
        $(".head-nav").removeClass("head-nav1")
        $(".head-nav>ul>li>a").css({ "color": "white" })
        $(".head_nav_right_i>i").removeClass("box_input1");
        $(".box_input").css({"border":"1px solid white"})

    }
})

// 登录注册弹出框js  
    $('.icon-gerenzhongxin').on('click', function(){
        layer.open({
            type: 2,
            title: false,
            shade: [0.8],
            maxmin: false,
            shadeClose: true, 
            // anim: 2,
            content: ['login.html', 'no'], //iframe的url，no代表不显示滚动条
            area : ['680px' , '458px'],
            content: 'login.html'
          });
      });
    
    // 登录注册切换js
    $(".l_z>span:nth-child(1)").on('click',function(){
        $(".login_row").css({"display":"block"})
        $(".l_z>span:nth-child(2)").css({"border-bottom":"none"})
        $(this).css({"border-bottom":"4px solid #ff0066"})
        $(".register").css({"display":"none"})
        // console.log("1111")
    })
    $(".l_z>span:nth-child(2)").on('click',function(){
        $(".login_row").css({"display":"none"})
        $(".l_z>span:nth-child(1)").css({"border-bottom":"none"})
        $(this).css({"border-bottom":"4px solid #ff0066"})
        $(".register").css({"display":"block"})
        // console.log("2222")
    })
    

    })