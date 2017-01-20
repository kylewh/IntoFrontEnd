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
    console.log(req.query);
    res.send( cb + '("JSONP: Crossing")');

})

//CORS
router.get('/cors', function(req, res){
    res.header("Access-Control-Allow-Origin", "http://b.kylewh.com:3000/cors"); 
	//res.header("Access-Control-Allow-Origin", "*"); 
    res.send('CORS:Crossing');
})

module.exports = router;