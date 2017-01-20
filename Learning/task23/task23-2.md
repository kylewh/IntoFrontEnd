### 什么是同源策略？
同源策略是浏览器出于安全性的考量而制定的策略，默认情况下，XHR对象只能访问与包含它的页面位于同一个域中的资源，即限制了来自不同源的"document"或脚本对当前"document"读取或设置某些属性。通俗点理解就是在你家地址下，也就是你家里，你可以随心所欲，但你不能动别人家的东西，同理住在别的地址下的另外一个人，它也不能对你家的任何东西做任何事，本质上是所有权的权限问题。  
   
安全考量： 举个例子，如果你获取了某网站的URL，你可以对其页面上的所有信息进行读取，比如账号密码，这就成了严重的隐私泄露。   

我们知道URL(document.URL)由协议(http/https/file/ftp)、域名(doucment.domain)、端口(port:3000/4000/80/8080)、还有路径组成，如果两个URL的协议、域名、端口(URL组成部分前3个）相同，则表示他们同源。     

比如：  

- `a.b.com`,`a.b.com/a.html` 同源，域相同。
- `b.com`, `a.b.com` 不同源，域不同，前者的域更”窄“。
- `a.b.com:8080`, `a.b.com/3000` 不同源，端口不同。
- `http://a.b.com`, `https://a.b.com` 不同源，协议不同。

### 什么是跨域？跨域有几种实现形式？
跨域顾名思义就是突破同源策略的限制，去不同的域下访问数据。     
主要有如下几种实现形式：    

- jsonp
- CORS：跨域资源共享（Cross-Origin Resource Sharing）
- 降域
- postMessage()

### JSONP 的原理是什么?
我们会发现在html下引入外界地址的script标签是可行的，比如各种框架。那么也就是说同源策略并没有对script的src进行监测，而且script的特性是在页面加载时会访问script的src，那么我们可以将这个src想象成一个简单的get请求，通过访问这个地址，我们可以配合后端对路由进行参数配置，使这段访问的src中加入一些参数，从而灵活的从后端调取数据。我们甚至可以通过访问这个src来调用客户端里存在的方法，比如我们有一个function: 

```javascript
//client-side
//URL : http://b.xx.com:3000/
function jsonFn(param) { //do sth with param passed in.}

<script src='http://a.xx.com:3000/getSth?callback=jsonFn></script> //与前面的jsonFn对应，注意先后顺序以防报错: jsonFn is not defined.

//server-side - routes 
app.get("/getSth", function(){
	let data = req.query.callback + '(param)' ;//提取问号后callback键值对儿的值并加工成函数调用形式的字符串。
	res.send(data);
});
```

此时我们可以发现传回的data刚好就是对我们客户端里定义的函数jsonFn的带参数调用，这样就实现了跨域访问，且对页面进行操作。

### CORS是什么？
CORS全称Cross-Origin Resource Sharing，定义了在必须访问跨域资源时，浏览器与服务器要如何沟通。原理是使用自定义的的HTTP头部让浏览器与服务器沟通，从而决定请求或相应是否成功。比如在发送一个简单的get请求时，需要给它附加一个额外的origin头部，其中包含请求页面的源信息，以便让服务器根据这个头部信息决定是否给予响应。      
比如发送了一个origin头部：     
`Origin: http://www.kylewh.com`     
如果服务器(后端）认为这个请求可以接受，就在Access-Control-Allow-Origin头部中发回相同的源信息：    
`Access-Control-Allow-Origin: http://www.kylewh.com(与请求相同)`     

### 三种以上跨域的解决方式的演示

#### JSONP && CORS

```javascript
//client-side code:
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
//Page url: http://b.kylewh.com:3000/
ajax({
    url: 'http://a.kylewh.com:3000/cors', //和当页url不同域
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
```

```javascript
//server-side code:
//jsonp
router.get('/getSth', function (req, res) {
    let cb = req.query.cb;
    // so cb is defined here, and in client-side, callback's value must be the same.
    console.log(req.query);
    res.send( cb + '("JSONP: Crossing")'); //如果控制台打出这句话证明jsonp请求成功且调用函数成功。
})

//CORS
router.get('/cors', function(req, res){
    res.header("Access-Control-Allow-Origin", "http://b.kylewh.com:3000/"); //给予请求来源页的url权限
	//res.header("Access-Control-Allow-Origin", "*"); 
    res.send('CORS:Crossing');//如果控制台打出这句话证明CORS请求成功
})

```

效果： 
![](https://ww2.sinaimg.cn/large/006y8lVagy1fbx34ghi8jg30sa0eiq3r.gif)

[项目地址,查看细节code](https://github.com/kylewh/IntoFrontEnd/tree/master/test_demo/%E8%B7%A8%E5%9F%9F/load)

#### 降域 && postMessage

```
两个页面不同域，但是它们的父域之上都相同(端口)，那么可以使用降域的方法
如a.html 的url为 a.kylewh.com:8080/a.html;
a.html 的url为 b.kylewh.com:8080/b.html;
那么将二者都使用document.domaim = 'kylewh.com';
即可使二者之间进行跨域。
```

```
postMessage的原理是会向另一个地方发送信息，另一个地方通常是iframe,或者是由当前页面弹出的窗口。参数是：信息以及表示接受消息方的来自哪个域的字符串，如果给定*便是不限定接受者的域。
所以在一个html中嵌入另一个html文件的iframe，并且互相发送postMessage并响应在input框以此来观察效果。
```

效果： 
![](https://ww1.sinaimg.cn/large/006y8lVagy1fbx3eanskqg30r209kwfl.gif)

[项目地址,查看细节code](https://github.com/kylewh/IntoFrontEnd/tree/master/test_demo/%E8%B7%A8%E5%9F%9F)





