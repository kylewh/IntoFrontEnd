define('timeout', ['render'], function(render){
    render('timeout.js required & executed ', 'rq');
    return function (time) {
        var start = +new Date();
        render('start:    ' + new Date(), 'exec');
        while(start + time*1000 > new Date()) {
            
        }
        render('finished: ' + new Date(), 'exec');
        render(time + ' second passed, we are finished', 'exec');
    };
});