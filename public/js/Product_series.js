/**
 * Created by Admin on 2018/3/30.
 */
function margin() {
    $(".firstList dl:nth-child(1),.firstList dl:nth-child(5)").css({
        "margin-left": "0px"
    });
    $(".firstList dl:nth-child(5),.firstList dl:nth-child(6),.firstList dl:nth-child(7),.firstList dl:nth-child(8)").css({
        "margin-top": "17px"
    });
}
margin();
//    添加图片
var imgArray = [
    "images/series/sports/sports_goods/sports_goods1/sportsGoods1_mid.jpg",
    "images/series/sports/sports_goods/sports_goods2/sportsGoods2_mid.jpg",
    "images/series/sports/sports_goods/sports_goods3/sportsGoods3_mid.jpg",
    "images/series/sports/sports_goods/sports_goods4/sportsGoods4_mid.jpg",
    "images/series/sports/sports_goods/sports_goods5/sportsGoods5_mid.jpg",
    "images/series/sports/sports_goods/sports_goods6/sportsGoods6_mid.jpg",
    "images/series/sports/sports_goods/sports_goods7/sportsGoods7_mid.jpg",
    "images/series/sports/sports_goods/sports_goods8/sportsGoods8_mid.jpg",
    "images/series/sports/sports_goods/sports_goods9/sportsGoods9_mid.jpg",
    "images/series/sports/sports_goods/sports_goods10/sportsGoods10_mid.jpg",
    "images/series/sports/sports_goods/sports_goods11/sportsGoods11_mid.jpg",
    "images/series/sports/sports_goods/sports_goods12/sportsGoods12_mid.jpg",
    "images/series/sports/sports_goods/sports_goods13/sportsGoods13_mid.jpg",
    "images/series/sports/sports_goods/sports_goods14/sportsGoods14_mid.jpg",
    "images/series/sports/sports_goods/sports_goods15/sportsGoods15_mid.jpg",
    "images/series/sports/sports_goods/sports_goods16/sportsGoods16_mid.jpg",
    "images/series/sports/sports_goods/sports_goods17/sportsGoods17_mid.jpg",
    "images/series/sports/sports_goods/sports_goods18/sportsGoods18_mid.jpg",
    "images/series/sports/sports_goods/sports_goods19/sportsGoods19_mid.jpg",
    "images/series/sports/sports_goods/sports_goods20/sportsGoods20_mid.jpg"
];
var index = 0;
$(".smimg").each(function (index, ele) {
    $(this).html("<img src='" + imgArray[index] + "'/>");
});
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