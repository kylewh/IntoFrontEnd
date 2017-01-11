### 基础类型有哪些？复杂类型有哪些？有什么特征？
基础类型又称原始类型(primitive type)，共有5种：

- Number
- String
- Boolean
- Undefined
- Null

复杂类型又称引用类型有：    

- object
	- Function
	- Array
	- Date
	- RegExp

Boolean, Number, String也属于特殊的引用类型，它们同时也具有各自基本类型的特殊行为，在每读取一个基本类型值的时候，后台就会建立一个对应的`基本包装类型`的对象（作为引用类型的由来），可以让我们调用一些方法来操作这些数据。    

看个例子：    

```javascript
let s1 = 'i am a string';
let s2 = s1.substring(7);
```

我们知道s1是一个字符串，那它理应属于原始类型数据，那我们又何从调用一个方法呢？其实在第二行代码后台访问s1的时候，会处于一种**读取模式**，即从内存中读取这个字符串的值，而在读取模式中，后台也会自动完成以下三个步骤：    

1. 创建String类型的一个实例。
2. 在实例上调用指定的方法。
3. 销毁这个实例。

可以看作是隐式执行了如下代码：    

```javascript
let s1 = new String('i am a string');
let s2 = s1.substring(7);
s1 = null;
```

还记得我们之前说过，javascript的一切都是对象，这句话是没错的，就是因为存在对于基本类型的包装对象，只是我们很难明显的察觉到它。    

我们也可以显式的调用String, Number, Boolean来创建一个基本包装类型的对象，但是这样的做法是不推荐的，因为这样让我们很难分清我们到底是在对于原始数据类型进行操作，还是对引用类型进行操作。所以不是绝对必要的情况下，还是使用字面量的形式创建。     

我们也可以使用Object创建基本包装类型对象，而Object会自动识别传入值的类型而返回相应的基本包装类型的实例，见如下代码：     

```javascript
let str_obj = new Object('hunger');
console.log ( str_obj instanceof String
```

要注意的是，使用new调用基本类型的构造函数，与直接调用同名的**转型函数**是不一样的：     

```javascript
let num = Number('92');
console.log ( typeof num ); //number; num保存着原始类型

let num2 = new Number(92); //可以传入字符串
console.log( typeof num2 ); // object; num2保存着Number的实例

console.log( Object.prototype.toString.call(num) == Object.prototype.toString.call(num2) ); // true
//可见在进行类型判断时，使用Object.prototype.toString.call()更为稳妥。
```

那么，对于基础类型和复杂类型，它们的区别是什么呢？     
基础类型保存的是一个值，而复杂类型保存的是内存地址，通过访问内存地址，我们可以接触到里面的基础类型所保存的值。在传递时，基础类型直接传递值，而复杂类型直接传递内存地址，也就是我们所说的：引用。当我们使用引用传递时，通过变量访问这些地址，从而进行一些修改，无论这些引用地址被传递给多少个变量，通过其中任何一个进行修改，都会使堆内存中保存的对象发生相应变化。    

```javascript
let obj = { "a": 1, "b" : 2 }; // push a address to stack, and was placed in heap.
let a = 1; //push to stack, above the obj.
let b = 2; // push to stack, above the a.
```

