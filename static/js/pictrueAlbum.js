/**
 * Created by 李琳 on 2018/4/3.
 */
setInterval(changeAlbumPic(),4000);
function changeAlbumPic() {
    var onOff = true;
    var arr = [];
    $('.albumSec2 div').each(function(index,el){
        arr.push($(el));
    });
    function divTab(arr,num){
        //CSS预先定义每个div里的第二张图opacity为0
        arr[0].find('img').eq(num).animate({opacity:0},500).siblings('img').animate({opacity:1},500,function(){
            setTimeout(function(){
                arr[1].find('img').eq(num).animate({opacity:0},500).siblings('img').animate({opacity:1},500,function(){
                    setTimeout(function(){
                        arr[2].find('img').eq(num).animate({opacity:0},500).siblings('img').animate({opacity:1},500);
                    },1000)
                })
            },1000)
        })
    }
    return function (){
        if(onOff){
            divTab(arr,0);
        }else{
            divTab(arr,1);
        }
        onOff= !onOff;
    }
}

