define('app/index', ['jquery', 'tools/carousel', 'tools/goTop', 'tools/jsonp', 'tools/loadTrigger', 'tools/waterFall'],
    function ($, Carousel, GoTop, jsonp, LoadTrigger, WaterFall) {
        var jsonp_param = {
            url: 'https://platform.sina.com.cn/slide/album_tech',
            data: {
                app_key: '1271687855',
                num: 10,
                page: 2
            },
            callback: 'jsoncallback',
            succ: loadAndPlace
        };

        //initialize
        Carousel.init($('.carousel-ct').eq(0));
        LoadTrigger.init($('.waterfall-ct > .news-ct'), $('.waterfall-ct > .trigger'), 'click', jsonp, jsonp_param);
        LoadTrigger.init($('.timeline > li'), $('.timeline > li').not('.loaded'), 'scroll', loadImg);
        LoadTrigger.init($('section .container'), $('section .container>h4'), 'scroll', loadTab);
        GoTop.init($('body').eq(0), $('body,html'), 400);


        //nav-bar btn switch
        $(".nav-list li").on('click', function (e) {
            $(".nav-list li").removeClass('active');
            $(this).addClass('active');
        })

        // jsonpLoad callback function part
        function loadAndPlace(Data, $ct, $eleSelector) {
            if (Data && Data.status && Data.status.code === "0") {
                place(Data.data);
            } else {
                errorFlash();
            }
        }

        function place(arrData) {
            var $nodes = $(itemMaker(arrData));
            $('.news-ct').eq(0).append($nodes);

            var imgLoadNum = 0;
            $(".item img").on('load', function () {
                if (imgLoadNum === $nodes.length - 1) {
                    WaterFall.init($('.news-ct').eq(0));
                } else {
                    imgLoadNum++;
                }
            });
        }

        function itemMaker(arrData) {
            var newsStr = [];
            for (var i = 0; i < arrData.length; i++) {
                var tpl = [
                    ['<li class="item">'],
                    ['<a href="'],
                    [arrData[i].url],
                    ['">'],
                    ['<img src="'],
                    [arrData[i].img_url],
                    ['" alt="'],
                    [arrData[i].name],
                    ['">'],
                    ['</a>'],
                    ['<h4 class="header">'],
                    [arrData[i].short_name],
                    ['</h4>'],
                    ['<p class="des">'],
                    [arrData[i].short_intro],
                    ['</p>'],
                    ['</li>']
                ].join('');
                newsStr.push(tpl);
            }
            return newsStr.join('');
        }

        // layzLoad callback function part
        function loadImg($ele) {
            $ele.find('img').eq(0).attr('src', $ele.find('img').eq(0).attr('data-src'));
            $ele.addClass('loaded');
            $ele.css("opacity", 1);
        }

        function loadTab($ele) {
            $('.nav-list > li').removeClass('active');
            $('.nav-list > li').eq($('section .container>h4').index($ele)).addClass('active');
        }
    });