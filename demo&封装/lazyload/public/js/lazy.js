let clock;
checkShow();
$(window).on('scroll', function () {
    //每触发一次就清除上一次触发时建立的定时器
    //保证不触发时有一次定时器执行回调
    if (clock) {
        clearTimeout(clock);
    }
    //滚动触发次数较多，但是由于clock被反复赋值，当不再触发滚动时clock的赋值被覆盖为最后一次的定时器。
    clock = setTimeout(function () {
        checkShow();
    }, 300);
});

function checkShow() {
    let $imgs = $(".container img").not('.loaded');
    console.log(`遍历了${$imgs.length}个未加载的img元素`);
    $.each($imgs, function () {    
        if (isVisible($(this))) {
            load($(this));
        }
    });
}

function isVisible($ele) {
    let wHeight = $(window).height(),
        wScrollTop = $(window).scrollTop(),
        eleOffsetTop = $ele.offset().top,
        eleHeight = $ele.height();
    if (wHeight + wScrollTop > eleOffsetTop && wScrollTop < eleOffsetTop + eleHeight) {
        return true;
    } else {
        return false;
    }
}

function load($ele) {
    $ele.addClass('loaded');
    $ele.attr('src', $ele.attr('data-src'));
}
