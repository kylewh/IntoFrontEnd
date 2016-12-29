### 浮动元素有什么特征？对父容器、其他浮动元素、普通元素、文字分别有什么影响?          
**概念：**一旦某个元素成为浮动元素，它会尽可能的根据所设置的浮动方向向左或向右浮动，直到遇到包含框的的边缘，或者遇到另一个浮动元素框的边缘,便停下来。    
    
**什么是包含框？**    
![](http://www.css88.com/book/css2/images/boxdim.gif)    

每一个框都有一个内容区（如文本，图形等等）以及可选的环绕在周围的边白，边框以及边距区域；四个区域（内容，边白，边框和边距）的每一个边界称为一个“边”，因此，每一个框有四条边，当每一个区域存在时，它们就产生对应的边。
    
考虑如下代码：[在线预览demo](http://js.jirengu.com/zota/2/edit?html,css,output)
    
```html
<div class="parent">
  <div class="box1">
    box1
  </div>
  <div class="box2">
    box2
  </div>
</div>
```


```css
.parent{
	border: 5px solid #ffe000;
	height: 300px;
	width: 500px;
}

.box1{
	height: 100px;
	width: 100px;
	background: #00bfff;
	float: left;
}

.box2{
	height: 100px;
	width: 100px;
	background: #fc2c87;
	float: right; 
}
```

效果：    

![](https://ww2.sinaimg.cn/large/006y8lVagw1fb7b7bufzfj30f309eq34.jpg)    
    
我们发现子元素浮动后停在了父元素的内边框边缘，进一步验证，我们为父元素加上**padding：10px**，看看效果如何：    

![](https://ww2.sinaimg.cn/large/006y8lVagw1fb7bbsjt8pj30f109ejrl.jpg)    
    
结合上面解释过的框的概念，这里我们的浮动元素停在了padding所生成的边的边缘，证明了概念中所说的:    
> 直到遇到包含框的的边缘


考虑如下代码：[在线预览demo](http://js.jirengu.com/qiya/2/edit?html,css,output)    

```html
<div class="wrapper">
  <div class="box1"></div>
	<div class="box2"></div>
</div>
```

```css
.box1{
	height: 300px;
	width: 300px;
	border: 10px solid pink;
	float: left;
	margin-right: 100px; /*Watch out!*/
}
.box2{
	height: 300px;
	width: 300px;
	border: 10px solid pink;
	float: left;
}
```

效果：    

![](https://ww1.sinaimg.cn/large/006y8lVagw1fb7ar073vaj30mb09kjs5.jpg)     
    
不难发现，右边的box2在向左浮动的过程中停在了距离box1还有一段距离的位置，而这个距离刚好就是我们设置的**margin-right: 100px**,这验证了概念中遇到浮动元素时的情形：    
> 或者遇到另一个浮动元素框的边缘,便停下来

理解这段话的核心在于理解包含框到底是什么，通过demo验证可以很好解决这个疑惑。    

**那么对于普通元素及文字，浮动元素又会怎样表现呢？**    

考虑如下代码： [在线预览demo](http://js.jirengu.com/bawu/1/edit?html,css,output)

```html
<div class="regular-box">regular-box</div>
<div class="float-box">float-box</div>
<div class="regular-box">regular-box</div>
```

```css
div{
	text-align: center;
	width: 200px;
	height: 200px;
}

.regular-box{
	background: #ff9300;
}

.float-box{
	background: #00b7ff;
	/* float: left; */
}
```

效果：   

![](https://ww4.sinaimg.cn/large/006y8lVagw1fb7bs6zz42j306p0i174b.jpg)   

现在我们去掉float-box的float:left注释，为了方便观察我们把float-box的opacity设置为0.5：   

![](https://ww1.sinaimg.cn/large/006y8lVagw1fb7bv02cdtj306k0cq74d.jpg)    

float-box所在区域居然变成了绿色，很显然是因为下面的橘黄色regular-box占据了float-box进行浮动前的原有位置。用浏览器的渲染过程来解释这个问题：    

1. 渲染第一个regular-box，摆在对应位置。
2. 渲染float-box, 由于它进行了浮动，会寻找包含框或者另一个浮动元素框的边缘，经过查找发现了在它的前面有一个未浮动的元素的包含框，它没有margin，也没有border，只有content的width，所以在第一个regular-box的内容框边缘进行渲染。
3. 渲染第二个regular-box，由于float-box已经脱离了文档流，所以在第二个regular并不会检测到它的存在，所以直接在第一个regular-box下面进行渲染(block-level元素独占一行)。但是我们发现它内部的文字依然留在了下面，像是被float-box给挡住了一样。为了进一步验证浮动元素对文字的影响，我们再写一个demo观察效果:   

考虑如下代码： [在线预览demo](http://js.jirengu.com/sati/5/edit?html,css,output)

```html
<div class="wrapper">
	<div class="float-box"></div>
	<article>
		<!--大段随机文字-->
	</article>
</div>
``` 

```css
.float-box{
	height: 100px;
	width: 100px;
	background: #ffba00; /*黄色*/
	float: left;
	opacity: 0.5;
}

article{
  background: #00a8ff;
}
```

效果:    

![](https://ww4.sinaimg.cn/large/006y8lVagw1fb7i2us3bmj30f809owhc.jpg)


可以发现float-box的颜色变成了绿色（透明度+黄+蓝=绿），而article中的文字依然被float-box挤开了空间，这说明，文字所在的行框并不会忽略已经脱离文档流的float元素，甚至会调整自己的行框宽度，给其让出空间，表现形式就是文字充满float元素的周围。    

**什么是行框？**    
行框是指本行的一个虚拟的矩形框，是浏览器渲染模式中的一个概念，并没有实际显示。行框高度等于本行内所有元素中行内框最大的值。当有多行内容时，每行都会有自己的行框。    

---

### 清除浮动指什么? 如何清除浮动? 两种以上方法
首先一定要搞清楚一点，这点是让我曾经初学时非常confused的，而且发现很多同学也被误导过，因为网上很多教程里并没有注重学术性用词的严谨，这一点便是：   
> **当我们在讨论清除浮动的时候，我们并不是在讨论闭合浮动**

为什么这么说？看[demo](http://js.jirengu.com/lope/3/edit?html,css,output)说话：    
[](http://js.jirengu.com/lope/3/edit?html,css,output)    
![](https://ww2.sinaimg.cn/large/006y8lVagw1fb7k3kkn35j30kl0bi3zc.jpg)    

![](https://ww4.sinaimg.cn/large/006y8lVagw1fb7k41sjsoj30ke0d375e.jpg)    

![](https://ww1.sinaimg.cn/large/006y8lVagw1fb7k4lhg8cj30k60bt0ub.jpg)    

严格来说，**清除浮动**的方法无非是`clear:left/right/both`, 意在使设置这条样式的元素对应方向上不允许有浮动元素存在，一般情况下该元素会drop到浮动元素所在的下一行。    

如果意在解决父元素高度塌陷问题，则其中一种方法描述为： 父元素添加伪元素:after，设置**清除浮动**.   

---

### 有几种定位方式，分别是如何实现定位的，参考点是什么，使用场景是什么？
**1.相对定位:relative**    
相对定位的意思是元素的最终位置是相对原本的位置偏移，偏移量通过TRBL进行设置。    
使用场景： UI常见toggle里，两个元素的位置互换的运动特效，使用相对定位， 如果使用其他定位的话会使得情况变得复杂，需要写两套运动参数。 [见demo](http://book.jirengu.com/jirengu-inc/jrg-renwu9/homework/廖文浩/task10/relative_use_demo.html)    

![](https://ww1.sinaimg.cn/large/006y8lVagw1fb7n1v4yhaj30ih04yjrr.jpg)    

![](http://g.recordit.co/8BjvkewQBv.gif)   

核心： 将两个将要调换位置的元素设置为`position: relative` (图里面position少打一个i)    

**2.绝对定位:absolute**    
absolute的意思是元素脱离文档流，并相对参照物进行定位且只要参照物位置不变，其位置也不变，不受其他元素影响。参照物为第一个position设置除static以外的祖先元素, 就是如果父级元素是static定位，则再找上一层父级，直到其position设置不为static时，将其作为参照物。    
使用场景： 在部分分区里进行多微小区块定位，且不要求响应式时，多用absolute。 还有一些装饰性伪元素，比如前后切换的箭头，也会使用absolute。 垂直居中时使用简单粗暴的定位方法。    

**3.固定定位：fixed**
fixed的意思是元素脱离文档流，参照物为viewport左上角，或者html根元素。表现为：无论如何滚动滚动条，元素依然保持在相对视口的对应位置上。    
使用场景： 常见烦人小广告....    [demo](http://js.jirengu.com/qini/1/edit?html,css,output)   

![](http://g.recordit.co/qnht60tpzH.gif)   

**4.static**   
默认定位形式，处于文档流中，TRBL以及z-index都无法应用，按照文档流排列规则自然排列。   

---

### z-index 有什么作用? 如何使用?    
指定元素在z轴上的顺序，当元素之间重叠时，这个顺序决定哪一个元素覆盖在其余元素的上方显示。通常来说z-index较大的会覆盖较小的。    
   
```css
z-index: auto; /*元素不会建立一个新的本地堆叠上下文。当前堆叠上下文中新生成的元素和父元素堆叠层级相同。*/
z-index: 0;
z-index: 3;
z-index: 99;
```

[demo:](http://js.jirengu.com/babi/2/edit?html,css,output)   

![](https://ww3.sinaimg.cn/large/006y8lVagw1fb7p2mdwc6j30e50g3t91.jpg)   

--- 

### position:relative和负margin都可以使元素位置发生偏移?二者有什么区别?   
- relative，元素处在文档流，视觉形式上相对自己本身位置进行重定位，且不会影响相邻元素的位置。
- 负margin改变了元素包含框的大小，因此也改变了它在文档流中的渲染位置，因此也会影响相邻元素的位置。   

---

### BFC 是什么？如何生成 BFC？BFC 有什么作用？举例说明
**概念**：BFC全称Block Formatting Context，它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部**毫不相干**。   

**激活BFC**：

-  根元素
-  float属性不为none
-  position为absolute或fixed
-  display为inline-block, table-cell, table-caption, flex, inline-flex
-  overflow不为visible  

**BFC下规则**：   

- 内部Box在垂直方向按出现顺序放置。
- 属于同一个BFC的两个相邻Box的margin会发生重叠，除非它们之间存在阻挡 (边框，非空内容，padding)
- BFC的区域不会与float元素重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算（不会塌陷）   

**使用场景**：   

**1.自适应两栏布局**    

![](https://ww1.sinaimg.cn/large/006y8lVagw1fb7ps1d2hnj30o40bswfo.jpg)    

运用规则：    
> BFC的区域不会与float元素重叠。   

给right加上`overflow:auto`后效果如下：   

![](https://ww1.sinaimg.cn/large/006y8lVagw1fb7ptv1dj5j30cr0gaaa6.jpg)    

**2.闭合浮动**    
    
![](https://ww4.sinaimg.cn/large/006y8lVagw1fb7q0t4sr4j30ob095abh.jpg)   

运用规则：    
> 计算BFC的高度时，浮动元素也参与计算（不会塌陷）   

给parent加上`overflow:auto`后效果如下：    

![](https://ww4.sinaimg.cn/large/006y8lVagw1fb7q2uha4tj30ae08zglo.jpg)   

**3.防止垂直margin重合**    

![](https://ww1.sinaimg.cn/large/006y8lVagw1fb7q5yp8uej30if09n752.jpg)   

运用规则：   
> 属于同一个BFC的两个相邻Box的margin会发生重叠，除非它们之间存在阻挡 (边框，非空内容，padding)    

以及：   

> BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。   

我们给第二个box加上一层父级，并让父级触发BFC，效果如下：    

![](https://ww3.sinaimg.cn/large/006y8lVagw1fb7q979wvjj30e30bpjrr.jpg)   

可以发现第二个box与第一个box之间的margin相当于它们自身的高度，100px，显然是margin没有重叠的结果。   

---

### 在什么场景下会出现外边距合并？如何合并？如何不让相邻元素外边距合并？给个父子外边距合并的范例    

简单地说，外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距，且高度等于两个发生合并的外边距的高度中的较大者。当一个元素包含在另一个元素中时，上下边距也会合并。就连自身都可以发生边距合并，如果内容为空。    

防止合并方案：   

-  加边框
-  加padding
-  给其加上父级并且触发BFC

---

### 代码：
[代码1](http://js.jirengu.com/xiro/3/edit?html,css,js,output)   
[代码2](http://js.jirengu.com/xuya/4/edit?html,css,output)   
[代码3](http://js.jirengu.com/gexa/6/edit?html,css,js,output)    
[代码4](http://js.jirengu.com/zode/3/edit?html,css,output)    