![](https://ww2.sinaimg.cn/large/006tNc79gw1fbky6eib1pj30r80dodgy.jpg)


>JavaScript中的内存也分为栈内存和堆内存。一般来说，栈内存中存放的是存储对象的地址，而堆内存中存放的是存储对象的具体内容。对于原始类型的值而言，其地址和具体内容都存在与栈内存中；而基于引用类型的值，其地址存在栈内存，其具体内容存在堆内存中。堆内存与栈内存是有区别的，栈内存运行效率比堆内存高，空间相对推内存来说较小，反之则是堆内存的特点。所以将构造简单的原始类型值放在栈内存中，将构造复杂的引用类型值放在堆中而不影响栈的效率。

### 如下代码的输出? 为什么?

```javascript
var obj1 = {a:1, b:2};
var obj2 = {a:1, b:2};
console.log(obj1 == obj2); //false
console.log(obj1 = obj2); //将obj2的引用传递给obj1
console.log(obj1 == obj2);//true 此时obj1和obj2都指向同一个对象。
```

### 代码
**写一个函数getIntv，获取从当前时间到指定日期的间隔时间**    

```javascript
var str = getIntv("2016-01-08");
console.log(str);  // 距除夕还有 20 天 15 小时 20 分 10 秒

function getIntv (dateStr){
	let dif = (Date.parse(dateStr) - Date.now()) / 1000,
		day = Math.abs(Math.floor(dif/3600/24)),
		hour = Math.abs(Math.floor(dif/3600%24)),
		min = Math.abs(Math.floor(dif/60%60)),
		sec = Math.abs(Math.floor(dif%60)),
		result = "距" + dateStr + (dif>0?"还有：":"已经过去了：") + day + "天，" + hour + "小时，" + min + "分，" + sec + "秒." ;
	return result;
}
```

**把数字日期改成中文日期**     

```javascript
var str = getChsDate('2015-01-08');
console.log(str);  // 二零一五年一月八日

function getChsDate(timeStr){
	let dateObj = new Date(timeStr),
	    year = dateObj.getFullYear().toString(),
	    month = (dateObj.getMonth()+1).toString(),
	    date = dateObj.getDate().toString(),
	    cn_year = '',
	    ch = ['零','一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二十一','二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九','三十','三十一'];
	    for(let i=0;i<year.length;i++){
	    	cn_year += ch[year[i]];
	    }
	    return cn_year + '年' + ch[month] + '月' + ch[date] + '号' ;
}

```

**写一个函数获取n天前的日期**

```javascript
var lastWeek =  getLastNDays(7); // ‘2016-01-08’
var lastMonth = getLastNDays(30); //'2015-12-15'

function getLastNDays(day){
	let dt = new Date(Date.now()-day*24*3600*1000);
	return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
}
```

**完善如下代码，用于获取执行时间如：**     

```javascript
var Runtime = (function(){
    //code here ...
    let s,e;
    var obj = {
        start: function(){
            s = new Date();  //code here ...， 当前时间
        },
        end: function(){
            e = new Date(); //code here ...  结束时间
        },
        get: function(){
            return e-s;//code here ...  获取执行时间
        }
    };
return obj;
}());
Runtime.start();
for(var i = 0;i<1000;i++){
        console.log(1);
    }
Runtime.end();
console.log(  Runtime.get() );
```

**楼梯有20级，每次走1级或是2级，从底走到顶一共有多少种走法？用代码（递归）实现**    

```javascript
/*
1 --> f(1) --> 1
2 --> f(2) --> 2
3 --> f(3) --> f(2)(走1步） + f(1)（走2步）
4 --> f(4) --> f(3)(走1步） + f(4)（走2步）
n --> f(n) --> f(n-1) + f(n-2)
*/
function countWay(steps){
	if(steps<=1) return 1;
	if(steps==2) return 2;
	return countWay(steps-1) + countWay(steps-2);
}
```

**写一个json对象深拷贝的方法，json对象可以多层嵌套，值可以是字符串、数字、布尔、json对象中的任意项（PS:尝试另外一种方法 var obj2 = JSON.parse( JSON.stringify(obj1) ）**

```javascript
function deepCopy(oldObj){
	let newObj = {};
	for (key in oldObj){
		if( typeof oldObj[i] === 'object'){
			newObj[i] = deepCopy(oldObj[i]);
		}else{
			newObj[i] = oldObj[i];
		}
	}
	return newObj;
}
```

法二：    

```javascript
let deepCopy = oldObj => JSON.parse(JSON.stringtify(oldObj));
```