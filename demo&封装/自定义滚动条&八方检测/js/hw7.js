window.onload = function() {

	let hw1 = document.getElementsByTagName('li')[0];
	let hw2 = document.getElementsByTagName('li')[1];
	let oWrapper = document.getElementsByClassName('wrapper')[0];
	let oWrapper2 = document.getElementsByClassName('wrapper2')[0];

	hw1.onclick = function() {
			oWrapper2.style.display = 'none';
			oWrapper.style.display = 'block';
			task1();
			return false;
		}
	hw2.onclick = function() {
		oWrapper.style.display = 'none';
		oWrapper2.style.display = 'block';
		task2();
		return false;
	}
	task1(); //默认执行
	function task1() {
		//滚动条方向元素
		let oSclUp = document.getElementById('sclUp');
		let oSclDown = document.getElementById('sclDown');
		let oSclWrapper = document.getElementById('scroll-wrapper');

		let oArticle = document.getElementsByTagName('article')[0];

		let oScrollBar = document.getElementById('scrollbar');
		let oScroller = document.getElementById('scroller');
		let moveY = oArticle.offsetHeight - oWrapper.offsetHeight;
		let lowerLimit = oScrollBar.offsetHeight - oScroller.offsetHeight;
		window.onresize = function() { //resize后更新取值
			moveY = oArticle.offsetHeight - oWrapper.offsetHeight;
			lowerLimit = oScrollBar.offsetHeight - oScroller.offsetHeight;
		}

		oSclWrapper.onmouseover = function() {
			oSclWrapper.style.opacity = 1;
		}

		oSclWrapper.onmouseout = function() {
			oSclWrapper.style.opacity = 0;
		}

		oScroller.onmousedown = function(ev) {

			disY = ev.clientY - oScroller.offsetTop;
			oSclWrapper.style.opacity = 1;

			document.onmousemove = function(ev) {

				let topNow = ev.clientY - disY;

				if(topNow < 0) {
					topNow = 0;
				} else if(topNow > lowerLimit) {
					topNow = lowerLimit;
				}
				let scaleY = topNow / lowerLimit;

				oScroller.style.top = topNow + 'px';
				oArticle.style.top = -scaleY * moveY + 'px';
				ev.preventDefault();
				return false;
			}
			document.onmouseup = function() {
				document.onmousemove = null;
				oSclWrapper.style.opacity = 0;

			}
			ev.cancelBubble = true;
		}

		function myScroll(obj, scrollUp, scrollDown) {

			obj.onmousewheel = scrolling;
			obj.addEventListener('DOMMouseScroll', scrolling);

			function scrolling(ev) {
				oSclWrapper.style.opacity = 1;
				if(ev.wheelDelta > 0 || ev.detail < 0) {
					scrollUp.call(obj, ev);
				} else {
					scrollDown.call(obj, ev);
				}
				setTimeout(function() {
					oSclWrapper.style.opacity = 0;
				}, 2000);
				ev.preventDefault();
				return false;
			}
		}
		/*
		 * 注意系统滚动设置
		 */

		//滚动向上滚时内容向上滑动
		function scrollUp(ev) {
			scollerTop = oScroller.offsetTop;
			let scaleY = scollerTop / lowerLimit;
			scollerTop -= 30;
			console.log('向上')
			if(scollerTop < 0) {
				scollerTop = 0;
			}
			oScroller.style.top = scollerTop + 'px';
			oArticle.style.top = -scaleY * moveY + 'px';
		}

		//滚动向下滚时内容向下滑动
		function scrollDown(ev) {
			scollerTop = oScroller.offsetTop;
			let scaleY = scollerTop / lowerLimit;
			scollerTop += 30;
			console.log('向下')
			if(scollerTop > lowerLimit) {
				scollerTop = lowerLimit;
			}
			oScroller.style.top = scollerTop + 'px';
			oArticle.style.top = -scaleY * moveY + 'px';
		}

		myScroll(oWrapper, scrollUp, scrollDown);

		//上下箭头按钮定时器开关
		let dirTrriger = {
			up: false,
			down: false
		};
		//滚动条点击定时器开关
		let sclbarTrriger = {
			up: false,
			down: false,
			posY: 0
		}

		oSclUp.onmousedown = function(ev) {
			dirTrriger['up'] = true;

		}

		oSclDown.onmousedown = function(ev) {
			dirTrriger['down'] = true;

		}

		oSclUp.onmouseup = function() {
			dirTrriger['up'] = false;
		}

		oSclDown.onmouseup = function(ev) {
			dirTrriger['down'] = false;
		}

		let moveScorller = setInterval(function() {

			scollerTop = oScroller.offsetTop;
			let scaleY = scollerTop / lowerLimit;
			if(dirTrriger['up']) {
				scollerTop -= 6;
				if(scollerTop < 0) {
					scollerTop = 0;
				}
			}
			if(dirTrriger['down']) {
				scollerTop += 6;
				if(scollerTop > lowerLimit) {
					scollerTop = lowerLimit;
				}
			}
			if(sclbarTrriger['up']) {
				console.log('bar');
				scollerTop -= 30;
				if(scollerTop < sclbarTrriger['posY']) {
					scollerTop = sclbarTrriger['posY'];
				}
			}
			if(sclbarTrriger['down']) {
				scollerTop += 30;
				if(scollerTop > sclbarTrriger['posY']) {
					scollerTop = sclbarTrriger['posY'];
				}
			}
			oScroller.style.top = scollerTop + 'px';
			oArticle.style.top = -scaleY * moveY + 'px';
		}, 16);

		oScrollBar.onmousedown = function(ev) {
			sclbarTrriger['posY'] = ev.clientY - oWrapper.offsetTop - oSclUp.offsetHeight;
			if(sclbarTrriger['posY'] < oScroller.offsetTop) {
				sclbarTrriger['up'] = true;
			}
			if(sclbarTrriger['posY'] > oScroller.offsetTop) {
				sclbarTrriger['down'] = true;
			}
		}

		oScrollBar.onmouseup = function(ev) {
			sclbarTrriger['up'] = false;
			sclbarTrriger['down'] = false;
		}

		oArticle.onmousedown = function(ev) {
			ev.preventDefault();
		}
	}

	/*
	 * 作业二 
	 * 改变尺寸大小
	 * 
	 */

	function task2() {
		let box = document.getElementById('box');
		/*
		 * 
		 * 拖拽部分:使用addEventListener添加事件
		 * 留出on方法给拖拽改变大小，因为其逻辑里存在事件嵌套
		 * 
		 */
		let range = 5;
		box.addEventListener('mousedown', drag);

		function drag(ev) {
			let posX = ev.clientX - box.offsetLeft;
			let posY = ev.clientY - box.offsetTop - 60;

			/*
			 * 四方向判断，类似碰撞检测。
			 */

			let objLeft = box.offsetLeft;
			let objRight = objLeft + box.offsetWidth;
			let objTop = box.offsetTop;
			let objBot = objTop + box.offsetHeight;

			let areaL = ev.clientX < objLeft + range;
			let areaR = ev.clientX > objRight - range;
			let areaT = ev.clientY - 60 < objTop + range;
			let areaB = ev.clientY - 60 > objBot - range;

			//在resize激活区则不允许拖拽执行
			if(areaL || areaR || areaT || areaB) {
				return;
			}

			document.addEventListener('mousemove', dragMove);
			document.addEventListener('mouseup', dragUp);

			function dragMove(e) {
				let boxLeft = e.clientX - posX;
				let boxTop = e.clientY - posY - 60;

				if(boxLeft < 0) {
					boxLeft = 0;
				} else if(boxLeft > oWrapper2.offsetWidth - box.offsetWidth) {
					boxLeft = oWrapper2.offsetWidth - box.offsetWidth;
				}
				if(boxTop < 0) {
					boxTop = 0;
				} else if(boxTop > oWrapper2.offsetHeight - box.offsetHeight) {
					boxTop = oWrapper2.offsetHeight - box.offsetHeight;
				}
				box.style.left = boxLeft + 'px';
				box.style.top = boxTop + 'px';
				e.preventDefault();
			}

			function dragUp() {
				document.removeEventListener('mousemove', dragMove, false);
			}

		}

		box.onmousemove = function(ev) {
			/*
			 * 八方向判断，类似碰撞检测。
			 */
			let objLeft = box.offsetLeft;
			let objRight = objLeft + box.offsetWidth;
			let objTop = box.offsetTop;
			let objBot = objTop + box.offsetHeight;

			let areaL = ev.clientX < objLeft + range;
			let areaR = ev.clientX > objRight - range;
			let areaT = ev.clientY - 60 < objTop + range;
			let areaB = ev.clientY - 60 > objBot - range;

			if(areaL) {
				box.style.cursor = 'ew-resize';
			}
			if(areaR) {
				box.style.cursor = 'ew-resize';
			}
			if(areaT) {
				box.style.cursor = 'ns-resize';
			}
			if(areaB) {
				box.style.cursor = 'ns-resize';
			}

			if(areaL && areaT || areaR && areaB) {
				box.style.cursor = 'nwse-resize';
			}
			if(areaL && areaB || areaR && areaT) {
				box.style.cursor = 'nesw-resize';
			}
			if(!areaL && !areaR && !areaT && !areaB) {
				box.style.cursor = 'default';
			}

			box.onmousedown = function(e) {
				e.preventDefault();
				//要记录不带边框的内容距离
				//记录点击时的box原始信息
				let oldWidth = box.clientWidth;
				let oldHeight = box.clientHeight;
				let oldRight = box.offsetLeft + oldWidth;
				let oldBot = box.offsetTop + box.clientHeight;
				let oldClientX = e.clientX;
				let oldClientY = e.clientY;
				let posX = oldClientX - box.offsetLeft;
				let posY = oldClientY - box.offsetTop - 60;

				//拖拽边界改变大小
				document.onmousemove = function(ev) {
					/*
					 * 只需要考虑上下左右情况
					 * 四角情况可由上下左右叠加
					 * 
					 */
					let newLeft, newWidth, newTop, newHeight;

					//在上部resize激活区
					if(areaL) {
						newLeft = ev.clientX - posX;
						//限制向右移动时left的值
						if(newLeft > oldRight - 100) {
							newLeft = oldRight - 100;
						}
						//限制左边界
						if(newLeft < 0) {
							newLeft = 0;
						}
						newWidth = oldClientX - ev.clientX + oldWidth;
						//限制向左移动到达可视区左边界时的宽度
						if(newWidth > oldRight) {
							newWidth = oldRight;
						}
					}
					//在右部resize激活区
					if(areaR) {
						newWidth = ev.clientX - oldClientX + oldWidth;
						//限制向右移动到达可视区右边界时的宽度
						if(newWidth > document.documentElement.offsetWidth - box.offsetLeft - 2) {
							newWidth = document.documentElement.offsetWidth - box.offsetLeft - 2;
						}
					}
					//在上部resize激活区
					if(areaT) {
						newTop = ev.clientY - posY - 60;
						//限制上边界不能超越活动区（导航条以下）
						if(newTop < 0) {
							newTop = 0;
						}
						//限制向下移动时top的值
						if(newTop > oldBot - 100) {
							newTop = oldBot - 100;
						}
						newHeight = oldClientY - ev.clientY + oldHeight;
						//限制到达上边界时宽度
						if(newHeight > oldBot) {
							newHeight = oldBot;
						}
					}
					if(areaB) {
						newHeight = ev.clientY - oldClientY + oldHeight;
						//限制下边界到达可视区底部时高度不能超越下边界
						if(box.offsetTop + newHeight > document.documentElement.offsetHeight - 60 - 2) {
							newHeight = document.documentElement.offsetHeight - 60 - box.offsetTop - 2;
						}
					}
					//宽度最小限制
					if(newWidth < 100) {
						newWidth = 100;
					}
					//最小高度限制
					if(newHeight < 100) {
						newHeight = 100;
					}
					if(newLeft !== undefined) {
						box.style.left = newLeft + 'px';
					}
					if(newTop !== undefined) {
						box.style.top = newTop + 'px';
					}
					if(newWidth !== undefined) {
						box.style.width = newWidth + 'px';
					}
					if(newHeight !== undefined) {
						box.style.height = newHeight + 'px';
					}
				}

				document.onmouseup = function() {
					document.onmousemove = null;
				}
			}

		}

	}

}