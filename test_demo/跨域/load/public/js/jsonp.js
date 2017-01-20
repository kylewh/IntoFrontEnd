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
    // console.log( settings.callback, settings.data)
    //assemble params in settings.data together
    let arr = [];
    for(let attr in settings.data){
        arr.push(attr + '=' + settings.data[attr]);
    }
    settings.data = arr.join('&');
    script.src = settings.url + '?' + settings.data;

    //mounting global function.
    window[settings.fnName] = function(data){
        //clear all script created before
        let scs = document.getElementsByClassName('sc');
        for(let i=0; i<scs.length; i++){
            document.head.removeChild(scs[i]);
        }
        settings.succ(data);
    }

    document.head.appendChild(script);

};