window.onload = function() {
	/* 动态设置图片容器高度以及上边距*/
	var pc = document.getElementsByTagName('html')[0];
	var container = document.getElementsByClassName('photo_containner')[0];
	var photo = document.getElementsByClassName('photo')[0];
	window.onresize = function() {
			photo.style['margin-top'] = ((document.body.offsetHeight - photo.offsetHeight) / 2) + 'px';
			container.style.height = document.body.offsetHeight + 'px';
		}
		/*结束*/

	/*作业*/
	var pre = document.getElementById('pre');
	var next = document.getElementById('next');
	var pic = document.getElementById('pic');
	var circular = document.getElementById('circular');
	var ordered = document.getElementById('ordered');
	var model = document.getElementById('model');
	var ordinal = document.getElementById('ordinal');
	var num = 0;
	var imgArr = ['stock-photo-175233413', 'stock-photo-121583963', 'stock-photo-146799607', 'stock-photo-76787209', 'stock-photo-82920753']

	var model1 = function() {
		next.onclick = function() {
			num++;
			console.log(num);
			if(num > imgArr.length - 1) {
				num = imgArr.length - 1;
				console.log(imgArr.length-1,num);
				alert('这是最后一张');
			}
			pic.src = 'img/' + imgArr[num] + '.jpg';
			ordinal.innerHTML = num + 1;
		}
		pre.onclick = function() {
			num--;
			if(num < 0) {
				num = 0;
				alert('前面没有图片了');
			}
			pic.src = 'img/' + imgArr[num] + '.jpg';
			ordinal.innerHTML = num + 1;
		}
	}
	var model2 = function() {
		next.onclick = function() {
			num++;
			console.log(pic.src);
			if(num > imgArr.length - 1) {
				num = 0;
			}
			pic.src = 'img/' + imgArr[num] + '.jpg';
			ordinal.innerHTML = num + 1;
		}
		pre.onclick = function() {
			num--;
			console.log(pic.src);
			if(num < 0) {
				num = imgArr.length - 1;
			}
			pic.src = 'img/' + imgArr[num] + '.jpg';
			ordinal.innerHTML = num + 1;
		}
	}
	model1();
	circular.onclick = function() {
		model.innerHTML = 'Ordered Swtich';
		model1();
	}
	ordered.onclick = function() {
		model.innerHTML = 'Circular Swtich';
		model2();
	}

}