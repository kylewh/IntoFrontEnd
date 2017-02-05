carousel($('.carousel'));

/*
    轮播激活，传入轮播主体(ul.carousel)
*/
function carousel($carousel) {
    
    let size = $carousel.children().length,
        $imgList = $carousel.children(),
        $firstImg = $carousel.children().first(),
        $lastImg = $carousel.children().last(),
        $imgWidth = $lastImg.width(),
        $thumbnail = $('.thumbnail');

    let $preBtn = $('.pre').eq(0),
        $nextBtn = $('.next').eq(0),
        isClick = false, //click trriger locker
        pageIndex = 0, // page tracer
        clock; //timer for autoPlay

    //让第一张显示
    $imgList.eq(pageIndex).show();


    //激活自动轮播
    autoPlay();

    // 前后翻页按钮事件绑定
    $('.btn').on('click', function (e) {
        e.preventDefault();
        if (!isClick) {
            
            isClick = true;
            if ($(this).hasClass('pre')) {
                play('pre');
            } else if ($(this).hasClass('next')) {
                play('next');
            }
        }
    });

    // 预览图跳转事件绑定
    $thumbnail.children().on('click', function () {
        let targetIndex = $(this).index();
        play(targetIndex);
    });

    /*
        轮播运动函数
        1. Jump Mode: 点击预览图导航，目标图片显示
        2. One Step Mode: 点击前后切换按钮，向前/后淡入一张
    */
    function play() {
        // Jump Mode
        if (typeof arguments[0] === 'number') {
            let targetIndex = arguments[0];
            lastOut_NextIn(targetIndex);
        }
        // One Step Mode
        if (typeof arguments[0] === 'string') {
            let dir = arguments[0];
            if (dir === "next") {
                lastOut_NextIn((pageIndex + 1) % size);
            } else if (dir === "pre") {
                lastOut_NextIn((pageIndex + size - 1) % size);
            }
        }
    }

    /*
        当前图片淡出，目标图片淡入
    */
    function lastOut_NextIn(nextIndex) {

        //停止定时器，防止自动轮播与当前人为触发切换过程冲突
        stopAuto(); 

        $imgList.eq(pageIndex).fadeOut(500);
        $imgList.eq(nextIndex).fadeIn(500, function () {
            isClick = false;
            pageIndex = nextIndex;
            setThumb();

            //完成所有行为后再激活自动轮播。
            autoPlay(); 
        });

    }

    /*
        预览图同步定位
    */
    function setThumb() {
        $thumbnail.children().removeClass('active').eq(pageIndex).addClass('active');
    }

    function autoPlay(dir) {
        dir = dir || 'next';
        clock = setInterval(function () {
            play(dir);
        }, 2000);
    }

    function stopAuto() {
        clearInterval(clock);
    }
}