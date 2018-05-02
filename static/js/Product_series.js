/**
 * Created by Admin on 2018/3/30.
 */

$(".smimg img").css({
    "width": "100%"
});

function xingMargin() {
    //    星级上边距
    $(".bigdl dt:nth-child(2)").css({
        "margin-top": "6px"
    });
    //商品名
    $(".bigdl dt:nth-child(3)").css({
        "color": "#434343",
        "margin-top": "6px",
        "font-size": "15px",
        "margin-left": "11px",
        "font-weight": "normal"
    });
    $(".bigdl dt:nth-child(4)").css({
        "margin-left": "11px",
        "margin-top": "6px"
    });
}
xingMargin();
$(".bigdl").mouseenter(function () {
    $(this).find(".smimg img").css({
        "transform": "scale(1.02)"
    })
});
$(".bigdl").mouseout(function () {
    $(this).find(".smimg img").css({
        "transform": "",
        "-webkit-transition": "all 0.3s linear"
    })
});
$('.bigdl').on('click', function () {
    let id = $(this).attr('data-id');
    location.href = `Product_details.html?id=${id}`;
});