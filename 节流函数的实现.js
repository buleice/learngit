//利用时间戳实现
function throttle(func,delay){
    var lastTime=0;
    function throttled(){
        var context=this;
        var args=arguments;
        var nowTime=Date.now();
        if(nowTime>lastTime+delay){
            func.apply(context,args);
            lastTime=nowTime;
        }
    }
    //节流函数最终返回的是一个函数
    return throttled;
}

//利用定时器实现
function throttle(func, delay) {
    var timeout = null;
    function throttled() {
        var context = this;
        var args = arguments;
        if(!timeout) {
            timeout = setTimeout(()=>{
                func.apply(context, args);
                clearTimeout(timeout);
                timeout=null
            }, delay);
        }
    }
    return throttled;
}


//组合实现，允许设置第一次或者最后一次是否触发函数执行

function throttle (func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : Date.now() || new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
        var now = Date.now() || new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            // 判断是否设置了定时器和 trailing
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
}
