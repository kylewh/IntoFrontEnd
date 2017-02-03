function ajax(opts) {
    let settings = {
        url: '',
        type: 'get',
        data: {},
        dataType: 'json',
        succ: function () {},
        erro: function () {}
    };

    //覆盖默认设置
    for (let attr in opts) {
        settings[attr] = opts[attr];
    }

    //拼接参数
    let arr = [];
    for (let attr in settings.data) {
        arr.push(attr + '=' + settings.data[attr]);
    }
    settings.data = arr.join("&");
    //arr.join("&") 就是dataString

    //创建AJAX对象,兼容低版本IE
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    //设置请求完成回调
    if (typeof xhr.onload === 'undefined') {
        xhr.onreadystatechange = ready;
    } else {
        xhr.onload = ready;
    }

    function ready() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                switch (settings.dataType.toLowerCase()) {
                    case "text":
                        settings.succ(xhr.responseText);
                        break;
                    case "json":
                        settings.succ(JSON.parse(xhr.responseText));
                        break;
                    case "xml":
                        settings.succ(xhr.responseXML);
                }
            } else if (xhr.status == 404) {
                settings.fail(xhr.status);
            }
        }
    }
    //判断请求方式
    if (settings['type'].toLowerCase() === 'get') {
        if(settings.data){
            xhr.open('get', settings.url + '?' + settings.data, true);
        }else{
            xhr.open('get', settings.url, true);
        }
        xhr.send();
    } else {
        xhr.open(settings.type, settings.url, true);
        xhr.setRequestHeadr('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(settings.data);
    }
}