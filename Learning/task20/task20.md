### 什么是闭包？有什么用？
闭包广义上来说就是一个函数，这个函数具有“记忆”自己被创建出来时的“环境”。试想如果我们在全局作用域下创建一个函数：     

```javascript
var a,b,c,d;

function createdFn(){ 
	// We just created a function.
}

function existedFn() {
	//I have been there for a while.
}
```

那么对于这个函数`createdFn`来说，它被创建时的环境我们可以这样描述：我出生的地方那里四个变量abcd，还有一个函数`existedFn`，还有全局对象.... 尽管这不够精确，还有其他的一些东西。 但是这已经足够让我们理解闭包中的“环境”， 究其根本我们讨论“环境”时，讲的便是`作用域`。      

根据前面的定义，闭包是一个函数，那么现在显然我们并没有这样一个函数。

> 其实我们可以这样去理解： javascript的一切都是对象 -> function 本质也是一个对象，对象某些情况下也是函数 -> 全局对象就是这个函数，它保存了一切全局环境，也便保存了在它本身上创建出来的函数的“出生环境”。这样说是欠缺严谨的，但是有助于我们以类比的思维去统一对闭包这个概念的发散理解。

那么，我们来做点什么，来使现况更满足对闭包的描述： 

```javascript
function closureWrapper () {
	let a = 1;
	return function closureFn(){
		return a++;
	}
}

let closure = closureWrapper();
console.log( typeof closure); //function
console.log( closure ); //function closureFn(){....}
console.log( closureWrapper()() ); //2
```

现在`closure`这个变量便是一个函数，这个函数是`closureWrapper`的内部函数，而且`closure`返回了它父函数的变量。现在这个过程相当于： 我们可以在`closureWrapper`的外部访问它的内部变量，这已经比较满足我们的描述了，`a`被执行`++a`后返回出来的确是2，但是，我们怎么去清楚的观察到**“记忆”**这个的行为？       

```javascript
function closureWrapper (a) {
    //变量提升: let a;
    return function closureFn(){
        a++;
        return a;
    }
}

let closure = closureWrapper(0);
console.log( closure() ); //1
console.log( closure() ); //2
```

现在我们惊人的发现，在每一次执行`closure()`后都会返回比前一次执行大1的值，这就说明，`closure`这个变量所代表的`closureFn()`函数并没有像平时的函数执行后便被销毁，而是一直存在着，甚至它依然能接触到它的父函数里的变量！这是因为我们使用变量保存了这个函数，我们知道函数是一个引用对象，在内存的回收机制里，凡是一个对象（这里我们指函数）身上存在对于它的引用，且保存这个引用的变量一直存在，那么内存就不会回收它（学过java的人应该对此很熟悉）。所以这就是记忆的来源： 引用的未回收，生命周期被延长为与保存引用的变量相同。    

为了方便理解，我们再换一个图，让这个过程变的更直观：     

