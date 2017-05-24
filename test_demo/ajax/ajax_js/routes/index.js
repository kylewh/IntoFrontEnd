const express = require("express");
const router = express.Router();

/** Data */
// 为了方便看代码，直接hardcode在这里
const fakeDB = {
  count: 1
};

const tmpl = data => `mockData ${data}`;

const composeData = (base, count) =>
  [...Array(count).keys(count)].map((val, idx) => tmpl(val + base));

/** Router */
router.get("/", function(req, res) {
  res.send("landing");
});

router.get("/fetch", function(req, res) {
  const { count } = req.query;
  const reqCount = parseInt(count);
  setTimeout(function() {
    res.send({
      result: composeData(fakeDB.count, reqCount)
    });
    fakeDB.count += reqCount;
  }, (Math.random() + 1) * 1000); // 模拟拉取数据时间
});

module.exports = router;
