## 问答
### text-align: center的作用是什么，作用在什么元素上？能让什么元素水平居中
令块级元素(测试inline-block也可以)的子元素居中，子元素的种类包括block, inline-block, text.    
### IE 盒模型和W3C盒模型有什么区别?
- IE盒子模型： 内容区width = content_width + 2padding + 2border
- W3C盒子模型： 内容区width = content_width

### `*{ box-sizing: border-box;}`的作用是什么？
使盒子模型切换到ie盒子模型的内容区width计算方式，计入padding,border.

### `line-height: 2`和`line-height: 200%`有什么区别?
- 取值为数字时: 子元素行高重新计算，计算公式： 行高=子元素font-size*number
- 取值为百分比时： 子元素行高继承父元素行高，父元素行高计算公式: 行高=父元素font-size*百分比

### inline-block有什么特性？如何去除缝隙？高度不一样的inline-block元素如何顶端对齐?
- 特性： 同时具有行内元素和块级元素的特性，可设置高宽。
- 去缝隙方案：
	1. 父元素设置`font-size:0`
	2. 负边距
	3. 貌似还有个letter-spacing的方法，测试没成功，待定
	2. 消除标签间的空格

```html
<li>
aa</li><li>
bb</li><li>
cc</li>
```
or

```html
<li>aa</li><!--
--><li>bb</li><!--
--><li>cc</li>
```


### CSS sprite 是什么?
俗称雪碧图或CSS精灵，是一种降低页面网络请求数的方法，具体做法是把多张图片合成到一张图片里，然后对需要对应图片的元素设置`background-position`.这种方法多用于图标等小尺寸非语义化图片，优点是可以降低网络请求数，但是同时也带来了一些不便，由于采用了化零为整的思路，那么在个别图像需要修改的时候就需要重新合成。在多人协作的时候，不同创作人员对雪碧图进行修改时容易造成冲突，解决办法依赖于一些带有区域修改，版本控制功能的合成工具，如今常用gulp之类的构建工具进行修改。

### 让一个元素"看不见"有几种方式？有什么区别?
- visibility: hidden;(仍然占据空间）
- visibility: none; (不再存在于dom树中，不再占据空间)
- opacity: 0; (仍然占据空间)
- background: (xxx,xxx,xxx,0);（占据空间，只是背景色为0)

### 代码
[demo](http://book.jirengu.com/jirengu-inc/jrg-renwu9/homework/%E5%BB%96%E6%96%87%E6%B5%A9/task9/task9-2.html);    

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
<script src="./iconfont.js"></script>
  <style>
  	.icon {
	  width: 1em; height: 1em;
	  vertical-align: -0.15em;
	  fill: currentColor;
	  overflow: hidden;
	}
	.sprite{
		background-image: url("https://ww1.sinaimg.cn/large/006y8lVagw1fb6ng4o4e7j305v0bejsa.jpg");
		background-size: cover;
		width: 100px;
		height: 100px;
	}
	.sprite:hover{
		background-position: 0% 100%;
	}
	.icon{
		height: 100px;
		width: 100px;
		color: blue;
	}
	.icon:hover{
		color: red;
	}
  </style>
</head>
<body>

<div class="sprite"></div>
	<hr>
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-jirengulogojichu1"></use>
</svg>
</body>
</html>
```
