define(function (require, exports, module) {
    var render = require('../js/render');
    render('timeout.js required & executed', 'rq');
    module.exports = function (time) {
        var start = +new Date();
        render('start:    ' + new Date(), 'exec');
        while (start + time * 1000 > new Date()) {

        }
        render('finished: ' + new Date(), 'exec');
        render(time + ' second passed, we are finished', 'exec');
    };
});