**1.CSS和JS在网页中的放置顺序是怎样的？**

- CSS一般放置在`<head>`标签里，为保持良好的用户体验，在页面载入时对样式最先进行加载，应该将css置为加载首位，js其次。    
- JS由于其加载的特性：不允许并发加载，加之网页是以显示内容为首要目的，所以应该先让内容完整呈现，再加载js，所以解决方案就是将`script`标签放置在`</body>`前面，位于所有内容的底部。    

---

**2.解释白屏和FOUC**   

先分析**白屏**和**FOUC**的表现形式： 

- 白屏： 用户进入某页面后一段时间内页面空白没有任何内容，随后内容正常显示。    

**这代表html和css在那段空白时间内并没有被渲染**    

- FOUC（Flash of Unstyled Content)：进入页面后先显示没有加载CSS样式的html内容，然后一段时间后页面闪烁后样式出现，内容正常显示。     

**这代表html先渲染，随后CSS加载完毕后渲染**    

另外我们需要知道各厂浏览器的加载渲染机制是有不同的：   

- 以chrome为代表的浏览器，会等待CSS加载并解析完毕后再对页面进行渲染。
- 以firefox为代表的浏览器，会先加载渲染html，随后等待CSS加载解析完毕后对页面进行重绘。（闪烁的原因）    

可见出现后面这种现象的原因是CSS没有优先加载。

而造成对CSS加载解析没有第一时间进行的原因是把样式引入放在了底部，或者使用了`@import`的方式来引入CSS， 将JS放在头部也会导致阻塞后续内容的加载而导致白屏。    

---

**3.async和defer的作用是什么？有什么区别？**    

```
<script type="text/javascript" defer="defer" src="xxxx.js"></script>

<script type="text/javascript" async src="xxxx.js"></script>
```

![](https://ww3.sinaimg.cn/large/006tNbRwjw1fc3tmqp2pbj31kw0k0jui.jpg)

- async： async只适用于外部脚本文件，给script加上这个属性后，告诉浏览器立即下载文件，并且页面不需要等待脚本文件的下载和执行---异步，如果有两个脚本文件都具有async属性，脚本文件出现的先后并不会决定它们的先后**执行**顺序（注意加载和执行的区别）

![](https://ww1.sinaimg.cn/large/006tNbRwjw1fc3tm1iqklj31kw0gb0us.jpg)

- defer： defer同样也不会使脚本文件阻塞页面加载，脚本立即下载，但是会延迟到页面完全解析完毕后再执行。与async的区别在于如果同时有两个脚本文件都有defer属性，它们出现的顺序就是它们执行的顺序，但其实现实里未必会遵循这个顺序。    

![](https://ww2.sinaimg.cn/large/006tNbRwjw1fc3tmbwc5qj31kw0godia.jpg)

---

**4.简述网页的渲染机制**    

1. 对请求回的html进行解析，将标签解析成DOM节点，形成DOM树。
2. 遇到CSS引入，加载，解析，构建CSSROM树
3. 使用style rules将DOM树与CSSROM树合成为render tree
4. 对render tree进行几何布局计算
5. 绘制所有节点---渲染    

---

**5.JavaScript 定义了几种数据类型? 哪些是简单类型?哪些是复杂类型?**    

Javascript一共有6种数据类型：(ES6增加到7种)    

1. Undefined： 只有一个值 undefined
2. Null: 只有一个值 null
3. Boolean: true or false， 这些值叫做falsy value，它们在逻辑判断力会被转换成false： 0，undefined，null，NAN, ""(空字符串), 
4. Number： 十进制，八进制(0-)，十六进制(0x-)， 浮点数（注意浮点数可以进行等式判断）， NaN.
5. String： “”之间的值
6. Object： 基本数据类型&复杂数据类型（function)的组合。

前五种称为简单数据类型，Object称为复杂数据类型，又可以分为3种： 

- 狭义的Object类型
- Function
- Array

---

**6.NaN、undefined、null分别代表什么?**    

NaN(not a number)代表不可运算的数字，尝试对非数字进行数字运算时会产生这个值，它很特殊，自己都不等于自己

```
NaN == NaN // false
```

Undefined代表一个变量没有被赋值，更精确的说法是一个变量存在于作用域里，但是内存地址里没有指向对应基本数据类型值或者复杂类型引用地址。我们可以利用这个特性来检测一个变量是否被声明过，如果一个变量的类型等于undefined，则它已经被声明过。    

Null从逻辑角度来看代表空指针引用，它不指向内存地址里的任何地方，一般如果声明一个变量用来保存对象，可以初始化赋值为null，以此方便检测一个变量是否已经保存了一个对象的引用。    

---

**7.typeof和instanceof的作用和区别?**    

typeof 和 instanceof 都可以用来检测变量的类型，但是typeof在对于复杂数据类型除了function外的检测结果一律是object，无法进一步区分，返回类型名。    
而使用instanceof可以对object类型进行原型检测发现其是否为某特定对象的实例，返回boolean值。   

---

**代码**    

1.完成如下代码判断一个变量是否是数字、字符串、布尔、函数 （难度*）

```
    function isNumber(el){
	  /*个人认为实际使用场景里NaN不列入Number判断之列。*/
		return typeof(el)==="number"||!isNaN(el);
    }
    function isString(el){
	    return typeof(el)==="string";
    }
    function isBoolean(el){
	    return typeof(el)==="boolean";
    }
    function isFunction(el){
	    return typeof(el)==="function";
    }

    var a = 2,
        b = "jirengu",
        c = false;
    alert( isNumber(a) );  //true
    alert( isString(a) );  //false
    alert( isString(b) );  //true
    alert( isBoolean(c) ); //true
    alert( isFunction(a)); //false
    alert( isFunction( isNumber ) ); //true
    
```

2.以下代码的输出结果是?（难度**）   

```
    console.log(1+1); //2
    console.log("2"+"4"); //"24"
    console.log(2+"4");  //“24”
    console.log(+new Date()); // 当前日期调用valueOf()返回的值
    //一元加减操作符对于对象类型先调用valueOf()方法或者toString()，再转换得到的值。
    console.log(+"4"); //4
```

3.以下代码的输出结果是? （难度***）    

```
    var a = 1;
    a+++a; // 1+2 = 3
    typeof a+2; // "number2", typeof优先级比+高
```

4.遍历数组，把数组里的打印数组每一项的平方 （难度**）    

```
    var arr = [3,4,5]
    for( let i = 0 ;i<arr.length: i++ ) {
	    console.log(arr[i]*arr[i]);
    }
    // 输出 9, 16, 25
```

5.遍历 JSON, 打印里面的值 （难度**）    

```
 var obj = {
      name: 'hunger',
      sex: 'male',
      age: 28
    }
    for (let key in obj){
	    console.log( key + ":" + obj[key] );
    }
    // 输出 name: hunger, sex: male, age:28
```

6.下面代码的输出是? 为什么 （难度***）

```
				// var a;
        console.log(a); // undefined
        var a = 1;  // variable promotion
        console.log(a);  // 1
        console.log(b);  // reference error
```