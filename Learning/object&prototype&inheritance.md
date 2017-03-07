# Object & prototype & inheritance
## 对象的创建
### 工厂模式
> Just Tell me what do you want.

```javascript
function createPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		alert(this.name);
	};
	return o;
}

var person1 = createPerson('kylewh',29,'Web Developer');

// 内部new Object => 对其进行属性与方法的添加 => 返回这个object
// 外部直接调用函数，没有使用new操作符
```

- 优点：解决了创建多个相似对象的问题
- 缺点：没有解决对象识别的问题，见如下代码

```javascript
console.log( person1 instanceof createPerson ); //false
console.log ( person1.prototype.constructor ); // Function Object
```


### 构造函数模式
> So I can recognize where you from.

相较于工厂模式，我们看到这种模式下：

- 没有在内部显式的创建对象 
- 属性和方法都赋给了this对象
- 并没有return语句

而实际上new操作符的所作所为恰恰解释了上面的区别，当使用new时，会经历以下4个步骤：

1. 创建一个对象
2. 将构造函数的作用域赋给新对象(this指向这个对象)
3. 执行构造函数中的代码(为这个新对象添加属性方法)
4. 返回新对象(隐式的返回this)

```javascript
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function () {
		alert(this.name);
	}
	/* return this; */
}

var person1 = new Person('kyle', 29, 'webdever');
console.log( person1 instanceof Person ) //true
```

- 优点：解决了工厂模式的无法识别对象的问题
- 缺点：对于每一个对象，都创建了同样的方法的副本，这些方法不具有复用性，观察如下代码：

```javascript
var p1 = new Person();
var p2 = new Person();
console.log( p1.sayName == p2.sayName ); //false 创建了两个sayName副本
```

## 原型
### 原型模式
>Finally I don't have to keep everything.

prototype是每个函数都具有的属性，它是一个指针，指向一个对象，这个对象叫做原型对象，特定类型的所有实例都将共享这个原型对象上的属性与方法。

```javascript
function Animal(name) {
	this.name = name;
}
Animal.prototype.run = function() {
	console.log ( this.name + ' is runing' );
}

var a1 = new Animal('cat');
var a2 = new Animal('dog');
a1.run(); //cat is runing
a2.run(); //dog is runing
console.log( a1.run == a2.run ); //true
```

缺陷： 我们发现function在原型对象上被共享，而我们知道function类型是一种**引用类型**，如果一个引用类型被共享，那么结果就是无论某个特例如何更改它原型对象上的引用类型数据，最后所有的其他实例也将得到同样的结果。

```javascript
Animal.prototype = {
	constructor: Animal,
	skills: ['run', 'jump', 'sleep'], //数组是引用类型
	run: function() {
	  console.log ( this.name + ' is runing' );
  }
}

var a3 = new Animal('cat');
var a4 = new Animal('cat');
console.log( a3.skills ); //run, jump, sleep
console.log( a4.skills ); //run, jump, sleep
a3.skills.push('climb');
console.log( a3.skills ); //run, jump, sleep, climb
console.log( a4.skills ); //run, jump, sleep, climb
```

### 组合使用构造函数模式和原型模式
>Just Keep your characteristic.

将私有引用类型通过构造函数模式进行添加，公有引用类型通过原型模式添加。

```javascript
function Animal () {
	this.skills = ['run', 'jump', 'sleep'];
}
Animal.prototype = {
	constructor: Animal,
	run: function() {
	  console.log ( this.name + ' is runing' );
  }
}
```

这种模式是使用最广泛、认同度最高的一种创建自定义类型的方法，可以说算是一种默认模式。

### 动态原型模式
>Let's make it into one piece.

通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。

```javascript
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	if ( typeof this.sayName != 'function' ) {
		Person.prototype.sayName = function () {
			alert(this.name);
		};
	}
}
var friend = new Person("Nicholas", 29, "SoftWare Engineer");
//注意不能使用字面量重写原型，一旦在重写原型前使用了new操作符，其实例已经指向当时的原型对象，使用字面量重写会切断现有实例与新原型之间的联系（甚至不曾连接过，新原型只会对重写后使用new操作符实例化的实例有效）
```

非常完美的一种方法。

## 继承
### 原型链继承

让子类的原型指向父类的实例。

```javascript
function SuperType() {
	this.property = true;
}
SuperType.prototype.getSuperValue = function () {
	return this.property;
}
function SubType() {
	this.subproperty = false;
}

//inheritance
//由此对于子类的原型对象不能使用字面量添加的方法
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
	return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); //true
```

如果子类重写了超类中的方法，将会屏蔽超类里的同名方法。
问题： 同样对于超类中的**引用类型**属性，子类所有实例都会共享这一个属性，一旦一个实例修改了这个属性，其他实例也会共享这个“改动”

