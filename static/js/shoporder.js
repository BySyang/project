/**
 * Created by zhangpeng on 2018/4/9.
 */
if($('#null')[0]){
    let i = 5;
    setInterval(()=>{
        i--;
        $('#null').find('time').text(i);
        if(i==0) location.href='index.html';
    },1000)
}
$(document).on('click', '#city', function (e) {
    SelCity(this, e);
});
$.ajax({
    type: "post",
    url: '/userAddress',
    data: {
        userId: $('#userInfo').data('id')
    },
    success(data) {
        addressDom(data);
    },
    error(err) {
        console.log(err);
    }
})
$(function () {
    $(document).on('click', '.chgeb', function () {
        $(".changepc").css({
            display: "block"
        });
        $(".clastyo").css({
            display: "none"
        })
    });
    $(document).on('click', '.adressa', function () {
        $(".opcaty1").css({
            display: "block"
        })
    })
});
$(function () {
    $(document).on('click', '.shouhurxl12 a', function () {
        $(".shouhurxl13").css({
            display: "none"
        });
        $(".xgfpxo").css({
            display: "block"
        });
        $(".fapiaowr3").css({
            display: "none"
        })
    });
    $(document).on('click', '.godieba', function () {
        $(".fapiaowr3").css({
            display: "block"
        })
    });
    $(document).on('click', '.worilrgo', function () {
        $(".xgfpxo").css({
            display: "none"
        });
        $(".shouhurxl13").css({
            display: "block"
        })
    })

});
$(function () {
    $(document).on('click', '.dianyidian', function () {
        $(".zgykskbj").slideToggle()
    })



});

function addressDom(data) {
    var dom1 = '',
        dom2 = '',
        dom3 = `<div class="dandudizhi">
                    <input type="radio" name="adressa" class="adressa" style=" float:left; display:block; width:13px; height:13px; margin-top:9px">
                    <span>使用新地址</span>
                </div>`;
    dom4 = `<div class="opcaty1">
                    <div class="opcaty2">
                        <em>收货人姓名：</em>
                        <input style="float:left; border:1px solid #bbb; box-shadow:none; height:28px; font-size:12px; text-indent:6px" type="text"
                            class="shuru" />

                    </div>
                    <div class="opcaty2">
                        <em>所在的地区：</em>
                        <input type="text" id="city" value="点击选择地区" style=" height:28px; font-size:12px; border:1px solid #bbb; float:left" />
                    </div>
                    <div class="opcaty2">
                        <em>详细的地址：</em>
                        <input style="float:left; border:1px solid #bbb; box-shadow:none; height:28px; font-size:12px; text-indent:6px; width:488px"
                            type="text" class="shuru" placeholder="请填写真实地址，不需要重复填写所在地区" required />

                    </div>
                    <div class="opcaty2">
                        <em>联系的电话：</em>
                        <input style="float:left; border:1px solid #bbb; box-shadow:none; height:28px; font-size:12px; text-indent:6px" type="text"
                            class="shuru" />

                    </div>
                    <a href="#" class="bcshrxopl">保存收货人信息</a>
                </div>`
    data.forEach(item => {
        if (item.isDefault == 1) {
            dom1 = `<div class = "tongyongdizhi" >
                    <input type = "radio" name = "adressa" style=" float:left; display:block; width:13px; height:13px; margin-top:9px" checked="true" >
                    <span class="t1"> ${item.userName} </span> <span class="t2"> ${item.userAddress} </span> <span>
                    <em> 电话： </em> <em class="t3"> ${item.userPhone} </em> </span> <a href = "#" > 删除 </a> </div>`
        } else {
            dom2 += `<div class = "tongyongdizhi" >
                    <input type = "radio"name = "adressa" style = " float:left; display:block; width:13px; height:13px; margin-top:9px" >
                    <span class="t1"> ${item.userName} </span> <span class="t2"> ${item.userAddress} </span> <span>
                    <em> 电话： </em> <em class="t3"> ${item.userPhone} </em> </span> <a href = "#" > 删除 </a> </div>`
        }
    })
    
    $('.changepc').append(dom1 + dom2 + dom3 + dom4);
}
$(document).on('click', '.bcshrxopl', () => {
    var inputs = $('.opcaty1').find('.shuru');

    if (inputs[0].value && $('#hcity').val() && inputs[1].value && inputs[2].value) {
        window.addr = inputs[0].value + ' ' + $('#hcity').val() + $('#hproper').val() + $('#harea').val() + inputs[1].value + ' ' + inputs[2].value;
        $(".changepc").css({
            display: "none"
        });
        $(".clastyo").css({
            display: "block"
        });
        $(".opcaty1").css({
            display: "none"
        })
    } else {
        layer.msg('请完善地址信息!');
    }


})
$('#submit').click(() => {
    var address = '';
    var dom = $('.changepc').find('input[type="radio"]:checked').parent();
    if (dom.hasClass('tongyongdizhi')) {
        address = dom.find('.t1').text() + dom.find('.t2').text() + dom.find('.t3').text();
    } else {
        if (window.attr) {
            address = attr;
        }
    }
    var Remarks = $('#liuyan').val();
    var orderId = $('#submit').data('id');
    $.ajax({
        type: 'post',
        url: '/orderModifyweb',
        data: {
            address,
            Remarks,
            orderId
        },
        success(data) {
            if (data == 'ok') {
                location.href = 'pay.html';
            } else {
                layer.msg(data);
            }
        },
        error(err) {
            console.log(err)
        }
    })
})
$('#cancel').click(() => {
    $.ajax({
        type: 'post',
        url: '/orderModifyweb',
        data: {
            isPay:0,
            isCancel: 1,
            orderId: $('#submit').data('id')
        },
        success(data) {
            if (data == 'ok') {
                layer.msg('订单已取消')
                location.reload();
            } else {
                layer.msg(data);
            }
        },
        error(err) {
            console.log(err)
        }
    })
})
