const express = require('express');
const app = express();


const indexRoutes = require("./routes/index");


app.use(express.static("public"));

app.use('/', indexRoutes);

app.listen(3000, function () {
    console.log('we\'ve got a server.');
})