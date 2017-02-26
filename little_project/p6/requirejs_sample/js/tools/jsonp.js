define('tools/jsonp', [], function () {
    return function jsonp(opts) {
        var settings = {
            url: '',
            data: {},
            callback: 'callback', // ?callback=XXXX decied by back-end dev.
            fnName: 'func',
            succ: function () {} //callback when request succeed.
        };

        for (var attr in opts) {
            settings[attr] = opts[attr];
        }

        //create script tag
        var script = document.createElement('script');
        script.className = 'sc';
        settings.data[settings.callback] = settings.fnName; //Add key-value pair : 'callback' , settings.fnName



        //assemble params in settings.data together
        var arr = [];
        for (var attr in settings.data) {
            arr.push(attr + '=' + settings.data[attr]);
        }
        settings.data = arr.join('&');
        script.src = settings.url + '?' + settings.data;



        //mounting global callback function.
        //后端传回的数据调用这个函数
        window[settings.fnName] = function (data) {
            //clear all script created before
            var scs = document.getElementsByClassName('sc');
            for (var i = 0; i < scs.length; i++) {
                document.head.removeChild(scs[i]);
            }
            //真正的callback调用：
            settings.succ(data);
        };

        var jsonp_script = document.head.appendChild(script);

        jsonp_script.onerror = function () {
            console.log('fail to get the script by the src');
        };
    };
});