![](https://ww2.sinaimg.cn/large/006tKfTcgw1fbmunva9jnj30hh0fxq3x.jpg)

可见闭包的威力在于： 突破作用域访问限制，从外部访问函数内部变量。可以将closure这个变量想象成一根针，它可以刺破作用域保护膜，但是需要这个作用域内部的函数跟它**”里应外合“**。    

###setTimeout 0 有什么作用？###
本身setTimeout的设计意图是：延迟一段时间做某事。 那么当我们把延迟这段时间设为0时，如果结果是没有任何不同，那这样便是违背了它的意图：**延迟**，事实上设为0时，所以指定的代码或者函数将会被最后执行，相当于在单线程的javascript执行线路里，将它push到了队尾。我们可以做一个测试：     

```javascript
let a = 1;
setTimeout(function(){
    console.log('before a = 100, a is ', a);
    a = 100;
    console.log('after a = 100, a is ', a);
},0);
console.log("我会先执行哦", a);
```

![](https://ww3.sinaimg.cn/large/006tKfTcgw1fbmv2qr6oqj30ps03qmxu.jpg)

很明显，对于a的赋值100的操作是在执行了最下方的console.log后再执行的。

###代码

下面的代码输出多少？修改代码让fnArr[i]() 输出 i。使用两种以上的方法

```javascript
    var fnArr = [];
    for (var i = 0; i < 10; i ++) {
        fnArr[i] =  function(){
            return i;
        };
    }
    console.log( fnArr[3]() );  //输出10，执行的时候i等于10，所以整个数组元素执行后都会是10
```

法一： 

```javascript
    var fnArr = [];
    for (var i = 0; i < 10; i ++) {
        (function(i){
            fnArr[i] = function(){
                return i;
            }
        })(i);
    }
	console.log( fnArr[3]() );  //3
```

法二：

```javascript
	var fnArr = [];
	for (var i = 0; i < 10; i ++) {
		fnArr[i] =  (function(i){ //IIFE & 闭包
			return function(){
				return i;
			}
		})(i);
	}
	console.log( fnArr[3]() );  //3
```

法三：    

```javascript
    var fnArr = [];
    for (let i = 0; i < 10; i ++) { //使用ES6： let
        fnArr[i] =  function(){
            return i;
        };
    }
    console.log( fnArr[3]() );  
```

使用闭包封装一个汽车对象，可以通过如下方式获取汽车状态:

```javascript
var Car = (function () {
    let speed = 0;
    function setSpeed(s){
        return speed = s;
    }
    function getSpeed(){
        return speed;
    }
    function accelerate(){
        return speed+=10;
    }
    function decelerate(){ //速度不能为负数
        return speed>0?speed-=10:speed;
    }
    function getStatus(){
        return speed>0?'running':'stop';
    }
    return {
        "setSpeed"   : setSpeed,
        "getSpeed"   : getSpeed,
        "accelerate" : accelerate,
        "decelerate" : decelerate,
        "getStatus"  : getStatus
    }
})();


Car.setSpeed(30);
Car.getSpeed(); //30
Car.accelerate();
Car.getSpeed(); //40;
Car.decelerate();
Car.decelerate();
Car.getSpeed(); //20
Car.getStatus(); // 'running';
Car.decelerate(); 
Car.decelerate();
Car.getStatus();  //'stop';
//Car.speed;  //error
```

**写一个函数使用setTimeout模拟setInterval的功能**

```javascript
function mockInterval(fn,interval){
    setTimeout( function(){
        fn();
        mockInteval(fn,interval);
    },interval);
}

mockInterval( function(){console.log('hi')}, 1000);
```

**写一个函数，计算setTimeout平均[备注：新加]最小时间粒度**

```javascript

function getMini() {
    let t = 0;
    let start = new Date();
    let timer = setTimeout ( function() {
        t++;
        if( t === 1000 ){
            clearTimeout(timer);
            let end = new Date();
            console.log( (end - start) / t );
        }
        timer = setTimeout(arguments.callee, 0);
    }, 0);

};

getMini(); //4.379
```

**下面这段代码输出结果是? 为什么?**

```javascript
var a = 1;
setTimeout(function(){
    a = 2;
    console.log(a);//2
}, 0); //参数为0，最后执行
var a ;
console.log(a); //1
a = 3;
console.log(a); //3
```

**下面这段代码输出结果是? 为什么?**

```javascript
var flag = true;
setTimeout(function(){//等待所有任务结束后执行
    flag = false;
},0)
while(flag){} //setTimeout会等待它执行完毕，此时flag永远是true，无限循环。
console.log(flag);  //不会执行
```

**下面这段代码输出？如何输出delayer: 0, delayer:1...（使用闭包来实现）**

```
for(var i=0;i<5;i++){
    (function(t){
		    //参数变量提升 let t;
        return setTimeout(function(){
                    console.log('delayer:' + t );
                }, 0);
    })(i);
    console.log(i);
}
```

