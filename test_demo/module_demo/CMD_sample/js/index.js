define(function (require, exports, module) {
    var render = require('../js/render');
    render('index.js required & executed', 'rq');
    var math = require('../js/math');
    math.increment(0);
    math.reducement(0);
    var timeout = require('../js/timeout');
    timeout(2);
});