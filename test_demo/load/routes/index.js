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

module.exports = router;