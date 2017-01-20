let content = document.getElementsByClassName('content')[0];
let btn = document.getElementById('btn');
let curIndex = 2;




btn.addEventListener('click', function (e) {
    e.preventDefault();


    //jsonp
    jsonp({
        url: 'http://b.kylewh.com:3000/getSth',
        data: {},
        callback: 'cb',
        succ: function (data) {
            console.log(data);
        }
    });

    //CORS
    ajax({
        url: 'http://b.kylewh.com:3000/cors',
        type: 'get',
        data: {},
        dataType: 'text',
        succ: function (json) {
            console.log(json);
        },
        fail: function (err) {
            console.log(err);
        }
    });

    if (btn.getAttribute('isLoading') === 'true') {
        return;
    }
    //上锁
    btn.setAttribute('isLoading', true);
    btn.className = "loading ";
    btn.innerText = 'Loading...';

    ajax({
        url: '/fetch',
        type: 'get',
        data: {},
        dataType: 'json',
        succ: function (json) {

            for (let i = 0; i < 6; i++) {
                let newContent = document.createElement('li');
                newContent.innerText = 'mockData ' + (++curIndex);
                content.appendChild(newContent);
            }
            //解锁
            btn.setAttribute('isLoading', false);
            btn.className = " ";
            btn.innerText = 'Load More';
        },
        fail: function (err) {
            console.log(err);
        }
    });
});