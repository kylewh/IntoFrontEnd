## 块级元素 VS 行内元素
### 块级元素
- div
- 标题 h1 h2 h3 h4 h5 h6
- 段落 p
- list: ul ol li
- 表格: dd dt tr th td
- 表单: form
- 代码 pre
- H5: header nav section article

### 行内元素
- 强调 em strong
- 小块文字 span
- 链接 a
- 换行 br
- 图片 img
- 表单项： input button textarea select label
- code
- script


块级元素都各自独占一行，行内元素都只占自己的内容宽度。   
加深印象，一图流[点击查看demo](http://js.jirengu.com/joze/2/edit?html,css,output)：    
![](https://ww4.sinaimg.cn/large/006y8lVagw1fb58b6fa2wj31e90l1gou.jpg)    


### Difference   

| Difference | block | inline |    
| :--------: | :---: | :----: |    
| **Width**      | 自然充满父级元素的宽度 | 宽度就是内容宽度,忽略显式width设置 |
| **Height**     | 可以设置,如果没有设置，高度自适应为子元素高度 | 忽略这个属性 |
| **Margin&Padding**     | 上下左右都生效 | 上下不生效，左右可以生效 |
| **放置形式**     | 默认放在前一个元素的下面(below) | 文字流形式 |
| **浮动**        | 不再独占一行，如果上一行有足够宽度空间便会挤进去 | 浮动时具有所有块级元素的性质 |
| **vertical-align** | 对包含的行内元素生效 | 无效 |

- 块级元素可以嵌套块级元素，也可以嵌套行内元素。
- 一般来说，行内元素则只能嵌套行内元素。 一个特殊的行内元素是a，我们经常会把块级元素或者inline-block元素放置其中。
- img是一个很特殊的元素，它属于一个类别叫： [replaced elements](http://reference.sitepoint.com/css/replacedelements), 它们具有inline&block二者的特性

> Basically, these are neither block nor inline. But you might classify them as something closer to inline, but with block-like structure.

## 继承
继承一般指在元素本身没有被显式设置某样式的值时，取得父元素计算后(computed value)的样式值。    

### 常见不可继承的属性：
1. display
2. 文本： vertical-align, text-decoration, text-shadow, white-space, unicode-bidi(文本方向)
3. 盒模型样式： height, width, margin&padding系列, border系列
4. 背景系列： background-
5. 定位系列： float, clear, position系列(TRBL), Min/Max高宽系列, overflow, clip, z-index.
6. 轮廓样式： outline-

### 常见可继承属性：
1. 字体系列 font-
2. 文本： text-indent, text-align, line-height, word-spacing, letter-spacing, text-transform, direction, color.
3. 表格布局： caption-side, border-collapse, border-spacing, empty-cells, table-layout.
4. 列表布局： list-style-type, list-style-image, list-style-position, list-style.

### 共有继承属性
- visibility 
- cursor

### 内联元素可继承属性
1. 字体系列
2. 除了text-indent, text-align之外的文本系列。

### 块级元素可继承属性
1. text-indent
2. text-align

## Annoying Centering：居中一瞥
### 块级元素水平居中
1. 显式设置宽度，使用`margin:0 auto`
2. 父级`position:relative`,子元素`position:absolute`, `left:50%`, `translateX(-50%)`,适用于一些特殊情况（不知道宽度是多少）
3. flex-box大法， 父级: `display: flex`,`justify-content:center`
4. 负边距法，一般用于水平垂直居中，原理跟第2条差不多，区别是需要知道宽度，然后设置负边距为宽度的一半，双飞翼就是利用负边距。
5. 如果有多个块级元素，我们想让其排列在一行并且总宽度依然相对父元素居中

```css
.inline-block-center { /* wrapper */
  text-align: center;
}
.inline-block-center div {
  display: inline-block;
  text-align: left;
}
```


### 行内元素水平居中
对行内元素父级设置`text-align:center`

## 画个三角形
首先思考一个问题，我们都知道边框这个属性，而且知道它是可以分四边分别进行设置的，如果我将四边的颜色都设置成不一样的，那会是什么样子？画几张图来表示一下：    
![](https://ww3.sinaimg.cn/large/006y8lVagw1fb5dp4mt5xj30ro0m5q55.jpg)
![](https://ww4.sinaimg.cn/large/006y8lVagw1fb5dxxpq5pj30rr0m4abw.jpg)

一目了然，把图像翻译成代码：

```css
div{
  border-style: solid;
  border-width: 100px;
  height: 0;
  width: 0;
  border-color: blue yellow green red;
  /* 尖朝下的蓝色三角形 */
  /* border-color:blue transparent transparent transparent; */
  /* 尖朝左的黄色三角形 */
  /* border-color:transparent yellow transparent transparent; */
  /* 尖朝上的绿色三角形 */
  /* border-color:transparent transparent green transparent; */
  /* 尖朝右的红色三角形 */
  /* border-color:transparent transparent red transparent; */
}
```

## 文本trick
文字的container宽度有限的时候我们想要文本自动省略超出container的部分并且加上省略号...    

```css
.text{
/*有专门处理省略号的一个样式*/
text-overflow: ellipsis;
/*强制不换行*/
white-space: nowrap;
/*溢出隐藏*/
overflow: hidden;
}
```


## 解释下面代码的作用?为什么要加引号? 字体里的数字符号代表什么?
```css
body{
  font: 12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
}
/*一锅端的字体设置： 顺序依次是：
字体大小： 12px
行高： 重新计算： 1.5*子元素font-size
字体： 优雅降级？一个个试验，如果用户系统无法匹配这个字体就匹配下一个直到最后tahoma, airal, ‘Hiragino Sans GB', '\5b8b\4f53`（这是unicode，最精准的办法）, sans-serif 
*/
```

### 关于字体什么时候加上引号？
1. 中文
2. 英文，但是有空格或者其他符号