$(function () {
    var nowimg = 0;
    var timer = null;
    $(".head-banner li:first").clone().appendTo('.head-banner').css({
        "background-image": "url('./images/home-5038.jpg')", "background-size": "100% 100%",
        "background-repeat": "no-repeat"
    })

    function rightFunc() {
        if (nowimg < 2) {
            nowimg++
            $(".head-banner").animate({ "left": nowimg * -1347 }, 1500)
        }
        else {
            nowimg = 0
            $(".head-banner").animate({ "left": 3 * -1347 }, 1000, function () {
                $(".head-banner").css("left", 0)

            })
        }
    }
    timer = setInterval(rightFunc, 2500)
    $(".head-banner").mouseenter(function () {
        clearInterval(timer)
    })
})
