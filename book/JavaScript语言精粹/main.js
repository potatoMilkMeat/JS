// P4 给函数类  定义链式新方法
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}

var A = function () { }
A.method('log', function () {
  var arr = Array.prototype.slice.call(arguments);
  for (var i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
  }
})

A.prototype.log(1, 2, 3);
new A().log(123);

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
