function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

var messageUtils = {
    display:function(msg,autoWidth=true,time=2000){
        var context = "";
        context += "<div id='toast_container' class='toast_container'>";
        context += "<div class='placeholder_xhw'>";
        context += "<div class='toast_xhw'>";
        if(autoWidth){
            context += "<span class='toast_message_xhw'>"+ msg +"</span>";
        }else{
            context += "<span class='toast_message_xhw autoWidth_xhw'>"+ msg +"</span>";
        }
        context += "</div>";
        context += "</div>";
        context += "</div>";
        $("body").append(context);
        $("#toast_container").show();
        if(time>0){
            setTimeout(function(){
                $("#toast_container").remove();
            },time);
        }
    },
    disappear:function(){
        $("#toast_container").remove();
    }
}

var displayX = function(x){
    var displayScaleX = window.innerWidth / 1920;
    return parseInt(x * displayScaleX);
};
var displayY = function(y){
    var displayScaleY = window.innerHeight / 1080;
    return parseInt(y * displayScaleY);
};

var displayScale = function(){
    var displayScaleX = window.innerWidth / 1920;
    return displayScaleX;
}

var getUrlParam = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return decodeURI(r[2]); return null; //返回参数值
}

var toDesignX = function(x){
    return (x/window.innerWidth) * 1920;
}

var toDesignY = function(y){
    return (y/window.innerHeight) * 1080;
}


var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var AudioPlayer = {
    play:function(source,callback){
        $("#audioPlayer").remove();
        var context = "<audio id='audioPlayer' src='"+ source +"'>";
        context +="您的浏览器不支持 audio 标签。";
        context += "</audio>";
        $("body").append(context);
        $("#audioPlayer")[0].play();
        $("#audioPlayer").on("ended",function(){
            $("#audioPlayer").remove();
            if(callback){
                callback();
            }
        });
    },
    stop:function(){
        $("#audioPlayer").remove();
    }
}


$._swipe = function(selector,callback,type){
    var isTouch = false;
    var originTarget;
    var baseOffsetX = document.documentElement.clientWidth/50;
    var baseOffsetY = document.documentElement.clientHeight/20;

    var touches = [];
    var t;
    $(selector).on("touchstart",touchstart);
    $(selector).on("touchend",touchend);
    //var dom = $(selector)[0];
    //dom.addEventListener("touchstart",touchstart);
    //dom.addEventListener("touchend",touchend);

    function touchstart(e){
        console.log("touchstart");
        e.preventDefault();
        e.stopPropagation();
        if(isTouch){
            return false;
        }
        originTarget = e.target;
        //$(selector).unbind("touchstart",touchstart);
        touches = [];
        var x = e.originalEvent.changedTouches[0].clientX;
        var y = e.originalEvent.changedTouches[0].clientY;
        touches[0] = {x:x, y:y};
        clearTimeout(t);
        t = setTimeout(handleSwipe,500);
        isTouch = true;
        return false;
    }

    function touchend(e){
        console.log("touchend");

        e.preventDefault();
        e.stopPropagation();

        var x = e.originalEvent.changedTouches[0].clientX;
        var y = e.originalEvent.changedTouches[0].clientY;

        touches[1] = {x:x, y:y};

        // if(touches[0]!=undefined && touches[1]!=undefined){
        //     var offsetX,offsetY;
        //     offsetX = touches[1].x - touches[0].x;
        //     offsetY = touches[1].y - touches[0].y;

        //     if(type=="swipeleft" || type=="swiperight" || type=="swipehorizontal"){
        //         if(Math.abs(offsetX)>baseOffsetX){
        //             clearTimeout(t);
        //             handleSwipe();
        //         }
        //     }else if(type=="swipeup" || type=="swipedown" || type=="swipehvertical"){
        //         if(Math.abs(offsetY)>baseOffsetY){
        //             clearTimeout(t);
        //             handleSwipe();
        //         }
        //     }else{
        //         if(Math.abs(offsetX)>baseOffsetX || Math.abs(offsetY)>baseOffsetY){
        //             clearTimeout(t);
        //             handleSwipe();
        //         }
        //     }
        // }

        return false;

    }

    function handleSwipe(){
        console.log("handle swipe:",isTouch);
        setTimeout(function(){
            touches = [];
            isTouch = false;
        },100);
        if(touches[1]==undefined){
            return false;
        }
        var offsetX,offsetY;
        offsetX = touches[1].x - touches[0].x;
        offsetY = touches[1].y - touches[0].y;
        var params = {
            offsetX:offsetX,
            offsetY:offsetY,
            originTarget:originTarget
        };

        switch(type){
            case "swipeleft":
                if(offsetX<0 && Math.abs(offsetX)>baseOffsetX){
                    params.type = "left";
                    callback(params);
                }
                break;
            case "swiperight":
                if(offsetX>0 && Math.abs(offsetX)>baseOffsetX){
                    params.type = "right";
                    callback(params);
                }
                break;
            case "swipeup":
                if(offsetY<0 && Math.abs(offsetY)>baseOffsetY){
                    params.type = "up";
                    callback(params);
                }
                break;
            case "swipedown":
                if(offsetY>0 && Math.abs(offsetY)>baseOffsetY){
                    params.type = "down";
                    callback(params);
                }
                break;
            case "swipehorizontal":
                if(Math.abs(offsetX)>baseOffsetX){
                    if(offsetX<0){
                        params.type = "left";
                    }else{
                        params.type = "right";
                    }
                    callback(params);
                }
                break;
            case "swipehvertical":
                if(Math.abs(offsetY)>baseOffsetY){
                    if(offsetY<0){
                        params.type = "up";
                    }else{
                        params.type = "down";
                    }
                    callback(params);
                }
                break;
            default:
                if(Math.abs(offsetX)>baseOffsetX || Math.abs(offsetY)>baseOffsetY){
                    callback(params);
                }
                break;
        }

        if(Math.abs(offsetX)<baseOffsetX && Math.abs(offsetY)<baseOffsetY){
            console.log("点击处理");
            originTarget.setAttribute("swipeclick",true);
            originTarget.click();
            originTarget.removeAttribute("swipeclick");
        }

        console.log("handle swipe end:",params);
    }

}

$._swipeLeft = function(selector,callback){
    $._swipe(selector,callback,"swipeleft");
};

$._swipeRight = function(selector,callback){
    $._swipe(selector,callback,"swiperight");
};

$._swipeUp = function(selector,callback){
    $._swipe(selector,callback,"swipeup");
};

$._swipeDown = function(selector,callback){
    $._swipe(selector,callback,"swipedown");
};

$._swipeHorizontal = function(selector,callback){
    $._swipe(selector,callback,"swipehorizontal");
};

$._swipeVertical = function(selector,callback){
    $._swipe(selector,callback,"swipehvertical");
};