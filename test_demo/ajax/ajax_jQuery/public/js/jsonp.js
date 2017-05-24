function jsonp(opts){

    let settings = {
        url: '',
        data: {},
        callback: 'callback', // ?callback=XXXX decied by back-end dev.
        fnName: 'jsonp_' + new Date().getTime(), //create unique functio name by adding time stamp.
        succ: function(){} //callback when request succeed.
    };

    for(let attr in opts){
        settings[attr] = opts[attr];
    }

    //create script tag
    let script = document.createElement('script');
    script.className = 'sc';
    settings.data[settings.callback] = settings.fnName; //Add key-value pair : 'callback' , settings.fnName
    /*
    假设规定传入callback的名字为 cb会出现在query的后面
    如： a.kylewh.com?cb=xxxx(settings.fnName)
    后端获取cb的值settings.fnName(例如jsonp_1486116155000)后发送一段函数调用信息，函数名就是settings.fnName;
    比如: res.send ( jsonp_1486116155000('传回的信息'); //函数调用)
    settings = {
        data: {
            “cb”:  settings.fnName （时间戳）
        }
    }
    */
    //console.log( settings.callback, settings.data)


    //assemble params in settings.data together
    let arr = [];
    for(let attr in settings.data){
        arr.push(attr + '=' + settings.data[attr]);
    }
    settings.data = arr.join('&');
    script.src = settings.url + '?' + settings.data;


    //mounting global callback function.
    window[settings.fnName] = function(data){
        //clear all script created before
        let scs = document.getElementsByClassName('sc');
        for(let i=0; i<scs.length; i++){
            document.head.removeChild(scs[i]);
        }
        //真正的callback调用：
        settings.succ(data);
    };

    document.head.appendChild(script);

};