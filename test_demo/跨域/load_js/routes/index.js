const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
    res.send('landing');
});

router.get('/fetch', function (req, res) {
    setTimeout(function () {
        res.send({
            'succ': true
        });
    }, 1000); //模拟拉取数据时间
})

//jsonp
router.get('/getSth', function (req, res) {
    let cb = req.query.cb;
    console.log( req.query.cb);
    //调用callback函数，服务端发送数据
    //cb相当于键值对里的值jsonp_1486116155000（时间戳，用于创造长函数名，防止冲突）
    //括号里为传入的数据
    let obj = {
        re1baby: 'mua',
        wenhao: 'hahaha'
    };

    res.send( cb + '(' + JSON.stringify(obj) + ')');

})

//CORS
router.get('/cors', function(req, res){
    res.header("Access-Control-Allow-Origin", "http://a.kylewh.com:3000"); 
	//res.header("Access-Control-Allow-Origin", "*"); 
    res.send('CORS:Crossing');
})

module.exports = router;