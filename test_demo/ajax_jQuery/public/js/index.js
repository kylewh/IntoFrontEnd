let $content = $(".content").eq(0);
let $btn = $('#btn');
let curIndex = 2;

$btn.on('click', function (e) {
    e.preventDefault();
    if ($btn.val('isLoading') === 'true') {
        return;
    }
    //上锁
    $btn.attr('isLoading', true);
    $btn.addClass("loading");
    $btn.text('Loading...');

    $.get("/fetch").success(function (data) {
        for (let i = 0; i < 6; i++) {
            $content.append($('<li></li>').text('mockData ' + (++curIndex)));
        }
        $btn.attr('isLoading', false);
        $btn.removeClass('loading');
        $btn.text('Load More');
    }).error(function () {
        let $errorMsg = $('<span class="error">Opps..we get an error..</span>');

        $errorMsg.appendTo($('body').eq(0)).fadeIn(1000, function () {
            setTimeout(function () {
                $errorMsg.fadeOut(1000);
            }, 1000);
        });
    });

    // 原生AJAX
    // ajax({
    //     url: '/fetch',
    //     type: 'get',
    //     data: {},
    //     dataType: 'json',
    //     succ: function (json) {

    //         for (let i = 0; i < 6; i++) {
    //             let newContent = document.createElement('li');
    //             newContent.innerText = 'mockData ' + (++curIndex);
    //             content.appendChild(newContent);
    //         }
    //         //解锁
    //         btn.setAttribute('isLoading', false);
    //         btn.className = " ";
    //         btn.innerText = 'Load More';
    //     },
    //     fail: function (err) {
    //         console.log(err);
    //     }
    // });
});