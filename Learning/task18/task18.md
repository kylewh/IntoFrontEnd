[数组内置方法分类](https://github.com/kylewh/IntoFrontEnd/blob/master/Learning/notes/Array-built-in-method.md)     
[字符串方法分类](https://github.com/kylewh/IntoFrontEnd/blob/master/Learning/notes/String-built-in-method.md)    

#### Array.prototype.push()
将一个或多个元素添加至对应函数的尾部，数组的长度也相应增加，同时返回新的长度。    

```javascript
arr = [1,2,3];
console.log( arr.push(4,5,6) ); //6-->push后arr的长度
console.log( arr ); // [1,2,3,4,5,6]
```

#### Array.prototype.pop()
将数组最后一个元素移除，数组的长度相应减1，同时返回被移除的元素,如何为空数组，则返回`undefined`.    

```javascript
arr = [];
console.log( arr.pop() );//undefined

arr1 = [1,2,3];
console.log( arr1.pop() ); //3
console.log( arr1 ); // [1,2]
```

#### Array.prototype.shift()
将数组第一个元素移除，数组的长度对应减1，同时返回被移除的元素，同时第一个元素之后的元素向前移一位。如果为空数组，则返回`undefined`.

```javascript
arr = [];
console.log( arr.shift() ); //undefined

arr1 = [1,2,3];
console.log( arr1[0] ); //1
console.log( arr1.shift() ); //1
console.log( arr1 ); // [2,3]
console.log( arr1[0] ); //2
```

#### Array.prototype.unshift()
将一个或多个元素添加至对应函数的头部，数组的长度也相应增加，同时返回新的长度，原来从头部开始的元素全部向后移位。     

```javascript
arr = [];
addArr = [0,1,2,3]
console.log( arr.unshift(...addArr) ); //4
console.log( arr ); //[0,1,2,3]
```   

#### Array.prototype.join()
将数组中的每个元素转换成一个字符串，然后将它们用separator（如果有）连接起来组成一个字符串并返回，如果没有给出separator，则自动用','连接起来。    

```javascript
arr = ['i','love','hungry','valley'];
console.log( arr.join() ); //i,love,hungry,valley
console.log( arr.join(' ') );//i love hungry valley
```

#### String.prototype.split()
有两个参数，第一个是separator,第二个是限制拆分出几个数组元素。    
根据给出的separator，将数组从separator两侧拆开。如果separator是空字符串，则将所有的字符都拆为一个数组元素，返回一个新数组。

```
str = "i love hungry valley !";
str.split(""); // ["i", " ", "l", "o", "v", "e", " ", "h", "u", "n", "g", "r", "y", " ", "v", "a", "l", "l", "e", "y", " ", "!"]
str.split(" "); //["i", "love", "hungry", "valley", "!"]
str.split("i"); // ["", " love hungry valley !"]
```

----
## 数组


### 用 splice 实现 push、pop、shift、unshift方法 （***）

```javascript
/*===========Implement push==========*/

// 矮穷矬版

function diyPush(arr,val){
	arr.splice(arr.length,0,val);
	return return arr.length;
}

//显然这个函数显然只能push一个元素，而原生push是支持添加多个元素的，而且调用方式也不太像原生push，很low，这不是我们想要的.

// 改进版
Array.prototype.myPush = function() {
	this.splice( this.length, 0, ...arguments);
	return this.length;
}

// Test
let arr1 = [0];
console.log( arr1.myPush(1,2,3) ); //4
console.log( arr1 ); // [0,1,2,3] 


/* 
真是哔了狗了一开始没看仔细MDN，跟方方之前讨论过类数组让我以为只要给一个对象加上了length属性就能让其伪造成一个类数组，结果最后找到MDN里一句话： 
“The only native, array-like objects are strings, although they are not suitable in applications of this method, as strings are immutable.”
好吧，倒腾了半天用尽了办法最后甚至以为JS是不是还有缺陷，原来想要实现类数组对象的push原来完全是错的，吃一堑长一智，算是记住类数组对象这个点了。
*/

```

```javascript
/*===========Implement pop==========*/
Array.prototype.myPop = function() {
	return this.splice( this.length-1, 1)[0];
}
// Test
let arr1 = [0,1,2,3,4];
console.log( arr1.myPop() ); //4
console.log( arr1 ); // [0,1,2,3] 
```

```javascript
/*===========Implement shift==========*/
Array.prototype.myShift = function() {
	return this.splice( 0, 1)[0];
}
// Test
let arr1 = [0,1,2,3,4];
console.log( arr1.myShift() ); //0
console.log( arr1 ); // [1,2,3,4] 
```

```javascript
/*===========Implement unshift==========*/
Array.prototype.myUnshift = function() {
	this.splice(0, 0, ...arguments);
	return this.length;
}
// Test
let arr1 = [0];
console.log( arr1.myUnshift(1,2,3) ); //4
console.log( arr1 ); // [1,2,3,0]
```

### 使用数组拼接出如下字符串 （***）

```javascript
var prod = {
    name: '女装',
    styles: ['短款', '冬季', '春装']
};
function getTplStr(data){
	let body = '';
	data.styles.forEach( (e,v,i) => {
		body+= '<dd>' + e + '</dd>'
	});
	return '<dl class="product">' + '<dt>' + data.name + '</dt>' + body + '</dl>';

};
var result = getTplStr(prod);  //result为下面的字符串

```

```html
<dl class="product">
    <dt>女装</dt>
    <dd>短款</dd>
    <dd>冬季</dd>
    <dd>春装</dd>
</dl>
```

### 写一个find函数，实现下面的功能 （***）

```javascript
var arr = [ "test", 2, 1.5, false ]
function find(arr, val) {
	for(let i = 0; i < arr.length; i++){
		if( arr[i] == val) {
			return i;
		}
	}
	return -1;
}
find(arr, "test") // 0
find(arr, 2) // 1
find(arr, 0) // -1
```

### 写一个函数filterNumeric，把数组 arr 中的数字过滤出来赋值给新数组newarr， 原数组arr不变

```javascript
arr = ["a", "b", 1, 3, 5, "b", 2];
//版本1
function filterNumberic1(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
//版本2
let filterNumeric2 = arr => arr.filter(e => typeof e == "number");

newarr1 = filterNumeric1(arr);  //   [1,3,5,2]
newarr2 = filterNumeric2(arr); //  [1,3,5,2]
```

### 对象obj有个className属性，里面的值为的是空格分割的字符串(和html元素的class特性类似)，写addClass、removeClass函数，有如下功能：(****)

```javascript
var obj = {
  className: 'open menu'
}
addClass(obj, 'new') // obj.className='open menu new'
addClass(obj, 'open')  // 因为open已经存在，所以不会再次添加open
addClass(obj, 'me') // me不存在，所以 obj.className变为'open menu new me'
console.log(obj.className)  // "open menu new me"

removeClass(obj, 'open') // 去掉obj.className里面的 open，变成'menu new me'
removeClass(obj, 'blabla')  // 因为blabla不存在，所以此操作无任何影响

let addClass = (obj,name) => {
	let temp  = obj['className'].split(' ');
	if (temp.some( e => e===name )){
		return obj['className'] = temp.join(' ');
	}else{
		temp.push(name);
		return obj['className'] = temp.join(' ');
	}
}

let removeClass = (obj, name) => {
	let temp  = obj['className'].split(' ');
	if (temp.some( e => e===name )){
		temp.splice(temp.indexOf(name),1)
		return obj['className'] = temp.join(' ');
	}else{
		return obj['className'] = temp.join(' ');
	}
}
```

### 写一个camelize函数，把my-short-string形式的字符串转化成myShortString形式的字符串，如 (***)

```javascript
camelize("background-color") == 'backgroundColor'
camelize("list-style-image") == 'listStyleImage'

function camelize(str) {
	let arr = str.split("-");
	for(let i=1; i<arr.length; i++){
		arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
	}
	return arr.join("");
}
```

###  如下代码输出什么？为什么?

```javascript
arr = ["a", "b"];
arr.push( function() { alert(console.log('hello hunger valley')) } ); // 'hello hunger valley'
arr[arr.length-1]();  // undefined, 因为函数console.log的返回值为undefined, 则alert undefined.
```

### 写一个函数isPalindrome,判断一个字符串是不是回文字符串（正读和反读一样，比如 abcdcba 是回文字符串， abcdefg不是）

```javascript

/* 
leetcode里回文定义不比较非字母&数字以外的字符

特殊情况： 
	&&&aba&& -> true
corner case: 
	空字符串 -> true
	无字母&数字 -> true
*/

function isPalindrome(s){
	if(s == '' || s.length == 0 ) { //空字符串默认为真。
		return true;
	}
	
	let head = 0, tail = s.length-1;
	
	while (head < tail){
		while(head < s.length && !isValid(s[head]) ){ //如果当前字符不是字母或者阿拉伯字母，头索引向后跳
			head++;
		}
		if(head == s.length ){  // 如果字符串里没有任何字母和阿拉伯字母，默认为真。
			return true;
		}
		while( tail >=0 && !isValid(s[tail])) { //如果当前字符不是字母或者阿拉伯字母，尾索引向前跳
			tail--;
		}
		if(s[head].toLowerCase() !== s[tail].toLowerCase() ){ //如果头尾索引对应字符不相等，跳出循环，不是回文。
			break;
		}else { //头尾向彼此各移动一位
			head++; 
			tail--;
		}
	}
	return tail <= head;

	function isValid (c){ //判断是否为字母或者数字
		return (c.charCodeAt(0)>=65 && c.charCodeAt(0)<= 90) || (c.charCodeAt(0)>=97 && c.charCodeAt(0)<= 122) || (c.charCodeAt(0)>=48 && c.charCodeAt(0)<= 57);
	}
}


isPalindrome('');//true
isPalindrome('&^%$#@^*(');//true
isPalindrome('abcdcba'); // true
isPalindrome('&&&aba&&'); //true
isPalindrome('abcdefg'); //false
```

### 写一个ageSort函数实现数组中对象按age从小到大排序 （***）

```javascript
let ageSort = p => p.sort( (a,b) => a.age - b.age > 0 );

var john = { name: "John Smith", age: 23 }
var mary = { name: "Mary Key", age: 18 }
var bob = { name: "Bob-small", age: 6 }
var people = [ john, mary, bob ]
ageSort(people) // [ bob, mary, john ]
```

### 写一个filter(arr, func) 函数用于过滤数组，接受两个参数，第一个是要处理的数组，第二个参数是回调函数(回调函数遍历接受每一个数组元素，当函数返回true时保留该元素，否则删除该元素)。实现如下功能： （****）

```javascript
function filter( arr, callBack) {
	for(let i=arr.length-1; i>=0; i--){
		if( !callBack(arr[i]) ){
			arr.splice(i,1);
		}
	};
	return arr;
}

function isNumeric (el){
    return typeof el === 'number'; 
}

arr = ["a",3,4,true, -1, 2, "b"]

arr = filter(arr, isNumeric) ; // arr = [3,4,-1, 2],  过滤出数字
arr = filter(arr, function(val) { return  typeof val === "number" && val > 0 });  // arr = [3,4,2] 过滤出大于0的整数
```

## 字符串

### 写一个 ucFirst函数，返回第一个字母为大写的字符 （***）

```javascript
let ucFirst = s => s = s[0].toUpperCase() + s.substr(1);
ucFirst("hunger");// Hunger
```

### 写一个函数truncate(str, maxlength), 如果str的长度大于maxlength，会把str截断到maxlength长，并加上…，如

```javascript
let truncate = (str,maxlength) => str = str.length > maxlength ? str.substr(0,maxlength)+"..." : str;

truncate("hello, this is hunger valley,", 10) //"hello,this..."
truncate("hello world", 20) //"hello world"
```

## 数学函数

### 写一个函数，获取从min到max之间的随机整数，包括min不包括max。

```javascript
let random = (min,max) => Math.floor(Math.random()*(max-min)+min);
```

### 写一个函数，获取从min都max之间的随机整数，包括min包括max （***）

```javascript
let random = (min,max) => Math.floor(Math.random()*(max-min+1)+min); //区别在于加不加1
```

### 写一个函数，获取一个随机数组，数组中元素为长度为len，最小值为min，最大值为max(包括)的随机整数 （***）

```javascript
function randomArr(len,min,max) {
	let arr = [];
	for(let i=0; i<=len; i++){
		arr.push(Math.floor(Math.random()*(max-min+1)+min));
	}
	return arr;
}
```

####  写一个函数，生成一个长度为 n 的随机字符串，字符串字符的取值范围包括0到9，a到 z，A到Z。

```javascript
 function randstr(n){
     var str='',  dict='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
     for(var i=0;i<n;i++){
         str += dict[Math.floor(Math.random()*dict.length)];
     }
     return str;
 }
```