let pageIndex = 0; //pagination 
let isOver = false; //check remaining data.
let isArrived = true; //scroll trigger locker.


getNews();


$(window).on('scroll', function () {
    if (checkMoreNews()) {
        getNews();
    }
});


function checkMoreNews() {
    return (isVisible($('#checkMark')) && !isOver && isArrived);
}

function getNews() {
    isArrived = false;
    $.get('/getNews', {
            page: pageIndex
        })
        .done(function (msg) {
            if (msg.succ === 1) {
                isArrived = true;
                pageIndex++;
                appendNews(msg.data);
                //if the window are not filled with full of news, get more news.
                if (checkMoreNews()) {
                    getNews();
                }
            } else {
                alert("server error");
            }
        })
        .fail(function () {
            let $errorMsg = $('<span class="error">Opps..we get an error..</span>');

            $errorMsg.appendTo($('body').eq(0)).fadeIn(1000, function () {
                setTimeout(function () {
                    $errorMsg.fadeOut(1000);
                }, 1000);
            });
        });
}

function isVisible($ele) {
    let wHeight = $(window).height(),
        wScrollTop = $(window).scrollTop(),
        eleOffsetTop = $ele.offset().top,
        eleHeight = $ele.height();

    //判断元素是否在窗口可视区    
    if (wHeight + wScrollTop > eleOffsetTop && wScrollTop < eleOffsetTop + eleHeight) {
        return true;
    } else {
        return false;
    }
}


function appendNews(newsSend) {
    let $news = $('.news').eq(0);

    if (newsSend.length === 0) {
        isOver = true;
        $('<span class="no-data">没有更多新闻了</span>').appendTo($news);
        $('.no-data').eq(0).fadeOut(1500, function () {
            isOver = false;
            $('.no-data').eq(0).remove();
        });
        return;
    }
    $.each(newsSend, function () {
        let newsAppend = `
                    <li class="item clearfix">
                        <a href="${this.link}" class="link">
                            <img src="${this.img}">
                            <h4 class="title">${this.title}</h4>
                            <p class="brif">${this.brif}</p>
                        </a>
                    </li>
                    `;
        $(newsAppend).appendTo($news);
    })


}