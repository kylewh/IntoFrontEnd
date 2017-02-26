requirejs.config({
    baseurl: "./js",
    paths: {
        "jquery": "./lib/jquery-3.1.1.min"
    }
});

requirejs(['app/index']);