document.write('1');
document.body.innerText = '';

/** =====15.5-享元动作 =================== */
// 运动  享元类
var FlyWeight = {
  moveX(x){this.x=x;return this;},
  moveY(y){this.y=y;return this;}
}
// 人继承移动
var Player = function(x, y, color){
  this.x = x; this.y = y; this.color = color;
}
Player.prototype = FlyWeight;
Player.prototype.changColor = function(color){this.color = color;return this;}

// 精灵继承移动
var Spirit = function(x, y, r){
  this.x = x; this.y = y; this.r = r;
}
Spirit.prototype = FlyWeight;
Spirit.prototype.changR = function(r){this.r = r;return this;}

// 人： 玩家一
var player1 = new Player(5,6,'red');
player1.moveX(10).moveY(2).changColor('pink');
