define('index', ['require', 'math', 'timeout', 'render'], function(require){
    var render = require('render');
    render('index.js required & executed', 'rq');
    var math = require('math');
    var timeout = require('timeout');
    math.increment(0);
    math.reducement(0);
    timeout(2);
});