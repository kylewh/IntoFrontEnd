﻿const express           = require('express');
const app               = express();
const cookieParser      = require('cookie-parser');
const bodyParser        = require("body-parser");
const expressSanitizer  = require("express-sanitizer");
const passport          = require('passport');
const session           = require('express-session');
const flash             = require('connect-flash');
const methodOverride    = require("method-override");
const configRoutes      = require("./routes");

/*
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) { 
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};
*/


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(session({ secret: 'a',
                  resave: false,
                  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/init')(passport);//passport configuration file
require('./routes/index.js')(app, passport);

configRoutes(app);



// ------------------------------------------
// Listen to your server;
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});