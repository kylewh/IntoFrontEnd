### AJAX 是什么？有什么作用？
AJAX是对Asynchronous Javascript +XML的简写，它的诞生使得向服务器请求额外的数据而不用刷新页面。它的优缺点如下：     

优点：    

- **更新数据而不需要刷新页面**： 它能在不刷新整个页面的前提下与服务器通信维护数据，由于ajax是按照需求请求数据，避免发送那些没有改变的数据。
- **异步通信**： 它与服务器使用异步的方式通信，不会打断用户的操作（卡死页面）。
- **前后端负载平衡**： 可以将后端服务器的一些工作转移给客户端，利用客户端限制的能力来处理，减轻了服务器的负担。
- **数据与呈现分离**： 利于分工，降低前后耦合。

缺点：     

- **浏览器历史记录的遗失**： 在使用AJAX对页面进行改变后，由于并没有刷新页面，没有改变页面的访问历史，当用户想要回到上一个状态时，无法使用浏览器提供的后退。
- **AJAX的安全问题**： AJAX的出现就像建立起了一直通服务器的另一条通道，容易遭受到一些攻击。


### 前后端开发联调需要注意哪些事情？后端接口完成前如何 mock 数据？
 
1.  接口叫什么？接口名称，统一命名，定制规范，甚至拟定命名表。  
2.  接口传什么？数据类型确定，数据大小等限制的确定。
3.  接口的相关参数： 服务器？端口？方法？请求数据的一些限制？
4.  按照上述确认后的版本严格执行

前端人员可以自己使用服务器框架搭建一个模拟服务器环境，比如使用express&nodejs或者使用xampp，更简单的办法是使用server-mock. 在数据的模拟传输与请求查看上，我个人使用的postman也是一个好工具。

### 点击按钮，使用 ajax 获取数据，如何在数据到来之前防止重复点击?

1. 根据交互的形式，如果是使用 点击-请求 的类型，在提交请求后将按钮disable即可。
2. 使用一个全局变量模拟锁:     

```javascript
let AjaxLock = false;
//事件触发下面代码
// ******start*****
if (!AjaxLock){
	AjaxLock = true;
	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4) {
			//do sth
			AjaxLock = false; 
			//当接受完毕请求数据后将锁打开
		}
	}
	//ajax配置
	xhr.send();
} else {
	return;
}
// ******over*****
```

退一步考虑用户体验，如果我们允许用户多次点击，那么实现ajax的防止多次请求的思路则可以变为： 

- 多次请求取最后一次
- 多次请求在一定时限后的请求都被截止
- 取时限前的最后一次
- 多次点击触发下设置定时器，将多化少，多次点击只触发较少次数请求，以一定频率提交
- 两次请求之间必须大于一定时间。


### 封装一个 封装一个 ajax 函数，能通过如下方式调用。后端在本地使用server-mock来 mock 数据

```javascript
function ajax(opts) {
	//默认设置
    let settings = {
        url: '',
        type: 'get',
        data: {},
        dataType: 'json',
        succ: function () {},
        erro: function () {}
    };

    //覆盖默认设置
    for (let attr in opts) {
        settings[attr] = opts[attr];
    }

    //拼接参数
    let arr = [];
    for (let attr in settings.data) {
        arr.push(encodeURIComponent(attr) + '=' + encodeURIComponent(settings.data[attr]));
    }
    //arr.join("&") 就是dataString

    //创建AJAX对象,兼容低版本IE
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    //设置请求完成回调
    if (typeof xhr.onload === 'undefined') {
        xhr.onreadystatechange = ready;
    } else {
        xhr.onload = ready;
    }

    function ready() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                switch (settings.dataType.toLowerCase()) {
                    case "text":
                        settings.succ(xhr.responseText);
                        break;
                    case "json":
                        settings.succ(JSON.parse(xhr.responseText));
                        break;
                    case "xml":
                        settings.succ(xhr.responseXML);
                }
            } else if (xhr.status == 404) {
                settings.fail(xhr.status);
            }
        }
    }
    //判断请求方式
    if (settings['type'].toLowerCase() === 'get') {
        xhr.open('get', settings.url + '?' + settings.data, true);
        xhr.send();
    } else {
        xhr.open(settings.type, settings.url, true);
        xhr.setRequestHeadr('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(arr.join("&"));
    }
}


ajax({
        url: '/hello', 
        type: 'get', 
        data: {}, 
        dataType: 'text', 
        succ: function(ret){
          console.log(ret);
        }, 
        fail: function(err){
          console.log(err);
        }
      })；
      

```


### 实现加载更多的功能，效果范例11，后端在本地使用server-mock来模拟数据
client-side code:

```javascript
let content = document.getElementsByClassName('content')[0];
let btn = document.getElementById('btn');
let curIndex = 2;

btn.addEventListener('click', function (e) {
    e.preventDefault();
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
```

server-side code:

```javascript
const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
    res.send('landing');
});

router.get('/fetch', function (req, res) {
    setTimeout(function () {
        res.send({
            'succ': true
        });
    }, 1000); //模拟拉取数据时间
})

module.exports = router;
```

[项目完整代码](https://github.com/kylewh/IntoFrontEnd/tree/master/test_demo/load)

效果：![](https://ww4.sinaimg.cn/large/006y8lVagy1fbwkoe7mzkg30yb0nd79s.gif)




