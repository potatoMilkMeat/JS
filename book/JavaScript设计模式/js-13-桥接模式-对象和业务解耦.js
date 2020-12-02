/** =====13.1 添加交互事件=================== */
var spans = document.getElementsByTagName('span');
spans[0].onmouseover =function () {
  this.style.color = 'red';
  this.style.background = '#ddd';
}
spans[0].onmouseout =function () {
  this.style.color = '#333';
  this.style.background = '#f5f5f5';
}
spans[1].onmouseover = function () {
  this.getElementsByTagName('strong')[0].style.color = 'red';
  this.getElementsByTagName('strong')[0].style.background = '#ddd';
}
spans[1].onmouseout = function () {
  this.getElementsByTagName('strong')[0].style.color = '#333';
  this.getElementsByTagName('strong')[0].style.background = '#f5f5f5';
}
// ...

/** =====13.2 提取共同点=================== */
// 抽象
function changeColor(dom, color, bg) {
  dom.style.color = color; dom.style.background = bg;
}

/** =====13.3 事件和业务逻辑之间的桥梁=================== */
var spans = document.getElementsByTagName('span');
spans[0].onmouseover = function (){
  changeColor(this, 'red', '#ddd');
}
spans[0].onmouseout = function (){
  changeColor(this, '#333', '#f5f5f5');
}

spans[1].onmouseover = function (){
  changeColor(this.getElementsByTagName('strong')[0], 'red', '#ddd');
}
spans[1].onmouseout = function (){
  changeColor(this.getElementsByTagName('strong')[0], '#333', '#f5f5f5');
}

/** =====13.4 多元化对象=================== */
// 多维变量类
// 运动单元
function Speed(x, y) { this.x= x;this.y=y; }
Speed.prototype.run = function(){console.log('运动起来');}
// 着色单元
function Color(color) { this.color= color; }
Color.prototype.draw = function(){console.log('绘制彩色');}
// 变形单元
function Shape(sp) { this.shape= sp; }
Shape.prototype.change = function(){console.log('改变形状');}
// 说话单元
function Speek(wd) { this.world= wd; }
Speek.prototype.say = function(){console.log('说话： '+ this.world);}

// 创建球类 - 运动，着色
function Ball(x,y,color){
  this.speed = new Speed(x,y);
  this.color = new Color(color);
}
Ball.prototype.init = function(){
  this.speed.run();
  this.color.draw();
}
// 创建人 - 运动，说话
function People(x,y,wd){
  this.speed = new Speed(x,y);
  this.font = new Speek(wd);
}
People.prototype.init = function(){
  this.speed.run();
  this.font.say();
}
// 创建精灵 - 运动，着色，变形
function Spirite(x,y,color, shape){
  this.speed = new Speed(x,y);
  this.color = new Color(color);
  this.shape = new Shape(shape);
}
Spirite.prototype.init = function(){
  this.speed.run();
  this.color.draw();
  this.shape.change();
}

var cl = new People(10, 12, '你好，我是程龙');
cl.init();