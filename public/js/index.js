$(function() {
// 轮播js
var nowimg = 0;
var timer = null;
$(".list_item").css({"cursor":"pointe"})
$(".head-banner li:first").clone().appendTo('.head-banner').css({
    "background-image": "url('./images/indexImage/index_banner/index_banner1.jpg')",
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
    if (scrollTop > 300) {
        $(".head-nav").addClass("head-nav1")
        $(".head-nav>ul>li>a").css({"color":"#000000"})
        $(".head_nav_right_i>i").addClass("box_input1")
        $(".box_input").css({"border":"1px solid #ff0066"})
        $(".section-button").show(500,function(){
            //回调函数，设置点击按钮执行相应功能
        })
    }

    if (scrollTop < 10) {
        $(".head-nav").removeClass("head-nav1")
        $(".head-nav>ul>li>a").css({ "color": "white" })
        $(".head_nav_right_i>i").removeClass("box_input1");
        $(".box_input").css({"border":"1px solid white"})

    }
})


    // 系列下拉菜单js
    // var imgarr=new Array(['../images/menuImage/sonMenu_fresh.jpg'])
    $(".product_txt").mouseenter("click",function(){
        $(".product_list").toggle(500)
        $(".product_img").toggle(500)
        // $(".product_list>ul>li:nth-child(1)").on('click',function(){
        //     $(".product_img>div:nth-child(1)").css({"background":"url(../images/menuImage/sonMenu_fresh.jpg)"})
        //     console.log(imgarr[0])
        //     console.log("1111")
        // })
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