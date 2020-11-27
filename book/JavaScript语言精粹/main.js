// P4 给函数类  定义链式新方法
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}
// P33 符合条件才增加方法  ===替换上面的====
Function.prototype.method = function(name, func){
  if(!this.prototype[name]){
    this.prototype[name] = func;
  }
  return this;
}

var A = function () { }
A.method('log', function () {
  var arr = Array.prototype.slice.call(arguments);
  for (var i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
  }
})
// A.prototype.log(1, 2, 3);
// new A().log(123);

// P10 switch while do for 前置label，可用break label; 来打断代码块
var count=0;
farther:
for(var i=0;i<3;i++){
  count++;
  console.log('father循环前： ', count, i);
  son: for(var j=0;j<5;j++){
    // if(count >= 10){break;}
    if(count >= 10){break farther;}
    count++;
    console.log('son循环： ', count, i, j);
  }
}

// if(count >= 10){break;}          count 是 11 = (1+5) + (1+3) + (1)
// if(count >= 10){break farther;}  count 是 10 = (1+5) + (1+3)

// P22 创建一个使用原对象作为其原型的新对象
if(typeof Object.beget !== 'function'){
  Object.create = function(o){
    var F = function(){};
    F.prototype = o;
    return new F();
  }
}
// var book = {name: 'book', id: '001', year: '2020'};
// var another_book = Object.create(book);
// another_book.name = 'another_book';
// another_book.hasOwnProperty('name'); // true
// another_book.hasOwnProperty('id'); // false

// P32 取整的方法
Number.method('integer', function(){
  return Math[this < 0 ? 'ceil' : 'floor'](this);
})

// P33 移除字符串首尾空白的方法
String.method('trim', function(){
  return this.replace(/^\s+|\s+$/g, '').replace(/^\s+|\s+$/g, '');
});

/**
 * P34 汉诺塔 一直游戏
 * @param {*} disc 盘子总序号，总个数
 * @param {*} src 左边柱子 原本的
 * @param {*} aux 中边柱子 辅助的
 * @param {*} dst 右边柱子 目标的
 */
var hanoi = function(disc, src, aux, dst){
  if(disc>0){
    hanoi(disc-1, src, dst, aux); // 移动 disc-1 到 暂存 
    console.log('移动 盘子'+ disc+ ' 从 ' + src + ' 到 '+ dst); // 每个方法实际执行的移动
    hanoi(disc-1, aux, src, dst); // 移动 暂存后的 disc-1 到 dst(目标)
  }
};
hanoi(3, '左', '中', '右');