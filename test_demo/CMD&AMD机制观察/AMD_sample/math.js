define('math', ['render'], function(render){
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
            render('result is ' + num);
            return num;
        }

        return {
            increment:  increment,
            reducement: reducement
        };
    })();
    
    return math;
});