var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var ordinal1 = document.getElementById('odrinal1');
var ordinal2 = document.getElementById('odrinal2');
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var imgArr1 = ['1', '2', '3', '4', '5'];
var imgArr2 = ['6', '7', '8', '9'];
var num1 = 0;
var num2 = 0;
/*这里打包复用是不是有更简单的方法？*/
var model1_1 = function() {
	console.log(imgArr1.length);
	num1++;
	if(num1 > imgArr1.length - 1) {
		num1 = 0;
	}
	img1.src = 'img/' + imgArr1[num1] + '.jpg';
	ordinal1.innerHTML = num1 + 1;
}
var model2_1 = function() {
	num2++;
	if(num2 > imgArr2.length - 1) {
		num2 = 0;
	}
	img2.src = 'img/' + imgArr2[num2] + '.jpg';
	ordinal2.innerHTML = num2 + 1;
}
var model1_2 = function() {
	num1--;
	if(num1 < 0) {
		num1 = imgArr1.length - 1;
	}
	img1.src = 'img/' + imgArr1[num1] + '.jpg';
	ordinal1.innerHTML = num1 + 1;
}
var model2_2 = function() {
	num2--;
	if(num2 < 0) {
		num2 = imgArr2.length - 1;
	}
	img2.src = 'img/' + imgArr2[num2] + '.jpg';
	ordinal2.innerHTML = num2 + 1;
}
img1.onclick = function() {
	model1_1();
	
}
img2.onclick = function() {
	model2_1();
}

btn1.onclick = function() {
	model1_2();
	model2_2();
}
btn2.onclick = function() {
	model1_1();
	model2_1();
}