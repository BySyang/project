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


})