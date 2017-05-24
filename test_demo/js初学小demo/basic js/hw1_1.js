var box = document.getElementById('box');
var changeIcon = document.getElementById('changeIcon');
var btn = document.getElementById('btn');
var text = document.getElementById('text');

//状态预声明：头像&placeholder
var icon1 = 'img/icon_hw1_1.jpg';
var icon2 = 'img/icon_hw1_2.jpg';
var iconNow = 'img/icon_hw1_1.jpg';
var holder1 = 'Hi！kyle';
var holder2 = 'Hi！kaivon';
var holderNow = 'Hi！kyle';

text.onkeydown = function(){
	//监测有文字输入激活按钮样式，无文字取消样式
	if(btn.style.color == '') {
		//console.log(status == '');
		//console.log(btn.style.color == '');
		btn.style.color = '#00d13e';
		//console.log(btn.style.color == '');
		btn.style.cursor = 'pointer';
		//console.log(btn.style.color);
	}
	//这里没想出来，如果我把字体都删掉，让字体颜色再重置。结果是第一次输入成功的时候字体不会变色。
	//			if(text.value ==''){
	//				btn.style.color = '';
	//				btn.style.cursor = '';
	//			}
}
changeIcon.onclick = function() {
	text.value = '';
	if(iconNow == icon1 && holderNow == holder1) {
		changeIcon.src = icon2;
		iconNow = icon2;
		text.placeholder = holder2;
		holderNow = holder2;
	} else if(iconNow == icon2 && holderNow == holder2) {
		changeIcon.src = icon1;
		iconNow = icon1;
		text.placeholder = holder1;
		holderNow = holder1;
	}
}
btn.onclick = function() {
	//console.log(text.value);
	var val = text.value;
	if(text.value !== '') {  //改进写法！ 判断完以后alert请输入内容，然后return！ 里面的代码就不用放在if里面了。
		if(iconNow == icon1) {
			var kyleVal = '<div class="wrapper" id="kyleWrapper" ><img class="icon fl" id="innerIcon"  src="img/icon_hw1_1.jpg" alt=""/><div id ="kyleComment" class="comment">' + 'Kyle: ' + val + '</div></div>';
			box.innerHTML =  box.innerHTML + kyleVal;
			text.value = '';

		} else if(iconNow == icon2) {
			var kaivonVal = '<div class="wrapper" id="kaivonWrapper" ><img class="icon rl" id="innerIcon" src="img/icon_hw1_2.jpg" alt=""/><div id ="kaivonComment" class="comment" >' + 'Kaivon: ' + val + '</div></div>';
			box.innerHTML = box.innerHTML + kaivonVal;
			text.value = '';
		}

	}

}