### 借用构造函数
在子类的构造函数调用超类型构造函数，相当于将超类构造函数的属性拷贝一份。

```javascript
function SuperType() {
	this.colors = ['red', 'blue', 'green' ];
}

function SubType() {
	//继承了SuperType
	SuperType.call(this); 
	//相当于：this.colors = ['red', 'blue', 'green' ];
}

var instance1 = new SubType();
instance1.colors.push('black');
alert(instance1.colors); // red, blue, green, black
var instance2 = new SubType();
alert(instance2.colors); // red, blue, green
```

优点：
可以在子类的构造函数中向父类构造函数传递函数（因为call的使用）

```javascript
function SuperType(name) {
	this.name = name;
}

function SubType() {
	SuperType.call(this, "kylewh");
	this.age = 29;
}
var instance = new SubType();
alert(instance.name); //kylewh
```

缺陷：
本质上构造函数模式的移植版，方法都是在构造函数里定义，不满足函数**复用**的原则，而且没有进行**原型链接**操作，那么父类的原型里的方法对于子类也是不可见的。

### 组合继承

使用**原型链**实现对原型属性和方法的继承，而通过**借用构造函数**来实现对实例属性的继承。

```javascript
function SuperType(name) {
	this.name = name;
	this.color = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
	alert(this.name);
}

function SubType(name, age) {
	//实现实例属性的继承 解决引用类型的共享问题
	SuperType.call(this, name);
	this.age = age;
}

//继承方法 父类：sayName();
SubType.prototype = new SuperType();
//自报家门
SubType.prototype.constructor = SubType; 
//子类独有方法
SubType.prototype.sayAge = function() {
	alert(this.age);
}

var instance1 = new SubType('kylewh', 25);
instance1.colors.push('black');
console.log(instance1.colors); //red,blue,green,black
instance1.sayName(); //kylewh
instance1.sayAge(); //25
```

最常用的继承模式，避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为javascript中最常用的继承模式。

缺陷： 调用了两次父类构造函数，而且子类的实例具有通过父类构造函数拷贝而来的属性，而它的原型也是父类的实例，这样它原型上的同名属性都被实例上的属性给屏蔽了。 原型身上的属性成了冗余属性。

### 原型式继承
借助已有的对象创建新对象，同时还不用创建自定义类型，借助这个函数：

```javascript
function object(o) {
	function F() {};
	F.prototype = o;
	return new F();
}
//本质上对于传入的对象进行了一次浅复制=>引用类型的共享问题

var person = {
	name: "kylewh",
	friends: ['john', 'edwin'] //共享的源头
};

var anotherPerson = object(person);
anotherPerson.name = 'greg';
anotherPerson.friends.push('rob');

alert(person.friends); // john, edwin, rob !!
```

ES5新增的Object.create()规范化了原型式继承，这个方法接受两个参数：一个用作新对象原型得对象和（可选的）一个为新对象定义额外属性的对象。     

**注意：使用Object.create()创建对象的的效率并不高，通常要比使用构造函数创建对象更慢**

```javascript
var person = {
	name: 'kylewh',
	friends: ['edwin', 'john']
}

var anotherPerson = Object.create(person, {
	name: {
		value: "Gred"
	}
});

alert(anotherPerson.name) //gred 屏蔽了原型的属性
```

依然逃不过引用类型共享的问题。

### 寄生式继承
与工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象。

```javascript
function createAnother(original) {
	var clone = object(original);
	clone.sayHi = function () {
		alert('hi');
	}
	return clone;
}
//任何能返回新对象的函数都适用于此模式。

var person = {
	name: 'kylewj',
	friends: ['edwin', 'john']
}

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //hi;
```

缺陷： 不能做到函数复用，不断的进行拷贝。

### 寄生组合式继承
为了解决组合继承的屏蔽&冗余问题，我们首先不需要为了指定子类型的原型而调用超类型的构造函数，使用寄生式继承来继承超类型的原型，再将结果指定给子类型的原型。

```javascript
function inheritPrototype(subType, superType) {
	var prototype = Object(superType.prototype); //创建对象
	prototype.constructor = subType; //增强对象识别性
	subType.prototype = prototype; //指定对象
}
```

1.借用构造函数模式继承父类属性
2.寄生模式继承父类原型

```javascript
function superType(name) {
	this.name = name;
	this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function () {
	alert(this.name);
}

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
}

inheritPrototype(SubType, SuperType);
// let prototype = Object(SuperType.prototype);
// prototype.constructor = subType;
// subType.prototype = prototype;

//继承完毕后再向子类原型添加方法，不用字面量方式
SubType.prototype.sayAge = function() {
	alert(this.age);
}

```


只调用了以此superType的构造函数，足够高效，并且因此避免了在subType的原型上创建不必要的，多余的属性。与此同时，原型链还是保持不变，也能正常的使用instanceof和isPrototypeOf()。

>开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。





