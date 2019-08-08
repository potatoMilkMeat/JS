/**
 * Js Scope chain 作用域链 的研究
 */
var x = 'global'
function a () {
  var x = "a's x"
  function b(){
    var y = "b's y"
    console.log(x)
  }

  b()
}

function c() {
  var x ="c's x"
  return function d() {
    console.log(y);  // 直接报错，注释掉此行或者 开启var y 可以执行下面的  ReferenceError: y is not defined
  }
  var y // 存放在闭包（closure）中，给 d 的堆栈使用。

  d()
}

a()
c()
console.log(x)
console.log(y) // 直接报错 ReferenceError: y is not defined