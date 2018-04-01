// 登录注册js
$(function(){  
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
    })