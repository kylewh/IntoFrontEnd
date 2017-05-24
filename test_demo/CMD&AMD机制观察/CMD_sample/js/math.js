define(function(require, exports, module){
    var render = require('../js/render');
    render('math.js required & executed', 'rq');
    var math = (function(){
        function increment (num) {
            render('increment executed...', 'exec');
            num++;
            render('result is ' + num);
            return num;
        }

        function reducement (num) {
            render('reducement executed...', 'exec');
            num--;
            render('result is ' + num, 'exec');
            return num;
        }

        return {
            increment:  increment,
            reducement: reducement
        };
    })();
    
    module.exports = math;
});