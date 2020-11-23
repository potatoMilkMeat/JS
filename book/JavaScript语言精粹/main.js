// 给函数类  定义链式新方法
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

