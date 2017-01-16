### DOM0事件和DOM2级在事件监听使用方式上有什么区别？
DOM0事件的添加形式为： 

```javascript
let btn = document.getElementById("myBtn");
btn.onclick = function(){
	//do sth...
	console.log(this); // myBtn
}
// 事件以'on'开头，如onmouseover, onmouseout等
```

使用DOM0级方法指定的事件处理程序被认为是元素的方法，此时事件处理程序是在元素的作用域里中运行，所以此时this指向的是元素本身。而且这种添加方式的缺陷是，只能存在一个处理程序，如果再次向同一个元素添加另外一个处理程序，上一个处理程序会被覆盖。

DOM2级别事件监听使用的方法为：

```javascript
let btn = document.getElementById("myBtn");
btn.addEventListener("事件名", function(){
	//do sth...
	console.log(this); // myBtn
});
```

这样的添加方式比起DOM0级更灵活，它可以给一个同一个元素添加多个处理事件。同时它的this也同样指向元素本身。

### attachEvent与addEventListener的区别？
attachEvent()是IE的事件处理程序，它与addEventListener的主要区别在于以下几点：

- 事件名：attachEvent的事件名与DOM0级事件名一样，都是在具体事件前加上了on；而addEventListener的事件名去掉了on.
- 作用域：在attachEvent的事件处理程序中，它的作用域是全局作用域，this等于window； 而在addEventListener里事件处理程序的作用域是元素的作用域，this等于元素本身。
- 事件处理程序执行顺序：通过attachEvent给某元素添加多个对于同一事件的处理程序时，它们的执行顺序是按照最后添加的先执行； 对于addEventListener的事件处理程序则是按照添加顺序执行。


### 解释IE事件冒泡和DOM2事件传播机制？

IE事件冒泡的流程是，当监测到一个事件发生时，事件会从目标元素开始向父级传递，直到传递到window（document）停止。这期间，如果遇到同样的事件，都会激活对应的事件处理程序。      

而DOM2的时间传播机制包括了事件冒泡机制作为事件传播的第三阶段，并且加入了第一阶段：事件捕获，即与冒泡机制相反，侦听到事件时，事件先从document开始再到子元素一层层直到目标元素。第二阶段： 处于目标阶段，此时事件在div上发生，被看做冒泡的一部分。     

由于兼容性的问题，我们可以尽量将在事件添加时为其指定传播机制为冒泡传递。     

考虑如下代码：

```javascript
/* html 
<div>
	<ul>
		<li>1</li>
		<li>2</li>
	</ul>
</div>
*/
let olis = document.getElementsByTagName('li');
for(let i=0; i<olis.length; i++){
	olis.addEventListener('click',function(){
		console.log('li was clicked');
	});
}
```
![](https://ww1.sinaimg.cn/large/006tNc79gw1fbstin2s79j30u00qotcl.jpg)


### 如何阻止事件冒泡？ 如何阻止默认事件？

兼容DOM的浏览器会将一个event对象传入事件处理程序中，这个event对象包含一个stopPropagation()方法，可以组织事件的进一步捕获或冒泡（取决于添加时的参数）。并且包含一个preventDefault()方法，可以取消事件的默认行为。（在事件处理程序里使用return false也可以）      

对于IE来说，它的event对象具有cancelBubble属性，默认值为false，设置为true用来取消事件冒泡； 还有returnValue，默认值为true，设置为false用来取消事件的默认行为。


### 代码1：有如下代码，要求当点击每一个元素li时控制台展示该元素的文本内容。不考虑兼容     

```html
<ul class="ct">
    <li>这里是</li>
    <li>饥人谷</li>
    <li>前端6班</li>
</ul>
<script>
let oList = document.getElementsByClassName('ct')[0];
oList.addEventListener('click',function(e){
	if(e.target.tagName.toLowerCase() === 'li'){
		console.log(e.target.innerText);
	}
}
</script>
```

[在线demo](http://js.jirengu.com/rolo/2/edit?html,console)

### 代码2： 补全代码，要求：

- 当点击按钮开头添加时在`<li>这里是</li>`元素前添加一个新元素，内容为用户输入的非空字符串；当点击结尾添加时在最后一个 li 元素后添加用户输入的非空字符串.
- 当点击每一个元素li时控制台展示该元素的文本内容。

```html
<ul class="ct">
    <li>这里是</li>
    <li>饥人谷</li>
    <li>任务班</li>
</ul>
<input class="ipt-add-content" placeholder="添加内容"/>
<button id="btn-add-start">开头添加</button>
<button id="btn-add-end">结尾添加</button>
<script>
let olist = document.getElementsByClassName('ct')[0],
		text = document.getElementsByClassName('ipt-add-content')[0],
		btnStart = document.getElementById('btn-add-start'),
		btnEnd = document.getElementById('btn-add-end');

	olist.addEventListener('click', function(e){
		if(e.target.tagName.toLowerCase() === 'li'){
			console.log( e.target.innerText );
		}
	});
	btnStart.addEventListener('click',function(e){
		if(!text.value){
			alert('You must enter the content!');
			return;
		}
		let newLi = document.createElement('li');
		newLi.innerText = text.value;
		olist.insertBefore(newLi, olist.firstElementChild);
		text.value = '';
	});
	btnEnd.addEventListener('click',function(e){
		if(!text.value){
			alert('You must enter the content!');
			return;
		}
		let newLi = document.createElement('li');
		newLi.innerText = text.value;
		olist.appendChild(newLi);
		text.value = '';
	});
</script>
```

[在线demo](http://js.jirengu.com/ripe/1/edit?html,console,output)

### 代码3：补全代码，要求：当鼠标放置在li元素上，会在img-preview里展示当前li元素的data-img对应的图片。

```html
<ul class="ct">
    <li data-img="1.png">鼠标放置查看图片1</li>
    <li data-img="2.png">鼠标放置查看图片2</li>
    <li data-img="3.png">鼠标放置查看图片3</li>
</ul>
<div class="img-preview"></div>
<script>
	let uList = document.getElementsByClassName('ct')[0],
		preview = document.getElementsByClassName('img-preview')[0];

	uList.addEventListener('mouseover', function(e){
		if(e.target.tagName.toLowerCase() === 'li'){
			let image = document.createElement('img');
			image.src = e.target.dataset.img;
			preview.appendChild(image);
		}
	});
	uList.addEventListener('mouseout', function(e){
		if(e.target.tagName.toLowerCase() === 'li'){
			preview.innerHTML = '';
		}
	});
</script>
```

[在线demo](http://js.jirengu.com/ripe/1/edit?html,output)