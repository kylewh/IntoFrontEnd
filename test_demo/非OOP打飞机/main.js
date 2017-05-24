/*
 * @toDo:用面向对象再实现一遍
 * 
 */

window.onload = function() {
	Game.init('stage');

}

let Game = {

	init: function(stageId) {
		This = this;
		this.oStage = document.getElementById(stageId);
		this.oStar = document.getElementById('start');
		this.oEnd = document.getElementById('end');
		this.oPanel = document.getElementById('panel');
		this.oState = document.getElementById('state');
		this.btn = document.querySelector('#end button');

		this.btn.addEventListener('click', This.restart);
		this.statBtn = document.querySelector('#start span');
		this.statBtn.addEventListener('click', function(ev) {
			This.oStar.style.display = 'none';
			This.creatPlayer();
		});
		//分数记录
		this.score = 0;

	},

	creatPlayer: function() {
		//创建，初始化属性
		let oPlayer = document.createElement('img');
		oPlayer.id = 'player';
		oPlayer.speed = 3;
		this.oStage.appendChild(oPlayer);
		this.oPlayer = oPlayer;
		this.oPlayer.src = 'img/hero.png';
		//初始化位置
		oPlayer.style.left = (this.oStage.offsetWidth - oPlayer.offsetWidth) / 2 + 'px';
		oPlayer.style.top = (this.oStage.offsetHeight - oPlayer.offsetHeight) + 'px';
		//玩家运动激活
		this.runPlayer();
		//敌机创建
		this.createEnemy();
	},

	runPlayer: function() {
		let This = this;

		let playerWidth = This.oPlayer.offsetWidth;
		let playerHeight = This.oPlayer.offsetHeight
		let stageLeft = This.oStage.offsetLeft;
		let stageHeight = This.oStage.offsetHeight;
		let stageWidth = This.oStage.offsetWidth;

		/*
		 * 
		 * 无延迟方向叠加运动
		 * 定时器控制运动
		 * keydown判定定时器各方向运动与否
		 * 
		 */

		//存储方向trigger
		This.oStage.direction = {
				up: false,
				down: false,
				left: false,
				right: false
			}
			//玩家移动计时器
		let playerTimer = setInterval(function(ev) {
				if(This.oStage.direction['up']) {
					if(This.oPlayer.offsetTop > 0) {
						This.oPlayer.style.top = This.oPlayer.offsetTop - This.oPlayer.speed + 'px';
					}

				}
				if(This.oStage.direction['down']) {
					if(This.oPlayer.offsetTop < stageHeight - playerHeight) {
						This.oPlayer.style.top = This.oPlayer.offsetTop + This.oPlayer.speed + 'px';
					}

				}
				if(This.oStage.direction['left']) {
					if(This.oPlayer.offsetLeft > -playerWidth / 2) {
						This.oPlayer.style.left = This.oPlayer.offsetLeft - This.oPlayer.speed + 'px';
					}
				}
				if(This.oStage.direction['right']) {
					if(This.oPlayer.offsetLeft < stageWidth - playerWidth / 2) {
						This.oPlayer.style.left = This.oPlayer.offsetLeft + This.oPlayer.speed + 'px';
					}

				}
			}, 16)
			//添加至全局供结束阶段清除。
		This.playerTimer = playerTimer;

		//按下方向键Trigger激活
		document.onkeydown = function(ev) {
			if(ev.keyCode == 37) { //左
				This.oStage.direction['left'] = true;
			}
			if(ev.keyCode == 38) { //上
				This.oStage.direction['up'] = true;
			}
			if(ev.keyCode == 39) { //右
				This.oStage.direction['right'] = true;
			}
			if(ev.keyCode == 40) { //下
				This.oStage.direction['down'] = true;

			}
		};
		//松开方向键Trigger失效
		document.onkeyup = function(ev) {

			if(ev.keyCode == 37) { //左
				This.oStage.direction['left'] = false;
			}
			if(ev.keyCode == 38) { //上
				This.oStage.direction['up'] = false;
			}
			if(ev.keyCode == 39) { //右
				This.oStage.direction['right'] = false;
			}
			if(ev.keyCode == 40) { //下
				This.oStage.direction['down'] = false;
			}
		}

		//子弹创建计时器
		let bgTimer = setInterval(function() {
			This.createBullet();
		}, 100);
		//添加至全局供结束阶段清除。
		This.bgTimer = bgTimer;

	},
	createEnemy: function() { //创建敌机
		let enemies = [];
		let This = this;
		let speedList = [1, 1.5];

		//敌机创建计时器
		let enemyTimer = setInterval(function() {
			let speed = speedList[Math.round(Math.random() * 1)];
			This.runEnemy(enemies, 'enemies', speed);
		}, 500);
		//添加至全局供结束阶段清除。
		this.enemyTimer = enemyTimer;

		this.enemies = enemies;
	},

	runEnemy: function(arr, type, speed) { //敌机激活
		let This = this;
		//先创建
		let oEnemy = document.createElement('img');
		oEnemy.className = type;
		This.oStage.appendChild(oEnemy);
		oEnemy.src = 'img/enemy1.png';
		oEnemy.style.left = (Math.round(Math.random() * 300)) + 'px';
		oEnemy.style.top = oEnemy.offsetTop - oEnemy.offsetHeight + 'px';
		//敌机运动激活， 定义敌机计时器
		oEnemy.timer = setInterval(function(ev) {
			oEnemy.style.top = oEnemy.offsetTop + speed + 'px';
			if(oEnemy.offsetTop > This.oStage.offsetHeight) {
				clearInterval(oEnemy.timer);
				This.oStage.removeChild(oEnemy);
			}
		}, 16);
		//每创建一个敌机，将其对象加入敌机数组。
		arr.push(oEnemy);
	},

	/*
	 * 以子弹为单位进行一对多（子弹对所有敌机）碰撞检测
	 *（！逻辑稍混乱，需要改进）
	 * 
	 */

	//子弹创建&运动   
	createBullet: function() {
		let This = this;
		let oBullet = document.createElement('img');
		oBullet.src = 'img/bullet.png';
		oBullet.className = 'bullet';

		This.oStage.appendChild(oBullet);
		oBullet.style.left = this.oPlayer.offsetLeft + (this.oPlayer.offsetWidth - oBullet.offsetWidth) / 2 + 'px';
		oBullet.style.top = this.oPlayer.offsetTop + 'px';
		let top = this.oPlayer.offsetTop;

		oBullet.timer = setInterval(function() {
			//阻止图片拖拽行为
			var img = document.getElementsByTagName("img");
			for(let i = 0; i < img.length; i++) {
				img[i].ondragstart = function() {
					return false;
				};
			}

			if(top <= -oBullet.offsetHeight) {
				clearInterval(oBullet.timer);
				This.oStage.removeChild(oBullet);
			} else {
				top -= 10; //子弹速度
				oBullet.style.top = top + 'px';
				for(let i = 0; i < This.enemies.length; i++) { //遍历敌机检测

					if(This.collison(This.enemies[i], This.oPlayer) || This.enemies[i].offsetTop >= This.oStage.offsetHeight - This.enemies[i].offsetHeight) { //玩家与敌机碰撞检测 以及 敌机到达下边界检测

						for(let i = 0; i < This.enemies.length; i++) { //遍历敌机，停止计时器→停止运动
							clearInterval(This.enemies[i].timer);
						}
						This.GameOver(); //游戏结束阶段
						return;
					}
					//子弹与敌机碰撞检测
					if(This.collison(oBullet, This.enemies[i])) {

						/*
						 * 碰撞子弹清除
						 */
						clearInterval(oBullet.timer); //停止当前子弹对象定时器
						if(oBullet.parentNode) {
							oBullet.parentNode.removeChild(oBullet); //删除碰撞子弹元素
						}

						/*
						 * 碰撞敌机清除
						 */
						clearInterval(This.enemies[i].timer); //停止当前碰撞敌机对象定时器
						let enemyNow = This.enemies[i];
						if(enemyNow.parentNode) {
							enemyNow.parentNode.removeChild(enemyNow); //删除碰撞敌机元素
						}
						//碰撞后敌机数组里删除对应敌机对象
						This.enemies.splice(i, 1);
						//加分
						This.score += 100;
					}
					This.oState.innerHTML = '得分：' + This.score;
				}
			}
		}, 16);

	},
	GameOver: function() {
		let This = this;
		clearInterval(This.bgTimer);
		clearInterval(This.playerTimer);
		clearInterval(This.enemyTimer);
		let oImgs = document.getElementsByTagName('img');
		for(let i = 0; i < oImgs.length; i++) {
			oImgs[i].style.display = 'none'; //清除所有img元素显示，防止阻挡结果面板
		}
		This.oState.style.display = 'none';
		This.oEnd.style.display = 'block';
		This.oPanel.innerHTML = '你获得了' + This.score + '分';
		console.log(This.score)
	},
	restart: function() {
		window.location.reload();
		//				let oImgs = document.getElementsByTagName('img');
		//				for(let i = 0; i<oImgs.length; i++){
		//					This.oStage.removeChild(oImgs[i]);
		//				}
		//				This.enemies = [];
		//				This.score = 0;
		//				This.oEnd.style.display = 'none';
		//				Window.Game.init();
	},
	collison: function(obj1, obj2) { //传入对象碰撞检测
		let l1 = obj1.offsetLeft;
		let r1 = obj1.offsetLeft + obj1.offsetWidth;
		let t1 = obj1.offsetTop;
		let b1 = obj1.offsetTop + obj1.offsetHeight;

		let l2 = obj2.offsetLeft;
		let r2 = obj2.offsetLeft + obj2.offsetWidth;
		let t2 = obj2.offsetTop;
		let b2 = obj2.offsetTop + obj2.offsetHeight;

		if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2) {
			return false;
		} else {
			console.log('l1>r2 and l1 is ' + l1 + ' r2 is ' + r2 + ' ' + (l1 > r2));
			console.log('r1<l2 and r1 is ' + r1 + ' l2 is ' + l2 + ' ' + (r1 < l2));
			console.log('t1>b2 and t1 is ' + t1 + ' b2 is ' + b2 + ' ' + (t1 > b2));
			console.log('b1<t2 and b1 is ' + b1 + ' t2 is ' + t2 + ' ' + (b1 < t2));
			console.log('collison');
			return true;
		}
	}
}