"use strict";
var TITLEHEIGHT = 83,
    TITLEWEIGHT = 101;
// 这是我们的玩家要躲避的敌人
var Enemy = function(spite,x,y,rate) {
    // 加载敌人图片，确定初始位置和速度
    this.sprite = spite;
    this.x = x;
    this.y = y;
    this.rate = rate;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x < titleWidth * 5) {
        this.x = this.x + this.rate * dt * 100;
    } else {
        this.x = -100;
        this.y = getRandomInt(1,4) * TITLEHEIGHT - 20;
        this.rate = getRandomInt(1,6);
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//加载玩家图片，确定初始位置
var Player = function(spite,x,y) {
    Enemy.call(this,spite,x,y);
};

Player.prototype.update = function() {
    //空操作
};

//设置标志符，当游戏结束时，屏蔽按键功能
var flag = true;

//玩家渲染
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y === 0) {
        ctx.font = "52px Impact";
        ctx.fillStyle = "black";
        ctx.fillText("YOU WIN!!",152, 343);
        flag = false;
    }
};

//处理按键
Player.prototype.handleInput = function(keyCode) {
    if (flag) {
        if (keyCode == 'left') {
            this.x -= TITLEWEIGHT;
            console.log(this.x);
        } else if (keyCode == 'up') {
            this.y -= TITLEHEIGHT;
        } else if (keyCode == 'right') {
            this.x += TITLEWEIGHT;
        } else if (keyCode == 'down') {
            this.y += TITLEHEIGHT;
        } 

        if (this.x <= 0) {
            this.x = 0;
        }else if (this.x >= TITLEWEIGHT * 4) {
            this.x = TITLEWEIGHT * 4;
        }

        if (this.y <= 0) {
            this.y = 0;
        }else if (this.y >= TITLEHEIGHT * 5) {
            this.y = TITLEHEIGHT * 5;
        }
    } else {
        if (keyCode == 'space') {
            reset();  
        }
    }
};

//获得随机数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//创建对象
var allEnemies = [];
for (var i = 0; i<=3;i++) {
    var enemy = new Enemy('images/enemy-bug.png',-100,getRandomInt(1,4) * TITLEHEIGHT - 20,getRandomInt(1,6));
    allEnemies.push(enemy);
}


var player = new Player('images/char-boy.png',TITLEWEIGHT * 2,TITLEHEIGHT * 5);
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function reset() {
    flag = true;
    player.x = TITLEWEIGHT * 2;
    player.y = TITLEHEIGHT * 5;
}

//设置按键事件监听
document.getElementById('reset').addEventListener('click', reset, false);


