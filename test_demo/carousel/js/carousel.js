carousel($('.carousel'));

/*
    轮播激活，传入轮播主体(ul.carousel)

    method: 
    spliceImg
    play
    thumbnail
*/
function carousel($carousel) {
    let oldLength = $carousel.children().length,
        $firstImg = $carousel.children().first(),
        $lastImg = $carousel.children().last(),
        $imgWidth = $lastImg.width(),
        $thumbnail = $('.thumbnail');

    //拼接加工
    spliceImg($carousel, $firstImg, $lastImg, oldLength);

    //调整位置至第一张
    $carousel.css("left", "-1000px");

    let $preBtn = $('.pre').eq(0),
        $nextBtn = $('.next').eq(0),
        isClick = false, //click trriger locker
        pageIndex = 0; // page tracer

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

    $thumbnail.children().on('click', function () {
        let curIndex = $(this).index();
        play('', pageIndex, curIndex);
    })

    /* 
        ====    拼接加工   ====
        1.将尾部拷贝，插入头部之前
        2.将头部拷贝，插入尾部之后
    */
    function spliceImg($carousel, $first, $last, oldLength) {
        let copy_$first = $first.clone(),
            copy_$last = $last.clone();

        $carousel.css('width', $firstImg.width() * (oldLength + 2));
        $carousel.prepend(copy_$last);
        $carousel.append(copy_$first);
    }

    /*
        ====   轮播运动函数   ====
        1. Jump Mode: 点击预览图导航，滑动至目标图片
        2. One Step Mode: 点击前后切换按钮，向前/后滑动一张
    */
    function play(dir, curIndex, targetIndex) {
        let dif;
        //判断方向（左右）(pre/next)
        switch (dir) {
            case 'pre':
                dif = '+';
                break;
            case 'next':
                dif = "-";
                break;
        }

        // ----   Jump Mode   ----

        // 当传入dir的参数为空(空字符串而非不传入)，且后两个索引参数都传入时，进入跳跃模式
        if ((typeof curIndex !== undefined && typeof targetIndex !== undefined) && !dir) {
            let indexDif = targetIndex - curIndex;
            $carousel.animate({
                left: `-=${$imgWidth*indexDif}`
            }, function () {
                pageIndex += indexDif;
                console.log(`这是轮播的第${pageIndex+1}张图`);
                thumbnail(pageIndex);
            });
        } else {

        // ----   One Step Mode   ----

            $carousel.animate({
                left: dif + `=${$imgWidth}`
            }, function () {

                //动画执行完毕，开锁
                isClick = false; 
                
                //差值符号判定
                if (dif === '+') {
                    pageIndex--;
                } else if (dif === '-') {
                    pageIndex++;
                }

            //判断当前页面索引，边界调整
                
                //越过下边界，索引置为上边界，位置回到第一张
                if (pageIndex === oldLength) {
                    $carousel.css({
                        left: -$imgWidth
                    });
                    pageIndex = 0;
                }
                
                //越过上边界，索引置为下边界，位置回到最后一张
                if (pageIndex === -1) {
                    $carousel.css({
                        left: -oldLength * $imgWidth
                    });
                    pageIndex = oldLength - 1;
                }
                console.log(`这是轮播的第${pageIndex+1}张图`);
                
                //导航同步
                thumbnail(pageIndex);
 
            });
        }

        /*
            预览图同步
        */
        function thumbnail(index) {
            $thumbnail.children().removeClass('active');
            $thumbnail.children().eq(index).addClass('active');
        }
    }


}