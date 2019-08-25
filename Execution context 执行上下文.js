/**
 * Js 执行上下文的研究
 * （一） Execution context 会 绑定 variable Object。
 * fun() {}执行中，先声明参数，变量（变量会先初始化为undefined，变量会在运行中赋值）
 */
var x = '1';
function f(msg) { // arguments 是早于变量声明的，并已经赋值。
  var y // var x=10; 相当于把var x先执行，然后执行到表达式的时候再赋值。
  console.log(msg, x, y, b)
  var x = 10
  console.log(msg, x, y, b)
  var b // var 申明的变量会统一提到最前面执行(无论在哪里，无论是否统一声明)，并赋值 undefined  
}
console.log(x) // 1
f('good job') // good job undefined undefined undefined
              // good job 10 undefined undefined