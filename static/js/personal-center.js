$(function () {

    $('.person-info-list>li ').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.info-title').text($(this).first().text());
        var index = $('.person-info-list>li ').index($(this))
        $('.person-info-content .infos>div').eq($('.person-info-list>li ').index($(this))).show().siblings().hide();
    })
    $('#orders').click(function () {
        show({
            url: 'orderList',
            success(data) {
                showOrders()(data);
            }
        })
    })
    $('#person').click(function () {
        show({
            url: 'userInfo',
            success(data) {
                console.log(data)
            }
        })

    })
    $('#address').click(function () {
        show({
            url: 'userAddress',
            success(data) {
                console.log(data)
            }
        })
    })
    $('logistics').click(function () {
        show({
            url: 'orderList',
            success(data) {
                console.log(data)
            }
        })
    })


    $(document).on('click',()=>{
        
    })
    /**
     * 
     * @param {Object} options url | success
     */
    function show(options) {
        isLogin({
            success() {
                $.ajax({
                    type: 'post',
                    url: options.url,
                    success(data) {
                        options.success(data);
                    },
                    error(err) {
                        console.log(err)
                    }
                })
            },
            fail() {
                layer.open({
                    type: 2,
                    title: false,
                    shade: [0.8],
                    maxmin: false,
                    shadeClose: true,
                    // anim: 2,
                    content: ['login.html', 'no'], //iframe的url，no代表不显示滚动条
                    area: ['680px', '458px'],
                    content: 'login.html'
                });
            }
        })
    }
})